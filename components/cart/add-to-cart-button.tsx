"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { CartItem } from "@/components/cart/cart-telegram-checkout"

interface AddToCartButtonProps {
  product: {
    _id: string
    name: string
    price: number
    image?: string
  }
  color?: string
  size?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  showQuantityControls?: boolean
  initialQuantity?: number
}

export function AddToCartButton({
  product,
  color,
  size,
  className = "",
  variant = "default",
  showQuantityControls = false,
  initialQuantity = 1
}: AddToCartButtonProps) {
  const { addItem, updateItemQuantity, items } = useCart()
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isAdded, setIsAdded] = useState(false)

  // Check if this product variant is already in the cart
  const existingItem = items.find(item => 
    item._id === product._id && 
    item.color === color && 
    item.size === size
  )

  const handleAddToCart = () => {
    const item: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color,
      size,
      image: product.image
    }

    addItem(item)
    
    // Show added confirmation
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
    
    if (existingItem) {
      updateItemQuantity(product._id, color, size, existingItem.quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
      
      if (existingItem) {
        updateItemQuantity(product._id, color, size, existingItem.quantity - 1)
      }
    }
  }

  return (
    <div className={`flex ${showQuantityControls ? 'items-center space-x-2' : ''}`}>
      {showQuantityControls && (
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-r-none"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <div className="w-10 text-center">{existingItem?.quantity || quantity}</div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-l-none"
            onClick={incrementQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <Button 
        variant={variant} 
        className={className}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added
          </>
        ) : existingItem ? (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Update Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  )
}
