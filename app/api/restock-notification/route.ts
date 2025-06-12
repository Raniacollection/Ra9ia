import { NextResponse } from "next/server"
import { createClient } from "@/sanity/lib/client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, productId, productName, color, size } = body

    // Basic validation
    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email and product ID are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Create Sanity client
    const client = createClient()

    // Check if notification already exists for this email/product/color combination
    const existingNotifications = await client.fetch(
      `*[_type == "restockNotification" && email == $email && product._ref == $productId && color == $color && notificationSent == false][0]`,
      { email, productId, color }
    )

    if (existingNotifications) {
      return NextResponse.json(
        { message: "You're already on the waitlist for this item" },
        { status: 200 }
      )
    }

    // Create new restock notification document
    const notification = await client.create({
      _type: "restockNotification",
      email,
      product: {
        _type: "reference",
        _ref: productId,
      },
      color,
      size,
      createdAt: new Date().toISOString(),
      notificationSent: false,
    })

    return NextResponse.json(
      { 
        message: "You'll be notified when this item is back in stock",
        id: notification._id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating restock notification:", error)
    return NextResponse.json(
      { error: "Failed to register for restock notification" },
      { status: 500 }
    )
  }
} 