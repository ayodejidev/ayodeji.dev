import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      {
        url: siteConfig.branding.profileImage,
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: siteConfig.branding.profileImage,
        type: 'image/png',
        sizes: '16x16',
      },
      {
        url: siteConfig.branding.profileImage,
        type: 'image/png',
        sizes: '48x48',
      },
    ],
    apple: [
      {
        url: siteConfig.branding.profileImage,
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    shortcut: siteConfig.branding.profileImage,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${robotoMono.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}