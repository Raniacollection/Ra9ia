import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-none md:rounded border border-burgundy-100 bg-white px-3 py-2 text-base text-ra9ia-900 ring-offset-background placeholder:text-ra9ia-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ra9ia-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
