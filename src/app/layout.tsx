import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/store/app-provider";
import { Header, Footer, FloatingCTA, MobileCTABar } from "@/components/layout";
import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: "Earth Diamond | Premium Diamond Manufacturing",
  description: "Factory-direct GIA & IGI certified diamonds. Trusted by jewelers worldwide for exceptional quality and reliable delivery.",
  keywords: "diamond manufacturer, certified diamonds, GIA diamonds, IGI diamonds, wholesale diamonds, B2B diamonds, diamond supplier, ethical diamonds",
  openGraph: {
    title: "Earth Diamond | Premium Diamond Manufacturing",
    description: "Factory-direct GIA & IGI certified diamonds. Trusted by jewelers worldwide for exceptional quality.",
    url: "https://www.earthdiamond.com",
    siteName: "Earth Diamond",
    images: [
      {
        url: "https://www.earthdiamond.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Earth Diamond - Premium Diamond Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth Diamond | Premium Diamond Manufacturing",
    description: "Factory-direct GIA & IGI certified diamonds. Trusted by jewelers worldwide.",
    creator: "@earthdiamond",
    images: ["https://www.earthdiamond.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          <Header />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
          <MobileCTABar />
          <Modals />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
