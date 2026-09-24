import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Rafly Recruitment Prototype",description:"Working recruitment staff prototype"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="id"><body>{children}</body></html>}
