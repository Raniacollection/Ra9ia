import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none md:rounded text-sm font-medium tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ra9ia-800 text-white hover:bg-ra9ia-900",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-ra9ia-200 text-ra9ia-900 bg-transparent hover:bg-ra9ia-50",
        secondary: "bg-cream-50 text-ra9ia-900 hover:bg-cream-100",
        ghost: "text-ra9ia-900 hover:bg-ra9ia-50",
        link: "text-ra9ia-900 underline-offset-4 hover:underline",
        rose: "bg-ra9ia-700 text-white hover:bg-ra9ia-800",
        burgundy: "bg-ra9ia-800 text-white hover:bg-ra9ia-900",
        gold: "bg-gold-600 text-white hover:bg-gold-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 md:rounded px-3",
        lg: "h-11 md:rounded px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "burgundy",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

