import { NextResponse } from 'next/server'
import { createClient } from '@/sanity/lib/client'

export async function GET() {
  try {
    const client = createClient()
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{
        messaging{
          telegramUsername,
          whatsappNumber
        }
      }`
    )

    const messaging = data?.messaging || {}

    return NextResponse.json({
      messaging: {
        telegramUsername: messaging.telegramUsername || null,
        whatsappNumber: messaging.whatsappNumber || null,
      },
    })
  } catch (err) {
    console.error('Error fetching site settings:', err)
    return NextResponse.json({ messaging: { telegramUsername: null, whatsappNumber: null } }, { status: 200 })
  }
}
