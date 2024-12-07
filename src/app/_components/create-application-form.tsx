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
		onSuccess: (data, variables, _) => {
			setIsDialogOpen(false)
			router.refresh()
			toast.success(`Application for ${variables.companyName} created successfully.`)
		},
		onError: (error, variables, _) => {
			toast.error(`Application for ${variables.companyName} creation failed with error: \n${error.message}`)
		},
	})

	const form = useForm<z.infer<typeof insertApplicationSchema>>({
		resolver: zodResolver(insertApplicationSchema),
		defaultValues: {
			companyName: "",
			// vacancyTitle: "",
			// vacancyUrl: "",
			status: "draft",
		},
	})

	function onSubmit(values: z.infer<typeof insertApplicationSchema>) {
		createApplicationMutation.mutate(values)
	}

	const handleUrlValue = (value: string) => {
		return value === "" ? undefined : value
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
					name="vacancyTitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vacancy Title</FormLabel>
							<FormControl>
								<Input placeholder="Vacancy Title" {...field} value={field.value ?? undefined} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="vacancyUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vacany URL</FormLabel>
							<FormControl>
								<Input
									type="url"
									placeholder="https://example.com/jobs/"
									{...field}
									value={field.value ?? undefined}
									onChange={(e) => {
										field.onChange(handleUrlValue(e.target.value))
									}}
								/>
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
				<Button type="submit">Add</Button>
				<pre>{JSON.stringify({ state: form.getValues(), errors: form.formState.errors }, null, 2)}</pre>
			</form>
		</Form>
	)
}
