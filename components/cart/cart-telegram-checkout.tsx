"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet"
import { DEFAULT_TELEGRAM_USERNAME, generateTelegramChatLink } from "@/lib/telegram"
import { formatCurrency } from "@/lib/utils"
import { useMessagingSettings } from "@/hooks/use-messaging"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image?: string
  slug?: string
  partnerMessaging?: {
    telegramUsername?: string
    whatsappNumber?: string
  }
}

interface CartTelegramCheckoutProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  telegramUsername: string
}

export function CartTelegramCheckout({
  isOpen,
  onClose,
  cartItems,
  telegramUsername
}: CartTelegramCheckoutProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    telegramUsername: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { messaging } = useMessagingSettings()
  const [contactMethod, setContactMethod] = useState<'telegram' | 'whatsapp'>('telegram')
  const [contactHandle, setContactHandle] = useState('')

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setCustomerInfo({
      ...customerInfo,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Build concise message
      const lines: string[] = []
      const SITE_ORIGIN = 'https://runniacollection.net'
      lines.push("Cart order request:\n")
      cartItems.forEach((item, idx) => {
        const parts = [
          `${idx + 1}. ${item.name}`,
          item.color ? `Color: ${item.color}` : undefined,
          item.size ? `Size: ${item.size}` : undefined,
          `Qty: ${item.quantity}`,
          `Subtotal: ${formatCurrency(item.price * item.quantity)}`
        ].filter(Boolean)
        lines.push(parts.join(" | "))
        if (item.slug) {
          lines.push(`Link: ${SITE_ORIGIN}/products/${item.slug}`)
        }
      })
      lines.push("\nTotal: " + formatCurrency(totalAmount))
      if (customerInfo.name || customerInfo.email || customerInfo.phone) {
        lines.push("\nCustomer:")
        if (customerInfo.name) lines.push(`Name: ${customerInfo.name}`)
        if (customerInfo.email) lines.push(`Email: ${customerInfo.email}`)
        if (customerInfo.phone) lines.push(`Phone: ${customerInfo.phone}`)
      }
      if (contactHandle) lines.push(`\nCustomer handle: ${contactHandle}`)
      lines.push("\nWe’ll finalize address and delivery details in chat.")

      const message = lines.join("\n")

      // Determine effective messaging: if all items with partnerMessaging share same handles, use those; else site defaults
      const partnerHandles = cartItems
        .map(i => i.partnerMessaging)
        .filter(Boolean) as { telegramUsername?: string; whatsappNumber?: string }[]

      const validPartner = partnerHandles.filter(m => (m.telegramUsername && m.telegramUsername.trim()) || (m.whatsappNumber && m.whatsappNumber.trim()))
      let effectiveTelegram = messaging.telegramUsername || null
      let effectiveWhatsApp = messaging.whatsappNumber || null
      if (validPartner.length > 0) {
        const first = validPartner[0]
        const allSame = validPartner.every(m => (m.telegramUsername || '') === (first.telegramUsername || '') && (m.whatsappNumber || '') === (first.whatsappNumber || ''))
        if (allSame) {
          effectiveTelegram = first.telegramUsername || effectiveTelegram
          effectiveWhatsApp = first.whatsappNumber || effectiveWhatsApp
        }
      }

      if (contactMethod === 'telegram') {
        const username = (effectiveTelegram || DEFAULT_TELEGRAM_USERNAME).replace('@','')
        const url = generateTelegramChatLink(username, message)
        if (url) window.open(url, '_blank')
      } else {
        const numberRaw = (effectiveWhatsApp || '').replace(/[^\d]/g, '')
        if (!numberRaw) {
          alert('WhatsApp number is not configured yet. Please set it in Site Settings.')
        } else {
          const url = `https://wa.me/${numberRaw}?text=${encodeURIComponent(message)}`
          window.open(url, '_blank')
        }
      }
      
      // Close the checkout sheet
      onClose()
      
      // Optionally, clear the cart or redirect to a thank you page
      // This would depend on your cart state management implementation
      
    } catch (error) {
      console.error("Error processing checkout:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto" aria-labelledby="checkout-title">
        <SheetHeader>
          <SheetTitle id="checkout-title">Complete Your Order</SheetTitle>
          <SheetDescription>
            We’ll finalize address and delivery details directly in chat.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Optional Contact</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="telegramUsername">
                Telegram Username (optional)
              </Label>
              <Input
                id="telegramUsername"
                name="telegramUsername"
                value={customerInfo.telegramUsername}
                onChange={handleInputChange}
                placeholder="@username"
              />
            </div>
            <div className="grid gap-2">
              <Label>Contact Via</Label>
              <Select value={contactMethod} onValueChange={(v: 'telegram' | 'whatsapp') => setContactMethod(v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select messaging app" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactHandle">{contactMethod === 'telegram' ? 'Your Telegram username' : 'Your WhatsApp number'}</Label>
              <Input
                id="contactHandle"
                value={contactHandle}
                onChange={(e) => setContactHandle(e.target.value)}
                placeholder={contactMethod === 'telegram' ? '@username' : '+251...'}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Order Summary</h3>
            <div className="border rounded-md p-4 space-y-3">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.color}-${item.size}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image ? (
                      <div className="h-12 w-12 relative rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-muted-foreground">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.color && item.size && <span> | </span>}
                        {item.size && <span>Size: {item.size}</span>}
                        <span className="ml-1">× {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <span className="ml-3 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              
              <div className="pt-2 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Continue on ${contactMethod === 'telegram' ? 'Telegram' : 'WhatsApp'}`}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
