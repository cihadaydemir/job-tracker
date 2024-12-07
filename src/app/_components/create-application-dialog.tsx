"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"

import { revalidatePath } from "next/cache"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { insertApplicationSchema } from "~/server/db/zod"
import { api } from "~/trpc/react"
import { toast } from "sonner"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { statusValues } from "~/server/db/types"

export const CreateApplicationDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const createApplicationMutation = api.applicaiton.create.useMutation({
		onSuccess: (data, variables, context) => {
			console.log("data success", data)
			setIsDialogOpen(false)
			toast.success("Application created successfully ✅")
			revalidatePath("/", "layout")
		},
	})

	const form = useForm<z.infer<typeof insertApplicationSchema>>({
		resolver: zodResolver(insertApplicationSchema),
		defaultValues: {
			companyName: "",
			status: "pending",
		},
	})

	function onSubmit(values: z.infer<typeof insertApplicationSchema>) {
		createApplicationMutation.mutate(values)
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>Add Application</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create an job application</DialogTitle>
					<DialogDescription>Add your job application to the list.</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
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
										<FormControl>
											<Select {...field}>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select the application status" />
												</SelectTrigger>
												<SelectContent>
													{statusValues.map((value) => (
														<SelectItem key={value} value={value}>
															{value}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={!form.formState.isValid}>
								Add
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
