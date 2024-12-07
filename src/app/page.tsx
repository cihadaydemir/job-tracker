import { api } from "~/trpc/server"
import { ApplicationTable } from "./_components/application-table"
import { CreateApplicationDialog } from "./_components/create-application-dialog"

export default async function Home() {
	const applications = await api.application.get()

	return (
		<div className="container flex flex-col justify-center gap-12 px-4 py-16">
			<CreateApplicationDialog />
			<ApplicationTable applications={applications} />
		</div>
	)
}
