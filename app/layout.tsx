import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lorenzo Livoti - Full-stack Developer | MVP, Web Apps, Landing Pages",
  description: "Product-minded developer building MVPs, web apps and landing pages. Clear scope, rapid delivery, flexible stack.",
  keywords: ['web developer', 'MVP development', 'web app', 'Next.js', 'React'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}