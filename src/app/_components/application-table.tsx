"use client"

import { Pencil, Trash2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ChangeEvent } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { type StatusType, statusValues, type Application } from "~/server/db/types"
import { api } from "~/trpc/react"

interface ApplicationTableProps {
	applications: Application[]
}

export const ApplicationTable = ({ applications }: ApplicationTableProps) => {
	const router = useRouter()
	const updateApplicationMutation = api.application.updateById.useMutation({
		onSuccess: () => {
			toast.success("Application status updated successfully.")
			router.refresh()
		},
	})
	const deleteApplicationMutation = api.application.deleteById.useMutation({
		onSuccess: () => {
			toast.success("Application deleted successfully.")
			router.refresh()
		},
	})

	const handleStatusChange = (applicationId: number, updatedApplication: Application) => {
		updateApplicationMutation.mutate({
			applicationId,
			updatedApplication: { ...updatedApplication, updatedAt: new Date() },
		})
	}

	const handleDelete = (id: number) => deleteApplicationMutation.mutate(id)

	function handleEdit(id: number): void {}

	function handleFileUpload(id: number, e: ChangeEvent<HTMLInputElement>): void {
		throw new Error("Function not implemented.")
	}

	return (
		<Table>
			<TableCaption>A list of your job applications.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Company</TableHead>
					<TableHead>Vacancy</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Files</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{applications.map((application) => (
					<TableRow key={application.id}>
						<TableCell className="font-medium">{application.companyName}</TableCell>
						<TableCell>{application.vacancyUrl}</TableCell>
						<TableCell>
							<Select
								value={application.status}
								defaultValue={application.status}
								onValueChange={(value: StatusType) =>
									handleStatusChange(application.id, { ...application, status: value })
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									{statusValues.map((value) => (
										<SelectItem key={value} value={value}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell>
							<>
								<label htmlFor={`file-upload-${application.id}`} className="ml-2 cursor-pointer">
									<Upload size={16} />
								</label>
								<input
									id={`file-upload-${application.id}`}
									type="file"
									className="hidden"
									onChange={(e) => handleFileUpload(application.id, e)}
								/>
							</>
						</TableCell>

						<TableCell>
							<div className="flex space-x-2">
								<Button variant="outline" size="icon" onClick={() => handleEdit(application.id)}>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button variant="outline" size="icon" onClick={() => handleDelete(application.id)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
