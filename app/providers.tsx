"use client"

import { ReactNode } from "react"
import { Toaster } from "sonner"
import { CartProvider } from "@/hooks/use-cart"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <Toaster position="top-center" richColors />
      {children}
    </CartProvider>
  )
} 