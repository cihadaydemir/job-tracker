import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"

import { TRPCReactProvider } from "~/trpc/react"
import { Toaster } from "~/components/ui/sonner"
import { ThemeProvider } from "~/components/theme-provider"
import { HydrateClient } from "~/trpc/server"
import { Navbar } from "~/components/navbar"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
	title: "Application Tracker",
	description: "build by chd",
	icons: [
		{
			rel: "icon",
			url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💼</text></svg>",
		},
	],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
			<body>
				<ClerkProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<TRPCReactProvider>
							<HydrateClient>
								<Navbar />
								<main className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
									{children}
								</main>
							</HydrateClient>
						</TRPCReactProvider>
						<Toaster />
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
