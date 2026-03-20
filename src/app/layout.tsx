import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solomon and Stephen | Premium Resume Builder",
  description:  "Create professional resumes online with modern templates and instant PDF download.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="spotlight-bg" />
        <Navbar />
        <main className="pt-32 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
