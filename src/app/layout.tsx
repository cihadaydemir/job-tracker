import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"

import { TRPCReactProvider } from "~/trpc/react"
import { Toaster } from "~/components/ui/sonner"
import { ThemeProvider } from "~/components/theme-provider"
import { HydrateClient } from "~/trpc/server"
import { Navbar } from "~/components/navbar"

export const metadata: Metadata = {
	title: "Application Tracker",
	description: "coded by chd",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
			<body>
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
			</body>
		</html>
	)
}
