"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ShoppingBag } from "lucide-react"
import { 
  generateOrderId, 
  redirectToTelegramWithOrder,
  type TelegramOrderData
} from "@/lib/telegram"
import { formatCurrency } from "@/lib/utils"

interface ProductOption {
  name: string
  value: string
}

interface QuickOrderButtonProps {
  product: {
    _id: string
    name: string
    price: number
    image?: string
  }
  colors?: ProductOption[]
  sizes?: ProductOption[]
  telegramUsername: string
  className?: string
}

export function QuickOrderButton({
  product,
  colors = [],
  sizes = [],
  telegramUsername,
  className = ""
}: QuickOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    telegramUsername: "",
  })
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colors.length > 0 ? colors[0].value : undefined
  )
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes.length > 0 ? sizes[0].value : undefined
  )
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      // Calculate total amount
      const totalAmount = product.price * quantity

      // Prepare order data
      const orderData: TelegramOrderData = {
        orderId: generateOrderId(),
        customerInfo,
        orderItems: [{
          product: {
            _id: product._id,
            name: product.name,
            price: product.price
          },
          quantity,
          color: selectedColor,
          size: selectedSize
        }],
        totalAmount,
        shippingNotes: note
      }

      // Redirect to Telegram with order information
      redirectToTelegramWithOrder(telegramUsername, orderData)
      
      // Close the dialog
      setIsOpen(false)
      
    } catch (error) {
      console.error("Error processing quick order:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className={className}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Quick Order
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Order</DialogTitle>
          <DialogDescription>
            Order {product.name} directly via Telegram
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
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
            
            <div className="grid grid-cols-2 gap-4">
              {colors.length > 0 && (
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {sizes.length > 0 && (
                <div className="grid gap-2">
                  <Label htmlFor="size">Size</Label>
                  <Select
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="note">Additional Notes (optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special instructions for your order"
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(product.price * quantity)}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Order via Telegram"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
