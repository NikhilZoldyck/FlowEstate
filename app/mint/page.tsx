"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { checkWalletConnection, CONTRACTS } from "@/lib/web3"

// Property NFT Contract ABI (from the provided attachment)
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

interface PropertyFormData {
  name: string
  address: string
  description: string
  squareFootage: string
  price: string
  image: string
}

export default function MintPage() {
  const [account, setAccount] = useState<string>("")
  const [formData, setFormData] = useState<PropertyFormData>({
    name: "",
    address: "",
    description: "",
    squareFootage: "",
    price: "",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [txHash, setTxHash] = useState("")

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    const connectedAccount = await checkWalletConnection()
    if (connectedAccount) {
      setAccount(connectedAccount)
    }
  }

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    const { name, address, description, squareFootage, price, image } = formData

    if (!name.trim()) {
      setStatus("Property name is required")
      return false
    }
    if (!address.trim()) {
      setStatus("Property address is required")
      return false
    }
    if (!description.trim()) {
      setStatus("Description is required")
      return false
    }
    if (!squareFootage || Number.parseInt(squareFootage) <= 0) {
      setStatus("Valid square footage is required")
      return false
    }
    if (!price || Number.parseFloat(price) <= 0) {
      setStatus("Valid price is required")
      return false
    }
    if (!image.trim()) {
      setStatus("Property image URL is required")
      return false
    }

    return true
  }

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!account) {
      setStatus("Please connect your wallet first")
      return
    }

    if (!validateForm()) {
      return
    }

    if (!window.ethereum) {
      setStatus("Please install MetaMask to interact with this DApp")
      return
    }

    setIsLoading(true)
    setStatus("Connecting to wallet...")

    try {
      const Web3 = (await import("web3")).default
      const web3 = new Web3(window.ethereum)

      const accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect your wallet.")
      }

      const contract = new web3.eth.Contract(PROPERTY_NFT_ABI, CONTRACTS.PROPERTY_NFT)

      setStatus("Minting NFT...")

      const priceInWei = web3.utils.toWei(formData.price, "ether")

      console.log("[v0] Minting NFT with data:", {
        to: accounts[0],
        name: formData.name,
        description: formData.description,
        address: formData.address,
        squareFootage: formData.squareFootage,
        price: formData.price,
        priceInWei: priceInWei,
      })

      const tx = await contract.methods
        .mint(
          accounts[0],
          formData.name,
          formData.description,
          formData.address,
          Number.parseInt(formData.squareFootage),
          formData.image,
          priceInWei,
        )
        .send({
          from: accounts[0],
          gas: 500000,
        })

      console.log("[v0] Mint transaction completed:", tx)
      setTxHash(tx.transactionHash)

      setStatus("Saving property to database...")

      try {
        const response = await fetch("/api/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            address: formData.address,
            description: formData.description,
            square_footage: formData.squareFootage,
            price: formData.price,
            image_url: formData.image,
            token_id: null, // Will be updated when we can get the token ID from the transaction
            owner_address: accounts[0],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save property to database")
        }

        const result = await response.json()
        console.log("[v0] Property saved to database:", result)

        setStatus(`NFT minted and listed successfully! Transaction: ${tx.transactionHash}`)

        setTimeout(() => {
          setStatus(`Property successfully minted and listed for sale! Check the marketplace to see your property.`)
        }, 2000)
      } catch (dbError: any) {
        console.error("[v0] Database error:", dbError)
        setStatus(`NFT minted successfully but failed to list in marketplace. Transaction: ${tx.transactionHash}`)
      }

      resetForm()
    } catch (error: any) {
      console.error("[v0] Error minting NFT:", error)
      setStatus(`Error: ${error.message || "Failed to mint NFT"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      description: "",
      squareFootage: "",
      price: "",
      image: "",
    })
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Wallet Required</CardTitle>
            <CardDescription>Please connect your wallet to mint property NFTs</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              You need to connect your wallet and be on Flow Testnet to mint property NFTs.
            </p>
            <Button onClick={() => (window.location.href = "/")} variant="outline">
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-gray-800">Mint Property NFT</CardTitle>
            <CardDescription className="text-gray-500">
              Transform your real estate into digital assets on the Flow blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={mintNFT} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-medium text-gray-700">
                  Property Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  placeholder="e.g., Luxury Downtown Condo"
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-lg font-medium text-gray-700">
                  Property Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                  placeholder="e.g., 123 Main St, New York, NY 10001"
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the property features, amenities, and unique selling points..."
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="squareFootage" className="text-lg font-medium text-gray-700">
                  Square Footage
                </Label>
                <Input
                  id="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                  required
                  min="1"
                  placeholder="e.g., 1200"
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-lg font-medium text-gray-700">
                  Sale Price (FLOW)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                  min="0.01"
                  placeholder="e.g., 100.5"
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-lg font-medium text-gray-700">
                  Property Image URL
                </Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  required
                  placeholder="https://example.com/property-image.jpg"
                  className="p-3 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Mint NFT
                  </>
                )}
              </Button>
            </form>

            {status && (
              <Alert
                className={`mt-6 ${txHash ? "border-green-500 bg-green-50" : status.includes("Error") ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"}`}
              >
                {txHash ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : status.includes("Error") ? (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                )}
                <AlertDescription
                  className={txHash ? "text-green-700" : status.includes("Error") ? "text-red-700" : "text-blue-700"}
                >
                  {status}
                  {txHash && (
                    <div className="mt-2">
                      <a
                        href={`https://evm-testnet.flowscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View on Flow Explorer
                      </a>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
