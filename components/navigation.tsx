"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Wallet, Plus, ShoppingCart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { checkWalletConnection, connectWallet, switchToFlowNetwork, FLOW_TESTNET_CONFIG } from "@/lib/web3"

export default function Navigation() {
  const [account, setAccount] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    checkConnection()
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    const connectedAccount = await checkWalletConnection()
    if (connectedAccount) {
      setAccount(connectedAccount)
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(chainId)
      }
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0])
    } else {
      setAccount("")
    }
  }

  const handleChainChanged = (chainId: string) => {
    setChainId(chainId)
    window.location.reload()
  }

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      const connectedAccount = await connectWallet()
      setAccount(connectedAccount)

      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      setChainId(chainId)

      if (chainId !== FLOW_TESTNET_CONFIG.chainId) {
        await switchToFlowNetwork(false)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSwitchNetwork = async () => {
    try {
      await switchToFlowNetwork(false)
    } catch (error) {
      console.error("Error switching network:", error)
    }
  }

  const disconnectWallet = () => {
    setAccount("")
    setChainId("")
  }

  const isOnFlowTestnet = chainId === FLOW_TESTNET_CONFIG.chainId

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mint", label: "Sell Property", icon: Plus },
    { href: "/marketplace", label: "Buy Property", icon: ShoppingCart },
  ]

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FlowEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center gap-4">
            {account ? (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </div>
                  <div className={cn("text-xs", isOnFlowTestnet ? "text-green-600" : "text-orange-600")}>
                    {isOnFlowTestnet ? "Flow Testnet" : "Wrong Network"}
                  </div>
                </div>
                {!isOnFlowTestnet && (
                  <Button variant="outline" size="sm" onClick={handleSwitchNetwork}>
                    Switch Network
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={handleConnectWallet} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-700">
                <Wallet className="mr-2 h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Wallet Connection */}
            <div className="mt-4 pt-4 border-t">
              {account ? (
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </div>
                    <div className={cn("text-xs", isOnFlowTestnet ? "text-green-600" : "text-orange-600")}>
                      {isOnFlowTestnet ? "Flow Testnet" : "Wrong Network"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!isOnFlowTestnet && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSwitchNetwork}
                        className="flex-1 bg-transparent"
                      >
                        Switch Network
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={disconnectWallet} className="flex-1 bg-transparent">
                      Disconnect
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
