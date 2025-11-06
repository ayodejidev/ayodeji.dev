import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: "Ayodeji Ogundare",
  description: "Developer Advocate & Fullstack Software Engineer",
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: [
      {
        url: '/profile.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/profile.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        url: '/profile.png',
        type: 'image/png',
        sizes: '48x48',
      },
    ],
    apple: [
      {
        url: '/profile.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    shortcut: '/profile.png',
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