"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X, Trash2 } from "lucide-react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"
import { CartTelegramCheckout } from "./cart-telegram-checkout"

interface CartDropdownProps {
  telegramUsername: string
}

export function CartDropdown({ telegramUsername }: CartDropdownProps) {
  const { items, removeItem, updateItemQuantity, clearCart, itemCount, totalPrice } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  
  const handleQuantityChange = (
    itemId: string, 
    color: string | undefined, 
    size: string | undefined, 
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeItem(itemId, color, size)
      return
    }
    
    updateItemQuantity(itemId, color, size, newQuantity)
  }
  
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" aria-labelledby="cart-title">
          <SheetHeader>
            <SheetTitle id="cart-title">Your Cart</SheetTitle>
          </SheetHeader>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground text-center">
                Add items to your cart to see them here
              </p>
              <SheetClose asChild>
                <Link href="/collections">
                  <Button>Browse Collections</Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={`${item._id}-${item.color}-${item.size}`} className="flex items-start space-x-4">
                    {item.image ? (
                      <div className="h-16 w-16 rounded-md overflow-hidden relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-medium leading-none">{item.name}</h4>
                      
                      <div className="text-sm text-muted-foreground">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.color && item.size && <span> | </span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(
                              item._id, 
                              item.color, 
                              item.size, 
                              item.quantity - 1
                            )}
                          >
                            <span className="sr-only">Decrease quantity</span>
                            <span>-</span>
                          </Button>
                          
                          <span className="w-5 text-center">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(
                              item._id, 
                              item.color, 
                              item.size, 
                              item.quantity + 1
                            )}
                          >
                            <span className="sr-only">Increase quantity</span>
                            <span>+</span>
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item._id, item.color, item.size)}
                          >
                            <span className="sr-only">Remove item</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-sm font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Shipping</span>
                  <span className="text-sm text-muted-foreground">Calculated at checkout</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-medium">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <SheetFooter className="flex flex-col space-y-2 sm:space-y-0">
                <SheetClose asChild>
                  <Button 
                    className="w-full" 
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Checkout
                  </Button>
                </SheetClose>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      <CartTelegramCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={items}
        telegramUsername={telegramUsername}
      />
    </>
  )
}
