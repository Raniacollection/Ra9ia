"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ProductCard } from "./product-card"
import { ProductStockIndicator } from "./product-stock-indicator"
import { RestockNotification } from "./restock-notification"
import { useWishlist } from "../contexts/wishlist-context"
import { OrderNowModal } from "./order-now-modal"

interface ProductDetailsProps {
  product: any // We'll improve this type later
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const { addItem: addItemToWishlist, removeItem: removeItemFromWishlist, isInWishlist } = useWishlist()

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  // Function to select a color and show the corresponding image if available
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName)
    
    // Try to find an image that corresponds to this color (assuming proper naming convention)
    const colorIndex = product.colors.findIndex((c: { name: string }) => c.name === colorName)
    if (colorIndex >= 0 && colorIndex < product.images.length) {
      setSelectedImage(colorIndex)
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
          <DialogTrigger asChild>
            <div className="aspect-square relative overflow-hidden rounded-lg border border-burgundy-100 cursor-pointer">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <div className="relative aspect-square w-full">
              <Button 
                className="absolute right-2 top-2 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm hover:bg-black/30" 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsImageOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
        
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image: string, i: number) => (
              <div 
                key={i} 
                className={`aspect-square relative overflow-hidden rounded-lg border cursor-pointer transition-all ${
                  selectedImage === i 
                    ? "border-ra9ia-500 ring-2 ring-ra9ia-200" 
                    : "border-burgundy-100 hover:border-burgundy-300"
                }`}
                onClick={() => setSelectedImage(i)}
              >
                <Image src={image} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold tracking-tight text-ra9ia-900">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount || 0} {product.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
          <div className="text-2xl font-semibold text-ra9ia-800">${product.price.toFixed(2)}</div>
          
          {/* Stock Information */}
          {product.inventoryManagement?.trackInventory && (
            <div className="flex items-center gap-2 mt-2">
              <ProductStockIndicator
                inventoryManagement={product.inventoryManagement}
                variant="pill"
                size="md"
              />
              
              {product.inventoryManagement.totalStock > 0 && (
                <Link href="#shipping" className="text-xs text-ra9ia-700 underline underline-offset-4">
                  Check estimated delivery
                </Link>
              )}
            </div>
          )}
        </div>

        <Separator className="bg-burgundy-100" />

        <div className="space-y-4">
          <p className="text-muted-foreground">{product.description}</p>

          {product.details && product.details.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Product Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {product.details.map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Separator className="bg-burgundy-100" />

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Color</span>
              <span className="text-sm text-ra9ia-700 capitalize">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {product.colors.map((color: { name: string; value: string; stockQuantity?: number }) => {
                const isOutOfStock = color.stockQuantity === 0;
                const isLowStock = color.stockQuantity !== undefined && color.stockQuantity > 0 && color.stockQuantity <= 5;
                const isInStock = color.stockQuantity !== undefined && color.stockQuantity > 5;
                
                const stockStatusClass = isOutOfStock 
                  ? "out-of-stock" 
                  : isLowStock 
                  ? "low-stock" 
                  : "in-stock";
                
                return (
                  <div
                    key={color.name}
                    className="relative"
                  >
                    <div
                      className={`relative w-10 h-10 rounded-full border-2 cursor-pointer ${
                        isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        color.name === selectedColor
                          ? "border-ra9ia-500 ring-2 ring-ra9ia-200"
                          : "border-muted-foreground/20 hover:border-ra9ia-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => !isOutOfStock && handleColorSelect(color.name)}
                    >
                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-7 h-0.5 bg-gray-500 transform rotate-45"></div>
                        </div>
                      )}
                    </div>
                    
                    {color.stockQuantity !== undefined && (
                      <div className="color-stock-indicator">
                        <div className={`stock-badge ${stockStatusClass}`}>
                          {color.stockQuantity}
                        </div>
                      </div>
                    )}

                    {isOutOfStock && (
                      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                        <button 
                          onClick={() => {
                            const notifSection = document.getElementById('color-restock-notification');
                            if (notifSection) {
                              notifSection.scrollIntoView({ behavior: 'smooth' });
                              // Update selected color for notification
                              setSelectedColor(color.name);
                            }
                          }}
                          className="text-xs text-ra9ia-700 underline underline-offset-4 whitespace-nowrap"
                        >
                          Notify me
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Size</span>
              <Link href="/size-guide" className="text-sm text-ra9ia-700 underline underline-offset-4">
                Size Guide
              </Link>
            </div>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                  <label
                    htmlFor={`size-${size}`}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-burgundy-200 bg-transparent text-sm font-medium peer-data-[state=checked]:bg-ra9ia-50 peer-data-[state=checked]:text-ra9ia-900 peer-data-[state=checked]:border-ra9ia-500 cursor-pointer hover:bg-burgundy-50"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-4">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-md border-burgundy-200"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="flex h-9 w-10 items-center justify-center rounded-md border border-burgundy-200 bg-transparent text-sm font-medium">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-md border-burgundy-200"
              onClick={handleIncrement}
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            className="flex-1 bg-ra9ia-800 text-white hover:bg-ra9ia-900"
            disabled={product.inventoryManagement?.totalStock === 0}
            onClick={() => {
              if (!product) return;
              setIsOrderModalOpen(true);
            }}
          >
            {product.inventoryManagement?.totalStock === 0 ? "Out of Stock" : "Order Now"}
          </Button>
          <Button 
            variant="outline" 
            className="border-burgundy-200 hover:bg-burgundy-50"
            onClick={() => {
              const wishlistItem = {
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || "/placeholder.svg",
                color: selectedColor,
              };
              if (isInWishlist(product._id)) {
                removeItemFromWishlist(product._id);
              } else {
                addItemToWishlist(wishlistItem);
              }
            }}
          >
            <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product._id) ? "fill-red-500 text-red-500" : ""}`} />
            {isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </div>

        {/* OrderNowModal */}
        <OrderNowModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          product={{
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[selectedImage] || product.images?.[0] || "/placeholder.svg"
          }}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />

        {/* Restock Notification */}
        {(product.inventoryManagement?.totalStock === 0 || 
          product.colors?.some((c: { name: string; stockQuantity?: number }) => 
            c.name === selectedColor && c.stockQuantity === 0)) && (
          <div id="color-restock-notification">
            <RestockNotification 
              productId={product._id}
              productName={product.name}
              color={selectedColor}
              size={selectedSize}
              isEnabled={product.inventoryManagement?.enableRestockNotifications}
              restockDate={product.inventoryManagement?.restockDate}
            />
          </div>
        )}

        {/* Collection Info */}
        {product.collection && (
          <div className="pt-4">
            <Link
              href={`/collections/${product.collection.slug}`}
              className="text-sm text-ra9ia-700 hover:text-ra9ia-800"
            >
              Part of the {product.collection.name} Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 