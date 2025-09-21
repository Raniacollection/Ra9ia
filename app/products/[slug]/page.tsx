"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { client, urlFor } from "@/sanity/lib/client"
import { ChevronRight, Share2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"
import { CartTelegramCheckout } from "@/components/cart/cart-telegram-checkout"
 

interface ProductColor {
  name: string
  value: string
  stockQuantity: number
}

interface ProductImage {
  _key: string
  asset: {
    _ref: string
  }
}

interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  description: string
  details: string[]
  colors: ProductColor[]
  sizes: string[]
  images: ProductImage[]
  category: {
    name: string
    slug: {
      current: string
    }
  }
  collection?: {
    name: string
    slug: {
      current: string
    }
  }
  rating: number
  reviewCount: number
  isNewArrival: boolean
  isBestseller: boolean
  isPartnerProduct: boolean
  partner?: {
    name: string
    slug: {
      current: string
    }
    messaging?: {
      telegramUsername?: string | null
      whatsappNumber?: string | null
    }
  }
  inventoryManagement: {
    trackInventory: boolean
    totalStock: number
    lowStockThreshold: number
    showRemainingStock: boolean
  }
}

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]{
            _id,
            name,
            slug,
            price,
            description,
            details,
            colors,
            sizes,
            images,
            "category": category->{name, slug},
            "collection": collection->{name, slug},
            rating,
            reviewCount,
            isNewArrival,
            isBestseller,
            isPartnerProduct,
            "partner": partner->{name, slug, messaging},
            inventoryManagement
          }`,
          { slug: params.slug }
        )

        if (!data) {
          setError("Product not found")
        } else {
          setProduct(data)
          // Set default selections
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0].value)
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0])
          }
        }
      } catch (err) {
        setError("Failed to load product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug])

  const handleAddToCart = () => {
    if (!product) return

    const colorName = product.colors?.find(c => c.value === selectedColor)?.name || ""

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: colorName,
      size: selectedSize || "",
      image: (product.images && product.images.length > 0
        ? urlFor(product.images[0]).width(100).height(100).url()
        : "/placeholder.svg"),
      slug: product.slug?.current,
      partnerMessaging: product.isPartnerProduct && product.partner?.messaging ? {
        telegramUsername: product.partner.messaging.telegramUsername || undefined,
        whatsappNumber: product.partner.messaging.whatsappNumber || undefined,
      } : undefined
    })

    // Show added to cart confirmation
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  

  const handleBuyNow = () => {
    handleAddToCart()
    setIsCheckoutOpen(true)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading product...</div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">{error || "The requested product could not be found."}</p>
            <Link href="/collections">
              <Button>Browse Collections</Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/collections" className="hover:text-foreground">Collections</Link>
            {product.category && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link 
                  href={`/categories/${product.category.slug.current}`}
                  className="hover:text-foreground"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-none md:rounded-xl border border-burgundy-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={urlFor(product.images[activeImageIndex]).width(800).height(1067).url()}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
                
                {product.isNewArrival && (
                  <Badge className="absolute top-4 left-4 bg-ra9ia-800 text-white">New Arrival</Badge>
                )}
                
                {product.isBestseller && (
                  <Badge className="absolute top-4 right-4 bg-amber-500 text-white">Bestseller</Badge>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image._key}
                      className={`relative aspect-square rounded-none md:rounded overflow-hidden border border-burgundy-100 ${
                        index === activeImageIndex ? "ring-2 ring-ra9ia-800" : ""
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={urlFor(image).width(100).height(100).url()}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.isPartnerProduct && product.partner && (
                  <Link 
                    href={`/partners/${product.partner.slug.current}`}
                    className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/70 hover:text-ra9ia-900"
                  >
                    By {product.partner.name}
                  </Link>
                )}
                
                <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight mt-1">{product.name}</h1>
                
                <div className="flex items-center mt-2 space-x-4">
                  {product.inventoryManagement?.trackInventory && (
                    <div className="text-sm">
                      {product.inventoryManagement.totalStock <= 0 ? (
                        <span className="text-destructive font-medium">Out of Stock</span>
                      ) : product.inventoryManagement.totalStock <= product.inventoryManagement.lowStockThreshold ? (
                        <span className="text-amber-600 font-medium">
                          Low Stock
                          {product.inventoryManagement.showRemainingStock && 
                            ` (${product.inventoryManagement.totalStock} left)`}
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">In Stock</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <span className="text-2xl font-semibold text-ra9ia-900">{formatCurrency(product.price)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80 mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.value}
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color.value
                              ? "border-ra9ia-800"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                          disabled={color.stockQuantity <= 0}
                          title={color.name}
                        >
                          <span className="sr-only">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80 mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`px-4 py-2 border rounded-none md:rounded ${
                            selectedSize === size
                              ? "bg-ra9ia-800 text-white border-ra9ia-800"
                              : "bg-white border-burgundy-100"
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity Selection */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80 mb-3">Quantity</h3>
                  <div className="flex items-center w-32 border rounded-none md:rounded border-burgundy-100">
                    <button
                      className="w-10 h-10 flex items-center justify-center text-lg border-r"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">{quantity}</div>
                    <button
                      className="w-10 h-10 flex items-center justify-center text-lg border-l"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart & Buy Now Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={
                      addedToCart || 
                      (product.inventoryManagement?.trackInventory && 
                        product.inventoryManagement.totalStock <= 0)
                    }
                  >
                    {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleBuyNow}
                    disabled={
                      product.inventoryManagement?.trackInventory && 
                      product.inventoryManagement.totalStock <= 0
                    }
                  >
                    Buy Now
                  </Button>
                </div>
                
                {/* Share */}
                <div className="flex gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="text-ra9ia-900/70 hover:text-ra9ia-900">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Product Description */}
              <div className="pt-6 border-t border-burgundy-100">
                <p className="text-ra9ia-900/80 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs (reviews removed) */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full border-b rounded-none justify-start">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="py-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Product Details</h3>
                  {product.details && product.details.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No additional details available.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="py-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Information</h3>
                  <p className="text-muted-foreground">
                    We offer standard shipping which typically takes 3-5 business days. 
                    Express shipping options are available at checkout for faster delivery.
                  </p>
                  
                  <h3 className="text-lg font-medium mt-6">Return Policy</h3>
                  <p className="text-muted-foreground">
                    If you're not completely satisfied with your purchase, you can return it 
                    within 30 days for a full refund. Items must be unworn and in original packaging.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
      
      <CartTelegramCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={[{
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          color: product.colors?.find(c => c.value === selectedColor)?.name,
          size: selectedSize || undefined,
          image: product.images && product.images.length > 0 
            ? urlFor(product.images[0]).width(100).height(100).url() 
            : undefined,
          slug: product.slug?.current,
          partnerMessaging: product.isPartnerProduct && product.partner?.messaging ? {
            telegramUsername: product.partner.messaging.telegramUsername || undefined,
            whatsappNumber: product.partner.messaging.whatsappNumber || undefined,
          } : undefined
        }]}
        telegramUsername="ra9ia_collection" // Replace with your actual Telegram username
      />
    </div>
  )
}
