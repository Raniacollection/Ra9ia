"use client"

import React from "react"

interface InstagramMedia {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp?: string
}

export function SocialFeed() {
  const [items, setItems] = React.useState<InstagramMedia[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const IG_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN
  const IG_USER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID
  const IG_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || ""
  const IG_ENABLED = Boolean(IG_TOKEN && IG_USER_ID)

  React.useEffect(() => {
    if (!IG_ENABLED) return

    const controller = new AbortController()

    async function load() {
      try {
        const url = `https://graph.instagram.com/${IG_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${IG_TOKEN}&limit=3`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error("Instagram API error")
        const data = await res.json()
        if (Array.isArray(data.data)) {
          setItems(data.data)
        } else {
          setItems([])
        }
      } catch (e) {
        if ((e as any)?.name !== "AbortError") {
          setError("Unable to load Instagram feed right now.")
        }
      }
    }

    load()
    return () => controller.abort()
  }, [IG_ENABLED, IG_TOKEN, IG_USER_ID])

  if (!IG_ENABLED) return null

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/70">Social</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif tracking-tight text-ra9ia-900">Latest on Instagram</h2>
          </div>
          <a
            href={IG_USERNAME ? `https://instagram.com/${IG_USERNAME.replace('@','')}` : "https://instagram.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm text-ra9ia-900/70 hover:text-ra9ia-900"
          >
            {IG_USERNAME ? `Follow ${IG_USERNAME}` : "Follow"} →
          </a>
        </div>

        {error && (
          <div className="mt-6 text-sm text-red-600">{error}</div>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {(items || []).map((m) => (
            <a
              key={m.id}
              href={m.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-none md:rounded border border-burgundy-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.media_type === "VIDEO" ? (m.thumbnail_url || m.media_url) : m.media_url}
                alt={m.caption || "Instagram post"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
