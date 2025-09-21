"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { DEFAULT_TELEGRAM_USERNAME, generateTelegramChatLink } from "@/lib/telegram"
import { useMessagingSettings } from "@/hooks/use-messaging"
import Image from "next/image"

// Simplified product type for the modal
interface ProductDetails {
  id: string;
  name: string;
  price?: number;
  image?: string;
  color?: string; // Added for color selection
  size?: string;  // Added for size selection
  slug?: string;  // Optional slug to build product link
  partnerMessaging?: {
    telegramUsername?: string
    whatsappNumber?: string
  }
}

interface OrderNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductDetails;
  selectedColor?: string; // To receive color selection from parent
  selectedSize?: string;  // To receive size selection from parent
}

// Fallback telegram username if not configured in Sanity
const FALLBACK_TELEGRAM = DEFAULT_TELEGRAM_USERNAME

export function OrderNowModal({ isOpen, onClose, product, selectedColor, selectedSize }: OrderNowModalProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [contactMethod, setContactMethod] = React.useState<'telegram' | 'whatsapp'>('telegram')
  const [contactHandle, setContactHandle] = React.useState('')
  const { messaging } = useMessagingSettings()

  // Calculate total cost
  const subtotal = product?.price ? product.price * quantity : 0;

  React.useEffect(() => {
    if (!isOpen) {
      // Reset form on close
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleOrderSubmit = () => {
    // Create a concise message; remaining details will be collected in chat
    const SITE_ORIGIN = 'https://runniacollection.net'
    const productUrl = product.slug ? `${SITE_ORIGIN}/products/${product.slug}` : ''
    const baseMessage = `New order request:\n\nProduct: ${product.name}${productUrl ? `\nLink: ${productUrl}` : ''}\nColor: ${selectedColor || 'Default'}\nSize: ${selectedSize || 'Standard'}\nQuantity: ${quantity}\nPrice per unit: ${product.price !== undefined ? formatCurrency(product.price) : 'N/A'}\nSubtotal: ${product.price !== undefined ? formatCurrency(subtotal) : 'N/A'}\n\nPreferred contact: ${contactMethod === 'telegram' ? 'Telegram' : 'WhatsApp'}${contactHandle ? `\nCustomer handle: ${contactHandle}` : ''}\n\nPlease finalize address and delivery details in chat.`

    if (contactMethod === 'telegram') {
      const overrideUser = product.partnerMessaging?.telegramUsername
      const username = (overrideUser || messaging.telegramUsername || FALLBACK_TELEGRAM).replace('@','')
      const telegramUrl = generateTelegramChatLink(username, baseMessage)
      if (telegramUrl) window.open(telegramUrl, "_blank")
    } else {
      const overrideWhats = product.partnerMessaging?.whatsappNumber
      const numberRaw = ((overrideWhats || messaging.whatsappNumber) || '').replace(/[^\d]/g, '')
      if (!numberRaw) {
        alert('WhatsApp number is not configured yet. Please set it in Site Settings.')
      } else {
        const encoded = encodeURIComponent(baseMessage)
        const url = `https://wa.me/${numberRaw}?text=${encoded}`
        window.open(url, "_blank")
      }
    }
    onClose();
  };

  const displayPrice = product.price !== undefined ? formatCurrency(product.price * quantity) : "Price unavailable";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Order Now: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            {product.image && (
              <Image src={product.image} alt={product.name} width={80} height={100} className="rounded-md object-cover" />
            )}
            <div className="flex-grow">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedColor ? `Color: ${selectedColor}` : 'Color: Default'}, 
                {selectedSize ? `Size: ${selectedSize}` : 'Size: Standard'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8">-</Button>
              <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center h-8" />
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-8 w-8">+</Button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-2 space-y-1 text-right pr-4">
            <div className="text-sm">Subtotal: {displayPrice}</div>
            <div className="font-semibold text-lg">Total: {displayPrice}</div>
          </div>

          {/* Contact preference */}
          <div className="border-t pt-4 mt-2 grid gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Contact Via</Label>
              <Select value={contactMethod} onValueChange={(v: 'telegram' | 'whatsapp') => setContactMethod(v)}>
                <SelectTrigger className="col-span-3 h-9">
                  <SelectValue placeholder="Select messaging app" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="handle" className="text-right">
                {contactMethod === 'telegram' ? 'Your Telegram username' : 'Your WhatsApp number'}
              </Label>
              <Input
                id="handle"
                value={contactHandle}
                onChange={(e) => setContactHandle(e.target.value)}
                placeholder={contactMethod === 'telegram' ? '@username' : '+251...'}
                className="col-span-3 h-9"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              We’ll finalize address and delivery details in chat.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleOrderSubmit} className="bg-ra9ia-800 hover:bg-ra9ia-900">
            Continue on {contactMethod === 'telegram' ? 'Telegram' : 'WhatsApp'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}