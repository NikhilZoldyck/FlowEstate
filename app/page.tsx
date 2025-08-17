"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ShoppingCart, Plus } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Trade Real Estate as <span className="text-blue-600">NFTs</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your property investments into digital assets on Flow blockchain. Mint, buy, and sell real estate
            NFTs with complete transparency and security.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Sell Property</CardTitle>
              <CardDescription>Convert your real estate into NFTs and list them on the marketplace</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/mint">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Mint Property NFT
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Buy Property</CardTitle>
              <CardDescription>Browse and purchase property NFTs from other sellers</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/marketplace">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Browse Marketplace
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose FlowEstate?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure Ownership</h4>
              <p className="text-gray-600">Blockchain-verified property ownership with immutable records</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Easy Trading</h4>
              <p className="text-gray-600">Simple wallet integration for seamless property transactions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Global Marketplace</h4>
              <p className="text-gray-600">Access to worldwide property investments through NFTs</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
