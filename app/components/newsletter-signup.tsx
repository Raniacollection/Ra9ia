"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setIsSuccess(true)
        setEmail("")
      } else {
        setError("Please enter a valid email address")
      }
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
                Subscribe to Our Newsletter
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Stay updated with our latest collections, exclusive offers, and modest fashion tips.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-burgundy-200 pr-10"
                    disabled={isSubmitting || isSuccess}
                  />
                  {isSuccess && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-ra9ia-800 text-white hover:bg-ra9ia-900"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Subscribed!
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {isSuccess && (
                <p className="text-sm text-green-600">
                  Thank you for subscribing! Check your email for a confirmation.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl">
            <Image
              src="/images/hero.png"
              alt="Newsletter subscription"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

