"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, ShoppingBag, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProductStockIndicator } from "./product-stock-indicator"

interface ProductColor {
  name: string
  value: string
  stockQuantity?: number
}

interface QuickViewModalProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  productImages?: string[]
  productDescription?: string
  colors?: ProductColor[]
  sizes?: string[]
  trigger: React.ReactNode
  inventoryManagement?: {
    trackInventory: boolean
    totalStock: number
    lowStockThreshold: number
    showRemainingStock: boolean
  }
}

export function QuickViewModal({ 
  productId, 
  productName, 
  productPrice, 
  productImage,
  productImages = [],
  productDescription,
  colors,
  sizes,
  trigger,
  inventoryManagement
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const initialSize = (sizes && sizes.length > 0) ? sizes[0] : "M";
  const [selectedSize, setSelectedSize] = useState(initialSize);
  
  const initialColor = (colors && colors.length > 0 && colors[0]?.name) ? colors[0].name : "black";
  const [selectedColor, setSelectedColor] = useState(initialColor);
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const effectiveColors = colors || [];
  const effectiveSizes = sizes || ["XS", "S", "M", "L", "XL"];

  // Create a consolidated images array that includes the main image
  const allImages = productImages.length > 0 
    ? productImages 
    : productImage ? [productImage] : ["/placeholder.svg"]

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  // Function to select a color and update the displayed image
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName)
    
    // Try to find an image that corresponds to this color (assuming proper naming convention)
    const colorIndex = effectiveColors.findIndex((c) => c.name === colorName)
    if (colorIndex >= 0 && colorIndex < allImages.length) {
      setSelectedImage(colorIndex)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log("Added to cart:", {
      id: productId,
      name: productName,
      price: productPrice,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    // Close the modal after adding to cart
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="flex flex-col space-y-2 p-2">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image 
                src={allImages[selectedImage]} 
                alt={productName} 
                fill 
                className="object-cover"
                priority 
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {allImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square relative overflow-hidden rounded-md border cursor-pointer transition-all ${
                      selectedImage === idx 
                        ? "border-ra9ia-500 ring-1 ring-ra9ia-200" 
                        : "border-burgundy-100 hover:border-burgundy-300"
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image src={img} alt={`${productName} ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-serif text-ra9ia-900">{productName}</DialogTitle>
              <DialogDescription>
                <span className="text-lg font-medium text-ra9ia-800">${productPrice.toFixed(2)}</span>
              </DialogDescription>
            </DialogHeader>

            {/* Stock Information */}
            {inventoryManagement?.trackInventory && (
              <div className="flex items-center gap-2">
                <ProductStockIndicator
                  inventoryManagement={inventoryManagement}
                  variant="pill"
                  size="sm"
                />
                
                {inventoryManagement.totalStock > 0 && (
                  <Link href="#" className="text-xs text-ra9ia-700 underline underline-offset-4">
                    Check shipping
                  </Link>
                )}
              </div>
            )}

            <p className="text-muted-foreground text-sm">
              {productDescription || "This elegant piece features intricate details and premium fabric, designed for both comfort and style. Perfect for any occasion."}
            </p>

            {/* Color Selection */}
            {effectiveColors.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Color</span>
                  <span className="text-xs text-ra9ia-700 capitalize">{selectedColor}</span>
                </div>
                <div className="flex space-x-3">
                  {effectiveColors.map((color) => {
                    const isOutOfStock = 'stockQuantity' in color && color.stockQuantity === 0;
                    return (
                      <div
                        key={color.name}
                        className={`relative w-7 h-7 rounded-full border-2 cursor-pointer ${
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
                            <div className="w-5 h-0.5 bg-gray-500 transform rotate-45"></div>
                          </div>
                        )}
                        {'stockQuantity' in color && color.stockQuantity !== undefined && (
                          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                            <ProductStockIndicator
                              inventoryManagement={inventoryManagement}
                              colorStockQuantity={color.stockQuantity}
                              variant="text"
                              size="sm"
                              showLabel={color.stockQuantity <= 5}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {effectiveSizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Size</span>
                  <Link href="/size-guide" className="text-xs text-ra9ia-700 underline underline-offset-4">
                    Size Guide
                  </Link>
                </div>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                  {effectiveSizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem value={size} id={`quick-size-${size}`} className="peer sr-only" />
                      <label
                        htmlFor={`quick-size-${size}`}
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
            <div className="space-y-3">
              <span className="font-medium text-sm">Quantity</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-md border-burgundy-200"
                  onClick={decrementQuantity}
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
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button 
                className="bg-ra9ia-800 text-white hover:bg-ra9ia-900 flex-1" 
                onClick={handleAddToCart}
                disabled={inventoryManagement?.totalStock === 0}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {inventoryManagement?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="border-burgundy-200 hover:bg-burgundy-50">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
            </div>

            <div className="pt-4">
              <Link
                href={`/product/${productId}`}
                className="text-sm text-ra9ia-700 hover:text-ra9ia-800 underline underline-offset-4"
              >
                View full details
              </Link>
            </div>
          </div>
        </div>
        <Button
          className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white/80 p-0 text-muted-foreground shadow-sm backdrop-blur hover:bg-white hover:text-foreground"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

