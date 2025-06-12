/**
 * Telegram integration utility for Ra9ia Collection
 * Handles sending order information to Telegram
 */

import { formatCurrency } from './utils'

export interface OrderItem {
  product: {
    _id: string
    name: string
    price: number
  }
  quantity: number
  color?: string
  size?: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  telegramUsername?: string
}

export interface ShippingAddress {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

export interface TelegramOrderData {
  orderId: string
  customerInfo: CustomerInfo
  orderItems: OrderItem[]
  totalAmount: number
  shippingAddress?: ShippingAddress
  shippingNotes?: string
}

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `RA-${timestamp}-${random}`
}

/**
 * Format order data into a readable text message for Telegram
 */
export function formatOrderForTelegram(order: TelegramOrderData): string {
  // Create the message header
  let message = `🛍️ *NEW ORDER: ${order.orderId}*\n\n`
  
  // Add customer information
  message += `*Customer Information:*\n`
  message += `👤 Name: ${order.customerInfo.name}\n`
  message += `📧 Email: ${order.customerInfo.email}\n`
  message += `📱 Phone: ${order.customerInfo.phone}\n`
  
  if (order.customerInfo.telegramUsername) {
    message += `📱 Telegram: @${order.customerInfo.telegramUsername}\n`
  }
  
  message += '\n'
  
  // Add order items
  message += `*Order Items:*\n`
  order.orderItems.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`
    message += `   • Quantity: ${item.quantity}\n`
    message += `   • Price: ${formatCurrency(item.product.price)}\n`
    
    if (item.color) {
      message += `   • Color: ${item.color}\n`
    }
    
    if (item.size) {
      message += `   • Size: ${item.size}\n`
    }
    
    message += `   • Subtotal: ${formatCurrency(item.product.price * item.quantity)}\n\n`
  })
  
  // Add total amount
  message += `*Total Amount: ${formatCurrency(order.totalAmount)}*\n\n`
  
  // Add shipping address if available
  if (order.shippingAddress) {
    const address = order.shippingAddress
    message += `*Shipping Address:*\n`
    
    if (address.street) message += `${address.street}\n`
    
    const cityStateZip = [
      address.city,
      address.state,
      address.postalCode
    ].filter(Boolean).join(', ')
    
    if (cityStateZip) message += `${cityStateZip}\n`
    if (address.country) message += `${address.country}\n`
    message += '\n'
  }
  
  // Add shipping notes if available
  if (order.shippingNotes) {
    message += `*Shipping Notes:*\n${order.shippingNotes}\n\n`
  }
  
  // Add timestamp
  message += `*Order Date:* ${new Date().toLocaleString()}\n`
  
  return message
}

/**
 * Send order data to Telegram
 * This function requires a Telegram bot token and chat ID to be set in environment variables
 */
export async function sendOrderToTelegram(order: TelegramOrderData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram bot token or chat ID not set in environment variables')
      return { 
        success: false, 
        error: 'Telegram configuration missing' 
      }
    }
    
    const message = formatOrderForTelegram(order)
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
    
    const data = await response.json()
    
    if (data.ok) {
      return {
        success: true,
        messageId: data.result.message_id.toString(),
      }
    } else {
      console.error('Error sending message to Telegram:', data)
      return {
        success: false,
        error: data.description || 'Unknown error',
      }
    }
  } catch (error) {
    console.error('Error sending order to Telegram:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate a deep link to Telegram chat
 * @param username Telegram username (without @)
 * @param text Optional text to pre-fill in the message
 */
export function generateTelegramChatLink(username: string, text?: string): string {
  if (!username) return ''
  
  const baseUrl = `https://t.me/${username.replace('@', '')}`
  
  if (text) {
    return `${baseUrl}?text=${encodeURIComponent(text)}`
  }
  
  return baseUrl
}

/**
 * Redirect to Telegram with order information
 * This function can be used on the client side to redirect the user to Telegram
 */
export function redirectToTelegramWithOrder(telegramUsername: string, order: TelegramOrderData): void {
  if (typeof window === 'undefined') return
  
  const orderText = formatOrderForTelegram(order)
  const telegramUrl = generateTelegramChatLink(telegramUsername, orderText)
  
  // Open in a new tab
  window.open(telegramUrl, '_blank')
}
