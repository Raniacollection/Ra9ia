"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { useMessagingSettings } from "@/hooks/use-messaging"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const { messaging } = useMessagingSettings()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (formState.name && formState.email && formState.message) {
        setIsSuccess(true)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          inquiryType: "general",
        })
      } else {
        setError("Please fill in all required fields.")
      }
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
                  Contact Us
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We'd love to hear from you. Get in touch with our team.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-ra9ia-900 mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Whether you have a question about our products, need styling advice, or want to collaborate with us,
                    our team is here to help.
                  </p>

                  <div className="space-y-6">
                    {/* Chat with us (replaces Visit Us) */}
                    <div className="flex items-start gap-4">
                      <div className="bg-ra9ia-50 p-3 rounded-full">
                        <Phone className="h-5 w-5 text-ra9ia-800" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ra9ia-900">Chat with us</h3>
                        <div className="text-muted-foreground space-y-1">
                          {messaging.telegramUsername && (
                            <p>
                              Telegram: <a className="text-ra9ia-800 hover:underline" href={`https://t.me/${messaging.telegramUsername.replace('@','')}`} target="_blank" rel="noopener noreferrer">@{messaging.telegramUsername.replace('@','')}</a>
                            </p>
                          )}
                          {messaging.whatsappNumber && (
                            <p>
                              WhatsApp: <a className="text-ra9ia-800 hover:underline" href={`https://wa.me/${messaging.whatsappNumber.replace(/[^\d]/g,'')}`} target="_blank" rel="noopener noreferrer">{messaging.whatsappNumber}</a>
                            </p>
                          )}
                          {!messaging.telegramUsername && !messaging.whatsappNumber && (
                            <p>Reach us directly via the contact form or social channels below.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-ra9ia-50 p-3 rounded-full">
                        <Mail className="h-5 w-5 text-ra9ia-800" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ra9ia-900">Email Us</h3>
                        <p className="text-muted-foreground">
                          <a href="mailto:info@ra9iacollection.com" className="hover:text-ra9ia-700">
                            info@ra9iacollection.com
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="mailto:support@ra9iacollection.com" className="hover:text-ra9ia-700">
                            support@ra9iacollection.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-ra9ia-50 p-3 rounded-full">
                        <Phone className="h-5 w-5 text-ra9ia-800" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ra9ia-900">Call Us</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+971123456789" className="hover:text-ra9ia-700">
                          +251941267101
                          </a>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sunday - Thursday: 9am - 6pm
                          <br />
                          Friday - Saturday: 10am - 4pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-[300px] overflow-hidden rounded-xl">
                  <Image
                    src="/images/contact.webp"
                    alt="Ra9ia Collection Support"
                    fill
                    className="object-cover object-[center_40%]"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-ra9ia-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="bg-ra9ia-50 p-3 rounded-full text-ra9ia-800 hover:bg-ra9ia-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="#"
                      className="bg-ra9ia-50 p-3 rounded-full text-ra9ia-800 hover:bg-ra9ia-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="#"
                      className="bg-ra9ia-50 p-3 rounded-full text-ra9ia-800 hover:bg-ra9ia-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="bg-ra9ia-50 p-3 rounded-full text-ra9ia-800 hover:bg-ra9ia-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 0-6 6v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-burgundy-100">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold text-ra9ia-900 mb-6">Send Us a Message</h2>

                    {isSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-green-600"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-green-800 mb-2">Message Sent Successfully!</h3>
                        <p className="text-green-700 mb-4">
                          Thank you for reaching out. Our team will get back to you as soon as possible.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsSuccess(false)}
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">
                              Your Name <span className="text-ra9ia-700">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              className="mt-1 border-burgundy-200"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">
                              Your Email <span className="text-ra9ia-700">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              className="mt-1 border-burgundy-200"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="inquiryType">Inquiry Type</Label>
                            <RadioGroup
                              value={formState.inquiryType}
                              onValueChange={handleRadioChange}
                              className="mt-2 space-y-3"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="general" id="general" className="text-ra9ia-600" />
                                <Label htmlFor="general">General Inquiry</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="product" id="product" className="text-ra9ia-600" />
                                <Label htmlFor="product">Product Question</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="order" id="order" className="text-ra9ia-600" />
                                <Label htmlFor="order">Order Support</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="partnership" id="partnership" className="text-ra9ia-600" />
                                <Label htmlFor="partnership">Partnership Opportunity</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              placeholder="Enter subject"
                              className="mt-1 border-burgundy-200"
                            />
                          </div>

                          <div>
                            <Label htmlFor="message">
                              Message <span className="text-ra9ia-700">*</span>
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              placeholder="Enter your message"
                              className="mt-1 border-burgundy-200"
                              rows={5}
                              required
                            />
                          </div>
                        </div>

                        {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

                        <Button
                          type="submit"
                          className="w-full bg-ra9ia-800 text-white hover:bg-ra9ia-900"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-ra9ia-900 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-ra9ia-800">What are your shipping options?</h4>
                      <p className="text-sm text-muted-foreground">
                        We offer standard shipping (3-5 business days) and express shipping (1-2 business days).
                        International shipping is available to select countries.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-ra9ia-800">How can I track my order?</h4>
                      <p className="text-sm text-muted-foreground">
                        Once your order ships, you'll receive a tracking number via email. You can also track your order
                        in your account dashboard.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-ra9ia-800">What is your return policy?</h4>
                      <p className="text-sm text-muted-foreground">
                        We offer a 30-day return policy for unworn items in original packaging. Please visit our{" "}
                        <Link href="/returns" className="text-ra9ia-700 hover:underline">
                          Returns page
                        </Link>{" "}
                        for more details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

