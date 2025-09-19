import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import GlobalProvider from "@/lib/providers/GlobalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse - Website Monitoring & Uptime Tracking",
  description: "Monitor your websites 24/7 from multiple global locations. Get instant alerts when downtime occurs and keep your business running smoothly with detailed analytics and performance insights.",
  keywords: ["website monitoring", "uptime tracking", "downtime alerts", "performance analytics", "website status", "server monitoring"],
  creator: "Pulse",
  publisher: "Pulse"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GlobalProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
