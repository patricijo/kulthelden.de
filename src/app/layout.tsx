import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import { MobileMenuComponent, Navigation } from "@/components/Navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kulthelden.de ",
  openGraph: {
    title: "Kulthelden.de",
    description: "Kulthelden.de",
    siteName: "Kulthelden.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background scroll-smooth`}
        id="start"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <main className="w-screen">
              <Navigation />
              {children}
              <Footer />
            </main>

            <MobileMenuComponent />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
