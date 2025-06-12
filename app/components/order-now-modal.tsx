"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"

// Simplified product type for the modal
interface ProductDetails {
  id: string;
  name: string;
  price?: number;
  image?: string;
  color?: string; // Added for color selection
  size?: string;  // Added for size selection
}

interface OrderNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductDetails;
  selectedColor?: string; // To receive color selection from parent
  selectedSize?: string;  // To receive size selection from parent
}

// Business contact info
const BUSINESS_WHATSAPP = "1234567890"; // Replace with your actual WhatsApp number
const BUSINESS_TELEGRAM = "onlll4"; // Telegram username

// Delivery fee constants
const DELIVERY_FEE = 200; // Delivery fee in birr

// Placeholder for user session hook (replace with your actual auth solution)
const useUser = () => ({ user: null, isSignedIn: false }); // Default to signed out

export function OrderNowModal({ isOpen, onClose, product, selectedColor, selectedSize }: OrderNowModalProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [socialContact, setSocialContact] = React.useState("");
  const [deliveryLocation, setDeliveryLocation] = React.useState("");

  const { user, isSignedIn } = useUser();

  // Calculate delivery fee based on quantity
  const baseDeliveryFee = DELIVERY_FEE;
  const deliveryDiscount = quantity > 2 ? 1.0 : 0.5; // 100% discount if > 2 items, otherwise 50%
  const finalDeliveryFee = baseDeliveryFee * (1 - deliveryDiscount);

  // Calculate total cost
  const subtotal = product?.price ? product.price * quantity : 0;
  const total = subtotal + finalDeliveryFee;

  React.useEffect(() => {
    if (isOpen && isSignedIn && user) {
      // Pre-fill form if user is signed in
    }
    if (!isOpen) {
      // Reset form on close
      setQuantity(1);
      setPhoneNumber("");
      setSocialContact("");
      setDeliveryLocation("");
    }
  }, [isOpen, isSignedIn, user]);

  if (!isOpen || !product) return null;

  const handleOrderSubmit = () => {
    // Basic validation
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }
    if (!socialContact) {
      alert("Please select your preferred contact method.");
      return;
    }
    if (!deliveryLocation) {
      alert("Please enter your delivery location.");
      return;
    }

    // Create a template message with all details
    const message = `
Hello! I would like to place an order:

Product: ${product.name}
Color: ${selectedColor || 'Default'}
Size: ${selectedSize || 'Standard'}
Price: ${product.price !== undefined ? `$${product.price}` : 'Price unavailable'}
Quantity: ${quantity}

Subtotal: ${product.price !== undefined ? `$${subtotal.toFixed(2)}` : 'Price unavailable'}
Delivery Fee: ${finalDeliveryFee} birr ${quantity > 2 ? '(Free - quantity discount)' : '(50% website discount)'}
Total: ${product.price !== undefined ? `$${subtotal.toFixed(2)} + ${finalDeliveryFee} birr` : 'Price unavailable'}

Delivery Location: ${deliveryLocation}
My Phone: ${phoneNumber}
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect based on preferred contact method
    if (socialContact === "whatsapp") {
      window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodedMessage}`, "_blank");
    } else if (socialContact === "telegram") {
      window.open(`https://t.me/${BUSINESS_TELEGRAM}?text=${encodedMessage}`, "_blank");
    }

    onClose();
  };
  
  const displayPrice = product.price !== undefined ? `$${(product.price * quantity).toFixed(2)}` : "Price unavailable";

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
            <div className="text-sm">
              Delivery: {finalDeliveryFee} birr
              {quantity > 2 ? 
                <span className="text-green-600 ml-1">(Free - quantity discount)</span> : 
                <span className="text-green-600 ml-1">(50% website discount)</span>}
            </div>
            <div className="font-semibold text-lg">
              Total: {product.price !== undefined ? 
                `$${subtotal.toFixed(2)} + ${finalDeliveryFee} birr` : 
                "Price unavailable"}
            </div>
          </div>

          {/* User Info Section */}
          <div className="border-t pt-4 mt-2 grid gap-3">
             <p className="text-sm font-medium text-center mb-2">Contact & Delivery Information</p>
            {!isSignedIn && <p className="text-xs text-muted-foreground text-center mb-2">Provide your contact details below. If you have an account, please <a href="/login" className="underline">log in</a> for a faster experience.</p>}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="e.g., +1234567890" className="col-span-3 h-9" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="delivery" className="text-right">
                Delivery
              </Label>
              <Textarea 
                id="delivery" 
                value={deliveryLocation} 
                onChange={(e) => setDeliveryLocation(e.target.value)} 
                placeholder="Enter your full delivery address" 
                className="col-span-3 h-20 resize-none" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social" className="text-right">
                Contact Via
              </Label>
              <Select value={socialContact} onValueChange={setSocialContact}>
                <SelectTrigger className="col-span-3 h-9">
                  <SelectValue placeholder="Select messaging app" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleOrderSubmit} className="bg-ra9ia-800 hover:bg-ra9ia-900">
            Continue to {socialContact ? (socialContact === "whatsapp" ? "WhatsApp" : "Telegram") : "Messaging"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 