"use client"

import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { QuickViewModal } from "./quick-view-modal"
import { ProductStockIndicator } from "./product-stock-indicator"
import { OrderNowModal } from "./order-now-modal"

// Minimal ProductVariantType for the card
interface ProductVariantType {
  name: string;
  price?: number;
  stockQuantity?: number;
  images?: { asset?: { url?: string } }[];
}

// Original ProductColor for QuickViewModal compatibility if needed, or QuickViewModal needs update
interface ProductColor {
  name: string;
  value: string;
  stockQuantity?: number;
}

interface ProductCardProps {
  id: string;
  name: string;
  price?: number; // Changed to optional, was 'basePrice' but for compatibility let's use 'price'
  image?: string;
  images?: string[];
  description?: string;
  variants?: ProductVariantType[]; 
  inventoryManagement?: { // Keep structure similar to old for child components if they rely on it
    trackInventory: boolean;
    totalStock?: number; // Make optional, will be calculated if variants are used
    lowStockThreshold?: number;
    showRemainingStock?: boolean;
    // Added for completeness based on typical inventory settings, ensure these are provided or defaulted
    enableRestockNotifications?: boolean; 
  };
  colors?: ProductColor[]; // Keep for QuickViewModal if it hasn't been updated
  sizes?: string[]; // Keep for QuickViewModal
  slug?: string;
  partnerMessaging?: {
    telegramUsername?: string
    whatsappNumber?: string
  }
}

export function ProductCard({ 
  id, 
  name, 
  price, // This is the original prop name, now optional
  image, 
  images = [], 
  description, 
  variants = [],
  inventoryManagement,
  colors, // Keep for now
  sizes,  // Keep for now
  slug,
  partnerMessaging
}: ProductCardProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  // Determine display price: use direct price, or first variant's price
  let displayPrice: number | undefined = price;
  if (displayPrice === undefined && variants.length > 0 && variants[0].price !== undefined) {
    displayPrice = variants[0].price;
  }

  const displayImage = image || (variants[0]?.images?.[0]?.asset?.url) || "/placeholder.svg";
  const productImages = images.length > 0 ? images : image ? [image] : [];

  // Simplified stock logic based on new structure
  let currentTotalStock = inventoryManagement?.totalStock;
  if (inventoryManagement?.trackInventory && variants.length > 0) {
    currentTotalStock = variants.reduce((sum, v) => sum + (v.stockQuantity || 0), 0);
  }

  const isOutOfStock = inventoryManagement?.trackInventory && (currentTotalStock === 0);
  const productLink = slug ? `/products/${slug}` : `/collections`; 

  // Create a temporary inventoryManagement object for child components
  // This is a workaround until child components are updated
  const tempInventoryManagement = inventoryManagement ? {
    trackInventory: inventoryManagement.trackInventory,
    totalStock: currentTotalStock === undefined ? 0 : currentTotalStock,
    // Provide defaults if optional fields are undefined, to satisfy child component prop types
    lowStockThreshold: inventoryManagement.lowStockThreshold === undefined ? 5 : inventoryManagement.lowStockThreshold,
    showRemainingStock: inventoryManagement.showRemainingStock === undefined ? true : inventoryManagement.showRemainingStock,
    // Assuming QuickViewModal and ProductStockIndicator might expect this based on full Sanity schema
    enableRestockNotifications: inventoryManagement.enableRestockNotifications === undefined ? true : inventoryManagement.enableRestockNotifications,
  } : undefined;

  return (
    <Card className="overflow-hidden border-burgundy-100 product-card group">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={productLink}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={displayImage}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-transform group-hover:scale-105 ${isOutOfStock ? 'opacity-70' : ''}`}
              />
              
              {tempInventoryManagement?.trackInventory && (
                <div className="absolute top-2 left-2">
                  <ProductStockIndicator
                    inventoryManagement={tempInventoryManagement} // Pass adjusted inventory obj
                    variant="pill"
                    size="sm"
                  />
                </div>
              )}

              {/* Bottom overlay inside image container to avoid any visual gap */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Button 
                  className="w-full rounded-none h-10 border border-white/50 bg-black/40 text-white hover:bg-black/50"
                  disabled={isOutOfStock}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOrderModalOpen(true);
                  }}
                >
                  {isOutOfStock ? "Out of Stock" : "Order Now"}
                </Button>
              </div>
            </div>
          </Link>
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            {/* QuickViewModal needs update for variants. Passing old props for now. */}
            <QuickViewModal
              productId={id}
              productName={name}
              productPrice={displayPrice || 0} // Pass 0 if undefined, QVM needs update
              productImage={displayImage}
              productImages={productImages}
              productDescription={description}
              colors={colors} // Pass original colors prop
              sizes={sizes}   // Pass original sizes prop
              inventoryManagement={tempInventoryManagement} // Pass adjusted
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border border-burgundy-100 text-ra9ia-700 hover:text-ra9ia-900 hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Quick view</span>
                </Button>
              }
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <Link href={productLink} className="font-serif text-lg tracking-tight hover:text-ra9ia-900">
              {name}
            </Link>
            
            {tempInventoryManagement?.trackInventory && (
              <div className="ml-2 pt-1">
                <ProductStockIndicator
                  inventoryManagement={tempInventoryManagement} // Pass adjusted
                  variant="icon"
                  size="sm"
                />
              </div>
            )}
          </div>
          <div className="mt-1 flex justify-between items-center">
            {/* Price in ETB */}
            {displayPrice !== undefined ? (
              <div className="text-ra9ia-900 font-medium">{formatCurrency(displayPrice || 0)}</div>
            ) : (
              <div className="text-ra9ia-900 font-medium">Price unavailable</div>
            )}
            
            {/* Color swatches removed, logic was based on old 'colors' prop directly */}
            {/* To re-add, derive from variants if needed, or handle in QuickViewModal/ProductPage */}
          </div>
        </div>
      </CardContent>
      <OrderNowModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={{
          id,
          name,
          price: displayPrice,
          image: displayImage,
          // Pass slug so we can include a product link in the order message
          slug: slug,
          partnerMessaging
          // Pass other necessary product details like variants if your modal handles them
        }}
      />
    </Card>
  )
}

