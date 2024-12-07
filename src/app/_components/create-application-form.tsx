"use client"

import React from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { insertApplicationSchema } from "~/server/db/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"

import { Button } from "~/components/ui/button"
import { statusValues } from "~/server/db/types"
import { Input } from "~/components/ui/input"

import { api } from "~/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

interface CreateApplicationFormProps {
	setIsDialogOpen: (value: boolean) => void
}

export const CreateApplicationForm = ({ setIsDialogOpen }: CreateApplicationFormProps) => {
	const router = useRouter()
	const createApplicationMutation = api.application.create.useMutation({
		onSuccess: (data, variables, context) => {
			setIsDialogOpen(false)
			router.refresh()
			toast.success(`Application for ${variables.companyName} created successfully.`)
		},
	})

	const form = useForm<z.infer<typeof insertApplicationSchema>>({
		resolver: zodResolver(insertApplicationSchema),
		defaultValues: {
			companyName: "",
			status: "draft",
		},
	})

	function onSubmit(values: z.infer<typeof insertApplicationSchema>) {
		createApplicationMutation.mutate(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<FormField
					control={form.control}
					name="companyName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input placeholder="Company Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select the application status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{statusValues.map((value) => (
										<SelectItem key={value} value={value}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={!form.formState.isValid}>
					Add
				</Button>
			</form>
		</Form>
	)
}
