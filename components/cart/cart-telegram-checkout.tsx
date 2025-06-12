import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet"
import { 
  generateOrderId, 
  redirectToTelegramWithOrder,
  type TelegramOrderData
} from "@/lib/telegram"
import { formatCurrency } from "@/lib/utils"

export interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image?: string
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
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    telegramUsername: "",
  })
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })
  const [shippingNotes, setShippingNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    
    if (name.includes("address.")) {
      const addressField = name.split(".")[1]
      setShippingAddress({
        ...shippingAddress,
        [addressField]: value
      })
    } else {
      setCustomerInfo({
        ...customerInfo,
        [name]: value
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData: TelegramOrderData = {
        orderId: generateOrderId(),
        customerInfo,
        orderItems: cartItems.map(item => ({
          product: {
            _id: item._id,
            name: item.name,
            price: item.price
          },
          quantity: item.quantity,
          color: item.color,
          size: item.size
        })),
        totalAmount,
        shippingAddress,
        shippingNotes
      }

      // Redirect to Telegram with order information
      redirectToTelegramWithOrder(telegramUsername, orderData)
      
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
            Fill in your details to complete your order via Telegram
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Your Information</h3>
            
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
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shipping Address</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="address.street">Street Address</Label>
              <Input
                id="address.street"
                name="address.street"
                value={shippingAddress.street}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address.state">State/Province</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="address.postalCode">Postal Code</Label>
                <Input
                  id="address.postalCode"
                  name="address.postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shippingNotes">
              Additional Notes (optional)
            </Label>
            <Textarea
              id="shippingNotes"
              value={shippingNotes}
              onChange={(e) => setShippingNotes(e.target.value)}
              placeholder="Any special instructions for your order"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Order Summary</h3>
            <div className="border rounded-md p-4 space-y-3">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.color && <span className="text-muted-foreground"> - {item.color}</span>}
                    {item.size && <span className="text-muted-foreground"> - {item.size}</span>}
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </div>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
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
              {isSubmitting ? "Processing..." : "Complete Order via Telegram"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
