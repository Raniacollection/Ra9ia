"use client"

import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent px-0 py-0 text-sm leading-6 text-ra9ia-900/80 hover:text-ra9ia-900 focus:bg-transparent data-[state=open]:text-ra9ia-900">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="border border-burgundy-100 rounded-none md:rounded bg-white shadow-sm">
            <div className="md:w-[880px] lg:w-[980px] xl:w-[1040px] p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Links (two columns) */}
                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-serif text-lg text-ra9ia-900 mb-3">Shop by category</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/collections?c=abayas" className="text-ra9ia-900/75 hover:text-ra9ia-900">Abayas</Link>
                      </li>
                      <li>
                        <Link href="/collections?c=kaftans" className="text-ra9ia-900/75 hover:text-ra9ia-900">Kaftans</Link>
                      </li>
                      <li>
                        <Link href="/collections?c=hijabs" className="text-ra9ia-900/75 hover:text-ra9ia-900">Hijabs & scarves</Link>
                      </li>
                      <li>
                        <Link href="/collections?c=accessories" className="text-ra9ia-900/75 hover:text-ra9ia-900">Accessories</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-ra9ia-900 mb-3">Featured</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/new-arrivals" className="text-ra9ia-900/75 hover:text-ra9ia-900">New arrivals</Link>
                      </li>
                      <li>
                        <Link href="/bestsellers" className="text-ra9ia-900/75 hover:text-ra9ia-900">Bestsellers</Link>
                      </li>
                      <li>
                        <Link href="/collections" className="text-ra9ia-900/75 hover:text-ra9ia-900">All collections</Link>
                      </li>
                      <li>
                        <Link href="/partners" className="text-ra9ia-900/75 hover:text-ra9ia-900">Partner products</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Right: Editorial tile */}
                <div>
                  <Link href="/new-arrivals" className="group block relative overflow-hidden border border-burgundy-100">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/images/hero-desert.jpeg"
                        alt="New season"
                        fill
                        sizes="420px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
                      <div className="absolute left-4 bottom-4 right-4 text-white">
                        <div className="font-serif text-xl tracking-tight">New arrivals</div>
                        <div className="text-sm text-white/80">Fresh abayas in stock</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/collections" className="text-sm text-ra9ia-900/70 hover:text-ra9ia-900">
                  View all collections →
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
