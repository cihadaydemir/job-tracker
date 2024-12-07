import { api, HydrateClient } from "~/trpc/server";
import { ApplicaitonTable } from "./_components/application-table";
import { CreateApplicationDialog } from "./_components/create-application-dialog";
import { Navbar } from "~/components/navbar";

export default async function Home() {
	const applications = await api.applicaiton.get();

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center  bg-background text-foreground w-full">
				<Navbar />
				<div className="container flex flex-col  justify-center gap-12 px-4 py-16">
					<CreateApplicationDialog />
					<ApplicaitonTable applications={applications} />
				</div>
			</main>
		</HydrateClient>
	);
}
