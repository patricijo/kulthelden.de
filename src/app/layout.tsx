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
  title: "Kulthelden.de - Deine Plattform für Kultfilme und Klassiker",
  description:
    "Entdecke die besten Kultfilme, Klassiker und Geheimtipps auf Kulthelden.de - Deine Quelle für filmische Schätze und Nostalgie.",
  keywords: [
    "Kultfilme",
    "Filmklassiker",
    "Filmarchiv",
    "Nostalgie",
    "Filmgeschichte",
  ],
  openGraph: {
    title: "Kulthelden.de - Deine Plattform für Kultfilme und Klassiker",
    description:
      "Entdecke die besten Kultfilme, Klassiker und Geheimtipps auf Kulthelden.de - Deine Quelle für filmische Schätze und Nostalgie.",
    siteName: "Kulthelden.de",
    type: "website",
    locale: "de_DE",
    url: "https://kulthelden.de",
    images: [
      {
        url: "/images/kulthelden-og-image.jpg", // TODO: Add OG Image
        width: 1200,
        height: 630,
        alt: "Kulthelden.de Logo und Filmstreifen",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
