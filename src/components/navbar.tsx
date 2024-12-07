"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "~/components/ui/button"

export function Navbar() {
	const { theme, setTheme } = useTheme()

	return (
		<nav className="border-b">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-shrink-0">
						<span className="font-bold text-2xl">JobTrack</span>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link
								href="/applications"
								className="rounded-md px-3 py-2 font-medium text-gray-700 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
							>
								Applications
							</Link>
							<Link
								href="/statistics"
								className="rounded-md px-3 py-2 font-medium text-gray-700 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
							>
								Statistics
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							aria-label="Toggle theme"
							className="text-gray-700 dark:text-gray-200"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}
