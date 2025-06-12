"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface RestockNotificationProps {
  productId: string
  productName: string
  color?: string
  size?: string
  isEnabled?: boolean
  restockDate?: string
}

export function RestockNotification({
  productId,
  productName,
  color,
  size,
  isEnabled = true,
  restockDate,
}: RestockNotificationProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Don't render the component if restock notifications are not enabled
  if (!isEnabled) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/restock-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          productId,
          productName,
          color,
          size,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to register for restock notification")
      }

      setIsSuccess(true)
      setEmail("")
      toast.success(data.message || "You'll be notified when this item is back in stock")
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      toast.error(err instanceof Error ? err.message : "Failed to register for notification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 p-4 border border-burgundy-200 rounded-md bg-burgundy-50">
      <div className="flex items-center mb-3">
        <Bell className="h-5 w-5 text-ra9ia-700 mr-2" />
        <h3 className="font-medium text-ra9ia-800">Get notified when back in stock</h3>
      </div>
      
      {restockDate && (
        <p className="text-sm text-muted-foreground mb-3">
          Expected restock date: <span className="font-medium">{new Date(restockDate).toLocaleDateString()}</span>
        </p>
      )}
      
      {isSuccess ? (
        <div className="flex items-center space-x-2 text-green-600 py-2">
          <Check className="h-5 w-5" />
          <p className="text-sm font-medium">You're on the waitlist!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Your email address"
            className="border-burgundy-200 focus-visible:ring-ra9ia-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button 
            type="submit" 
            className="w-full bg-ra9ia-700 hover:bg-ra9ia-800"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Notify me"
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            We'll email you once this item is back in stock. No spam, we promise!
          </p>
        </form>
      )}
    </div>
  )
} 