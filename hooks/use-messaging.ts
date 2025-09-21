"use client"

import * as React from "react"

export interface MessagingSettings {
  telegramUsername: string | null
  whatsappNumber: string | null
}

export function useMessagingSettings() {
  const [messaging, setMessaging] = React.useState<MessagingSettings>({ telegramUsername: null, whatsappNumber: null })
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch("/api/site-settings")
        if (!res.ok) throw new Error("Failed to load settings")
        const data = await res.json()
        if (!cancelled) {
          setMessaging(data.messaging || { telegramUsername: null, whatsappNumber: null })
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { messaging, loading, error }
}
