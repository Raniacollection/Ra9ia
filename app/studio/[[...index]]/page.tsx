"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"
import { Suspense } from "react"

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NextStudio config={config} disabletransition />
    </Suspense>
  )
} 