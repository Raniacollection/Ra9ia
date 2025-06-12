import { CheckCircle, AlertCircle } from "lucide-react"

interface ProductStockIndicatorProps {
  inventoryManagement?: {
    trackInventory: boolean
    totalStock: number
    lowStockThreshold: number
    showRemainingStock: boolean
  }
  colorStockQuantity?: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  variant?: "pill" | "icon" | "text" | "badge"
}

export function ProductStockIndicator({
  inventoryManagement,
  colorStockQuantity,
  size = "md",
  showLabel = true,
  variant = "pill"
}: ProductStockIndicatorProps) {
  // If inventory tracking is disabled or no inventory management data
  if (!inventoryManagement?.trackInventory) {
    return null
  }

  // Use color specific stock if provided, otherwise use total stock
  const stockQuantity = colorStockQuantity !== undefined 
    ? colorStockQuantity 
    : inventoryManagement.totalStock

  // Determine stock status
  const isOutOfStock = stockQuantity === 0
  const isLowStock = stockQuantity > 0 && stockQuantity <= inventoryManagement.lowStockThreshold
  const isInStock = stockQuantity > 0 && !isLowStock

  // Don't show anything if we don't want to display in-stock items and the item is in stock
  if (isInStock && !inventoryManagement.showRemainingStock && variant !== "icon" && variant !== "badge") {
    return null
  }

  // Size classes
  const sizeClasses = {
    sm: "text-xs py-0.5 px-1.5",
    md: "text-xs py-1 px-2",
    lg: "text-sm py-1 px-3"
  }

  // Badge variant (new)
  if (variant === "badge") {
    const stockStatusClass = isOutOfStock 
      ? "out-of-stock" 
      : isLowStock 
      ? "low-stock" 
      : "in-stock";
      
    return (
      <div className={`stock-badge ${stockStatusClass}`}>
        {stockQuantity}
      </div>
    )
  }

  // Render pill variant
  if (variant === "pill") {
    return (
      <div 
        className={`inline-flex items-center rounded-full font-medium ${
          isOutOfStock 
            ? "bg-red-100 text-red-800" 
            : isLowStock 
            ? "bg-amber-100 text-amber-800" 
            : "bg-green-100 text-green-800"
        } ${sizeClasses[size]}`}
      >
        {isOutOfStock && (
          <>
            <AlertCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
            {showLabel && "Out of stock"}
          </>
        )}
        {isLowStock && (
          <>
            <AlertCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
            {showLabel && (
              inventoryManagement.showRemainingStock 
                ? `Only ${stockQuantity} left` 
                : "Low stock"
            )}
          </>
        )}
        {isInStock && inventoryManagement.showRemainingStock && (
          <>
            <CheckCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
            {showLabel && `${stockQuantity} in stock`}
          </>
        )}
      </div>
    )
  }

  // Render icon variant
  if (variant === "icon") {
    return (
      <div className="inline-flex">
        {isOutOfStock && (
          <AlertCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} text-red-500`} />
        )}
        {isLowStock && (
          <AlertCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} text-amber-500`} />
        )}
        {isInStock && (
          <CheckCircle className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} text-green-500`} />
        )}
      </div>
    )
  }

  // Render text variant
  return (
    <span 
      className={`inline-flex items-center font-medium ${
        isOutOfStock 
          ? "text-red-600" 
          : isLowStock 
          ? "text-amber-600" 
          : "text-green-600"
      } ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}`}
    >
      {isOutOfStock && "Out of stock"}
      {isLowStock && (
        inventoryManagement.showRemainingStock 
          ? `Only ${stockQuantity} left` 
          : "Low stock"
      )}
      {isInStock && inventoryManagement.showRemainingStock && `${stockQuantity} in stock`}
    </span>
  )
} 