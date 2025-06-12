import { 
  createContext, 
  useContext, 
  useState, 
  useEffect,
  ReactNode 
} from "react"

import { CartItem } from "@/components/cart/cart-telegram-checkout"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateItemQuantity: (itemId: string, color: string | undefined, size: string | undefined, quantity: number) => void
  removeItem: (itemId: string, color: string | undefined, size: string | undefined) => void
  clearCart: () => void
  itemCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("ra9ia-cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("ra9ia-cart")
      }
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ra9ia-cart", JSON.stringify(items))
  }, [items])
  
  // Generate a unique key for an item based on id, color, and size
  const getItemKey = (id: string, color?: string, size?: string) => {
    return `${id}-${color || "default"}-${size || "default"}`
  }
  
  // Add an item to the cart
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart (same id, color, and size)
      const itemKey = getItemKey(newItem._id, newItem.color, newItem.size)
      const existingItemIndex = prevItems.findIndex(item => 
        getItemKey(item._id, item.color, item.size) === itemKey
      )
      
      // If the item exists, update its quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        }
        return updatedItems
      }
      
      // Otherwise, add the new item
      return [...prevItems, newItem]
    })
  }
  
  // Update the quantity of an item
  const updateItemQuantity = (
    itemId: string, 
    color: string | undefined, 
    size: string | undefined, 
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(itemId, color, size)
      return
    }
    
    setItems(prevItems => {
      const itemKey = getItemKey(itemId, color, size)
      return prevItems.map(item => {
        if (getItemKey(item._id, item.color, item.size) === itemKey) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }
  
  // Remove an item from the cart
  const removeItem = (
    itemId: string, 
    color: string | undefined, 
    size: string | undefined
  ) => {
    setItems(prevItems => {
      const itemKey = getItemKey(itemId, color, size)
      return prevItems.filter(
        item => getItemKey(item._id, item.color, item.size) !== itemKey
      )
    })
  }
  
  // Clear the entire cart
  const clearCart = () => {
    setItems([])
  }
  
  // Calculate the total number of items in the cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  
  // Calculate the total price of all items in the cart
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        itemCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  
  return context
}
