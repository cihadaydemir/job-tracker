"use client"

import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"

import { useState } from "react"
import { CreateApplicationForm } from "./create-application-form"

export const CreateApplicationDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

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
					<CreateApplicationForm setIsDialogOpen={setIsDialogOpen} />
				</div>
			</DialogContent>
		</Dialog>
	)
}
