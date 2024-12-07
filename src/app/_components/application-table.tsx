import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { applications } from "~/server/db/schema";
import type { Application } from "~/server/db/types";

interface ApplicationTableProps {
	applications: Application[];
}

export const ApplicaitonTable = ({ applications }: ApplicationTableProps) => {
	return (
		<Table>
			<TableCaption>A list of your job applications.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Company</TableHead>
					<TableHead>Vacancy</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Files</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{applications.map((application) => (
					<TableRow key={application.id}>
						<TableCell className="font-medium">
							{application.companyName}
						</TableCell>
						<TableCell>{application.vacancyUrl}</TableCell>
						<TableCell>{application.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
