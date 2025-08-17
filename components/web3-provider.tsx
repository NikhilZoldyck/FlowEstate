"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useWeb3 } from "@/hooks/use-web3"

interface Web3ContextType {
  account: string
  chainId: string
  balance: string
  isConnected: boolean
  isCorrectNetwork: boolean
  networkInfo: any
  isLoading: boolean
  error: string
  connect: () => Promise<boolean>
  disconnect: () => void
  switchNetwork: (isMainnet?: boolean) => Promise<boolean>
  refreshBalance: () => Promise<void>
  checkConnection: () => Promise<void>
  isMetaMaskInstalled: boolean
  flowConstants: any
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export const useWeb3Context = () => {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3Context must be used within a Web3Provider")
  }
  return context
}

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const web3State = useWeb3()

  return <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>
}
