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
import { Plus } from "lucide-react"

export const CreateApplicationDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size={"lg"} className="max-w-min self-end">
					<Plus className="h-4 w-4" />
					Add Application
				</Button>
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
