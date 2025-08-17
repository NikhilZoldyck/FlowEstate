"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, ExternalLink, Droplets } from "lucide-react"
import { useWeb3Context } from "@/components/web3-provider"

export default function FlowNetworkStatus() {
  const { isConnected, isCorrectNetwork, networkInfo, balance, switchNetwork, account } = useWeb3Context()

  if (!isConnected) {
    return null
  }

  if (isCorrectNetwork && networkInfo) {
    return (
      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-700">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Connected to {networkInfo.name}</span>
              <div className="text-sm mt-1">
                Balance: {Number.parseFloat(balance).toFixed(4)} FLOW
                {networkInfo.isTestnet && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Testnet
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {networkInfo.isTestnet && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(networkInfo.faucetUrl, "_blank")}
                  className="text-xs"
                >
                  <Droplets className="h-3 w-3 mr-1" />
                  Get Testnet FLOW
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`${networkInfo.explorerUrl}/address/${account}`, "_blank")}
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View on Explorer
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-orange-500 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Wrong Network</span>
            <div className="text-sm mt-1">Please switch to Flow Testnet to use this application</div>
          </div>
          <Button size="sm" onClick={() => switchNetwork(false)} className="bg-orange-600 hover:bg-orange-700">
            Switch to Flow Testnet
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
