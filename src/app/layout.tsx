import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virenix - Fast Game Server Hosting | Coming Soon",
  description: "Lightning-fast game server hosting built for performance. Enterprise-grade reliability, 99.9% uptime, 24/7 support. Join the waitlist.",
  keywords: ["game server hosting", "game server", "server hosting", "minecraft hosting", "game hosting", "dedicated servers"],
  authors: [{ name: "Virenix" }],
  creator: "Virenix",
  publisher: "Virenix",
  openGraph: {
    type: "website",
    url: "https://virenix.nl",
    title: "Virenix - Fast Game Server Hosting",
    description: "Lightning-fast game server hosting built for performance. Join the waitlist today.",
    siteName: "Virenix",
    images: [
      {
        url: "https://r2.fivemanage.com/MstMs66haaJ9Pm7JfZ7kO/icon_transparent_blue_512.png",
        width: 512,
        height: 512,
        alt: "Virenix Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Virenix - Fast Game Server Hosting",
    description: "Lightning-fast game server hosting built for performance.",
    images: ["https://r2.fivemanage.com/MstMs66haaJ9Pm7JfZ7kO/icon_transparent_blue_512.png"],
    creator: "@virenix",
    site: "@virenix",
  },

  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://virenix.nl",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">{children}</body>
      </html>
  );
}