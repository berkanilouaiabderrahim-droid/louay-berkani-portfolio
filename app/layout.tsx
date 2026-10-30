import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Arabic, Space_Mono, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })
const syne = Syne({ weight: ["400", "700", "800"], subsets: ["latin"], variable: "--font-syne" })
const arabic = Noto_Sans_Arabic({ weight: ["400", "500", "600", "700", "800"], subsets: ["arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "Louay Berkani — Independent Web Developer",
  description: "Polished, responsive websites for businesses by Louay Berkani.",
  generator: "v0.app",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${spaceMono.variable} ${syne.variable} ${arabic.variable}`}>{children}<Analytics /></body></html>
}
