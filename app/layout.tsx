import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { CartProvider } from "./contexts/cart-context"
import { WishlistProvider } from "./contexts/wishlist-context"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Ra9ia Collection - Elegance in Modesty",
  description: "Discover our exquisite collection of Abayas and modest fashion pieces designed for the modern Muslim woman.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
              <Providers>
                {children}
              </Providers>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'