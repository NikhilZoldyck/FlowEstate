"use client"

import { useState, useEffect, useCallback } from "react"
import {
  checkWalletConnection,
  connectWallet,
  switchToFlowNetwork,
  getCurrentChainId,
  getBalance,
  isFlowNetwork,
  getFlowNetworkInfo,
  setupNetworkListeners,
  FLOW_CONSTANTS,
  isMetaMaskInstalled,
} from "@/lib/web3"

interface Web3State {
  account: string
  chainId: string
  balance: string
  isConnected: boolean
  isCorrectNetwork: boolean
  networkInfo: any
  isLoading: boolean
  error: string
}

export const useWeb3 = () => {
  const [state, setState] = useState<Web3State>({
    account: "",
    chainId: "",
    balance: "0",
    isConnected: false,
    isCorrectNetwork: false,
    networkInfo: null,
    isLoading: true,
    error: "",
  })

  const updateState = useCallback((updates: Partial<Web3State>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const checkConnection = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      updateState({
        error: "MetaMask is not installed",
        isLoading: false,
      })
      return
    }

    try {
      const account = await checkWalletConnection()
      const chainId = await getCurrentChainId()

      if (account && chainId) {
        const balance = await getBalance(account)
        const isCorrectNetwork = isFlowNetwork(chainId)
        const networkInfo = getFlowNetworkInfo(chainId)

        updateState({
          account,
          chainId,
          balance: balance || "0",
          isConnected: true,
          isCorrectNetwork,
          networkInfo,
          isLoading: false,
          error: "",
        })
      } else {
        updateState({
          isConnected: false,
          isLoading: false,
          error: "",
        })
      }
    } catch (error: any) {
      updateState({
        error: error.message || "Failed to check wallet connection",
        isLoading: false,
      })
    }
  }, [updateState])

  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      updateState({ error: "MetaMask is not installed" })
      return false
    }

    updateState({ isLoading: true, error: "" })

    try {
      const account = await connectWallet()
      const chainId = await getCurrentChainId()

      if (account && chainId) {
        // Switch to Flow Testnet if not already on a Flow network
        if (!isFlowNetwork(chainId)) {
          await switchToFlowNetwork(false) // false = testnet
        }

        await checkConnection()
        return true
      }
      return false
    } catch (error: any) {
      updateState({
        error: error.message || "Failed to connect wallet",
        isLoading: false,
      })
      return false
    }
  }, [checkConnection, updateState])

  const disconnect = useCallback(() => {
    updateState({
      account: "",
      chainId: "",
      balance: "0",
      isConnected: false,
      isCorrectNetwork: false,
      networkInfo: null,
      error: "",
    })
  }, [updateState])

  const switchNetwork = useCallback(
    async (isMainnet = false) => {
      updateState({ isLoading: true, error: "" })

      try {
        await switchToFlowNetwork(isMainnet)
        await checkConnection()
        return true
      } catch (error: any) {
        updateState({
          error: error.message || "Failed to switch network",
          isLoading: false,
        })
        return false
      }
    },
    [checkConnection, updateState],
  )

  const refreshBalance = useCallback(async () => {
    if (state.account) {
      try {
        const balance = await getBalance(state.account)
        updateState({ balance: balance || "0" })
      } catch (error) {
        console.error("Failed to refresh balance:", error)
      }
    }
  }, [state.account, updateState])

  // Set up event listeners
  useEffect(() => {
    const cleanup = setupNetworkListeners(
      (accounts: string[]) => {
        if (accounts.length > 0) {
          checkConnection()
        } else {
          disconnect()
        }
      },
      () => {
        // Reload page on chain change to avoid state issues
        window.location.reload()
      },
    )

    return cleanup
  }, [checkConnection, disconnect])

  // Initial connection check
  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  return {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    refreshBalance,
    checkConnection,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    flowConstants: FLOW_CONSTANTS,
  }
}
