import Link from "next/link"
import Image from "next/image"
import { CreditCard, Heart, LogOut, Package, Settings, ShoppingBag, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"

export default function AccountPage() {
  // Mock user data
  const user = {
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
  }

  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "March 15, 2023",
      status: "Delivered",
      total: 279.98,
      items: 2,
    },
    {
      id: "ORD-12344",
      date: "February 28, 2023",
      status: "Delivered",
      total: 149.99,
      items: 1,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/4">
              <Card className="border-burgundy-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-burgundy-100">
                      <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-ra9ia-900">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-1">
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-ra9ia-50 text-ra9ia-900 font-medium"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>Account Overview</span>
                    </Link>
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-burgundy-50 hover:text-ra9ia-800"
                    >
                      <Package className="h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-burgundy-50 hover:text-ra9ia-800"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/account/addresses"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-burgundy-50 hover:text-ra9ia-800"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Addresses</span>
                    </Link>
                    <Link
                      href="/account/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-burgundy-50 hover:text-ra9ia-800"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full border-burgundy-200 hover:bg-burgundy-50 text-muted-foreground"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4 space-y-8">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-ra9ia-900">Account Overview</h1>

              <Tabs defaultValue="orders" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="orders"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-ra9ia-700 data-[state=active]:text-ra9ia-900 pb-2 pt-1 px-4 font-medium"
                  >
                    Recent Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="wishlist"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-ra9ia-700 data-[state=active]:text-ra9ia-900 pb-2 pt-1 px-4 font-medium"
                  >
                    Wishlist Items
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="orders" className="pt-6">
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-burgundy-100">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                              <div className="font-medium text-ra9ia-900">{order.id}</div>
                              <div className="text-sm text-muted-foreground">{order.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${order.total.toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">
                                {order.items} {order.items === 1 ? "item" : "items"}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-burgundy-100">
                            <div className="flex items-center">
                              <span
                                className={`inline-block w-2 h-2 rounded-full mr-2 ${order.status === "Delivered" ? "bg-green-500" : "bg-amber-500"}`}
                              ></span>
                              <span className="text-sm">{order.status}</span>
                            </div>
                            <Link href={`/account/orders/${order.id}`}>
                              <Button variant="outline" size="sm" className="border-burgundy-200 hover:bg-burgundy-50">
                                View Order
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="text-center">
                      <Link href="/account/orders">
                        <Button variant="outline" className="border-burgundy-200 hover:bg-burgundy-50">
                          View All Orders
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="wishlist" className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <Card key={item} className="border-burgundy-100 group">
                        <CardContent className="p-0">
                          <div className="relative">
                            <Link href={`/product/${item}`}>
                              <div className="aspect-[3/4] overflow-hidden">
                                <Image
                                  src="/placeholder.svg?height=600&width=450"
                                  alt={`Wishlist item ${item}`}
                                  width={450}
                                  height={600}
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="p-4">
                            <Link href={`/product/${item}`} className="font-medium hover:text-ra9ia-700">
                              {item === 1
                                ? "Elegant Embroidered Abaya"
                                : item === 2
                                  ? "Classic Pleated Abaya"
                                  : "Floral Lace Abaya"}
                            </Link>
                            <div className="flex justify-between items-center mt-1">
                              <div className="text-ra9ia-800 font-semibold">${(129.99 + item * 10).toFixed(2)}</div>
                            </div>
                            <Button className="w-full mt-4 bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <Link href="/wishlist">
                      <Button variant="outline" className="border-burgundy-200 hover:bg-burgundy-50">
                        View All Wishlist Items
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

