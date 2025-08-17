"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, MapPin, Square, DollarSign, ShoppingCart, Loader2, RefreshCw } from "lucide-react"
import { checkWalletConnection } from "@/lib/web3"
import Image from "next/image"

// Property NFT Contract ABI (same as mint page)
const PROPERTY_NFT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getRealEstateData",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "streetAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "squareFootage",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "defaultAdmin",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "streetAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "squareFootage",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
]

interface PropertyNFT {
  tokenId: string
  name: string
  description: string
  streetAddress: string
  squareFootage: string
  imageUrl: string
  price: string
  priceInFlow: string
  owner: string
  isOwnedByUser: boolean
}

export default function MarketplacePage() {
  const [account, setAccount] = useState<string>("")
  const [properties, setProperties] = useState<PropertyNFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [buyingTokenId, setBuyingTokenId] = useState<string>("")
  const [status, setStatus] = useState("")
  const [txHash, setTxHash] = useState("")

  const sampleProperties: PropertyNFT[] = [
    {
      tokenId: "sample-1",
      name: "Luxury Downtown Condo",
      description:
        "Modern 2-bedroom condo in the heart of downtown with stunning city views, premium finishes, and access to building amenities including gym, rooftop terrace, and concierge service.",
      streetAddress: "123 Main St, New York, NY 10001",
      squareFootage: "1200",
      imageUrl: "/modern-house.png",
      price: "100500000000000000000", // 100.5 FLOW in wei
      priceInFlow: "100.5",
      owner: "0x0000000000000000000000000000000000000000",
      isOwnedByUser: false,
    },
    {
      tokenId: "sample-2",
      name: "Suburban Family Home",
      description:
        "Spacious 4-bedroom family home with large backyard, updated kitchen, hardwood floors throughout, and located in excellent school district.",
      streetAddress: "456 Oak Avenue, Austin, TX 78701",
      squareFootage: "2400",
      imageUrl: "/suburban-family-home.png",
      price: "250000000000000000000", // 250 FLOW in wei
      priceInFlow: "250.0",
      owner: "0x0000000000000000000000000000000000000000",
      isOwnedByUser: false,
    },
    {
      tokenId: "sample-3",
      name: "Beachfront Villa",
      description:
        "Stunning oceanfront villa with private beach access, infinity pool, 5 bedrooms, gourmet kitchen, and panoramic ocean views from every room.",
      streetAddress: "789 Ocean Drive, Miami, FL 33139",
      squareFootage: "3500",
      imageUrl: "/luxury-beachfront-villa.png",
      price: "500000000000000000000", // 500 FLOW in wei
      priceInFlow: "500.0",
      owner: "0x0000000000000000000000000000000000000000",
      isOwnedByUser: false,
    },
  ]

  useEffect(() => {
    checkConnection()
  }, [])

  useEffect(() => {
    if (account) {
      fetchProperties()
    }
  }, [account])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && account) {
        fetchProperties()
      }
    }

    const handleFocus = () => {
      if (account) {
        fetchProperties()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [account])

  const checkConnection = async () => {
    const connectedAccount = await checkWalletConnection()
    if (connectedAccount) {
      setAccount(connectedAccount)
    }
  }

  const fetchProperties = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/properties")

      if (!response.ok) {
        throw new Error("Failed to fetch properties from database")
      }

      const result = await response.json()
      console.log("[v0] Fetched properties from database:", result.properties)

      // Convert database properties to PropertyNFT format
      const dbProperties: PropertyNFT[] = result.properties.map((prop: any) => ({
        tokenId: prop.id,
        name: prop.name,
        description: prop.description,
        streetAddress: prop.address,
        squareFootage: prop.square_footage.toString(),
        imageUrl: prop.image_url,
        price: (Number.parseFloat(prop.price) * 1e18).toString(), // Convert to wei for consistency
        priceInFlow: prop.price.toString(),
        owner: prop.owner_address || "0x0000000000000000000000000000000000000000",
        isOwnedByUser: prop.owner_address?.toLowerCase() === account.toLowerCase(),
      }))

      setProperties(dbProperties)
      setStatus(dbProperties.length === 0 ? "No properties found in the marketplace" : "")
    } catch (error: any) {
      console.error("[v0] Error fetching properties from database:", error)
      // Fallback to sample properties if database fails
      setProperties(sampleProperties)
      setStatus(`Showing sample properties. Database error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const buyProperty = async (tokenId: string, price: string) => {
    setBuyingTokenId(tokenId)
    setStatus("Processing purchase...")

    try {
      const response = await fetch(`/api/properties/${tokenId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to process purchase")
      }

      // Remove property from local state
      setProperties((prev) => prev.filter((p) => p.tokenId !== tokenId))
      setStatus("Property purchased successfully!")
      setTxHash("0x" + Math.random().toString(16).substr(2, 64)) // Simulate transaction hash

      setTimeout(() => {
        setStatus("Purchase completed! The property has been removed from the marketplace.")
      }, 2000)
    } catch (error: any) {
      console.error("[v0] Error purchasing property:", error)
      setStatus(`Error: ${error.message || "Failed to purchase property"}`)
    } finally {
      setBuyingTokenId("")
    }
  }

  const refreshProperties = () => {
    if (account) {
      setIsLoading(true)
      fetchProperties()
    }
  }

  const PropertyCard = ({ property }: { property: PropertyNFT }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.imageUrl || "/placeholder.svg?height=200&width=300&query=modern house"}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/modern-house.png"
          }}
        />
        {property.isOwnedByUser && (
          <Badge className="absolute top-2 right-2 bg-green-600 text-white">Owned by You</Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold line-clamp-1">{property.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{property.streetAddress}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4 text-gray-500" />
            <span>{Number(property.squareFootage).toLocaleString()} sq ft</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>{Number(property.priceInFlow).toFixed(2)} FLOW</span>
          </div>
        </div>

        <div className="pt-2">
          {property.isOwnedByUser ? (
            <Button disabled className="w-full bg-transparent" variant="outline">
              <Home className="mr-2 h-4 w-4" />
              You Own This Property
            </Button>
          ) : (
            <Button
              onClick={() => buyProperty(property.tokenId, property.price)}
              disabled={buyingTokenId === property.tokenId}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {buyingTokenId === property.tokenId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Purchasing...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Property
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const PropertySkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Marketplace</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover and purchase premium real estate NFTs on Flow blockchain
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={refreshProperties}
              disabled={isLoading || !account}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Properties
            </Button>
          </div>

          {!account && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">Please connect your wallet to view and purchase properties</p>
            </div>
          )}

          {status && (
            <div
              className={`rounded-lg p-4 mb-6 ${
                status.includes("Error")
                  ? "bg-red-50 border border-red-200 text-red-800"
                  : "bg-blue-50 border border-blue-200 text-blue-800"
              }`}
            >
              <p>{status}</p>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Available</h3>
            <p className="text-gray-600 mb-6">Be the first to mint and list a property NFT!</p>
            <Button onClick={() => (window.location.href = "/mint")} className="bg-green-600 hover:bg-green-700">
              Mint Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.tokenId} property={property} />
            ))}
          </div>
        )}

        {!isLoading && properties.length > 0 && (
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-600">{properties.length}</div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {properties.filter((p) => p.isOwnedByUser).length}
                </div>
                <div className="text-gray-600">Owned by You</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {properties.filter((p) => !p.isOwnedByUser).length}
                </div>
                <div className="text-gray-600">Available to Buy</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
