// Web3 utilities for Flow blockchain integration
export const FLOW_TESTNET_CONFIG = {
  chainId: "0x221", // 545 in hex
  chainName: "Flow EVM Testnet",
  nativeCurrency: {
    name: "FLOW",
    symbol: "FLOW",
    decimals: 18,
  },
  rpcUrls: ["https://testnet.evm.nodes.onflow.org"],
  blockExplorerUrls: ["https://evm-testnet.flowscan.io"],
}

export const FLOW_MAINNET_CONFIG = {
  chainId: "0x2EE", // 747 in hex
  chainName: "Flow EVM Mainnet",
  nativeCurrency: {
    name: "FLOW",
    symbol: "FLOW",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.evm.nodes.onflow.org"],
  blockExplorerUrls: ["https://evm.flowscan.io"],
}

// Contract addresses (replace with your deployed contracts)
export const CONTRACTS = {
  PROPERTY_NFT: "0x548E5c954034C0F91674D5Afd6E6dF01f2B59819",
  MARKETPLACE: "0xe00815A1595Ea26de7B233877449d30015e49649",
}

export const checkWalletConnection = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      return accounts.length > 0 ? accounts[0] : null
    } catch (error) {
      console.error("Error checking wallet connection:", error)
      return null
    }
  }
  return null
}

export const connectWallet = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      return accounts[0]
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }
  throw new Error("MetaMask not installed")
}

export const switchToFlowNetwork = async (isMainnet = false) => {
  const config = isMainnet ? FLOW_MAINNET_CONFIG : FLOW_TESTNET_CONFIG

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.chainId }],
    })
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [config],
        })
      } catch (addError) {
        console.error("Error adding Flow network:", addError)
        throw addError
      }
    } else {
      console.error("Error switching to Flow network:", switchError)
      throw switchError
    }
  }
}

export const getFlowNetworkInfo = (chainId: string) => {
  switch (chainId) {
    case "0x221": // 545 in hex
      return {
        name: "Flow EVM Testnet",
        isTestnet: true,
        explorerUrl: "https://evm-testnet.flowscan.io",
        faucetUrl: "https://faucet.flow.com/fund-account",
        rpcUrl: "https://testnet.evm.nodes.onflow.org",
      }
    case "0x2EE": // 747 in hex
      return {
        name: "Flow EVM Mainnet",
        isTestnet: false,
        explorerUrl: "https://evm.flowscan.io",
        faucetUrl: null,
        rpcUrl: "https://mainnet.evm.nodes.onflow.org",
      }
    default:
      return null
  }
}

export const isFlowNetwork = (chainId: string): boolean => {
  return chainId === "0x221" || chainId === "0x2EE"
}

export const getCurrentChainId = async (): Promise<string | null> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      return await window.ethereum.request({ method: "eth_chainId" })
    } catch (error) {
      console.error("Error getting chain ID:", error)
      return null
    }
  }
  return null
}

export const getBalance = async (address: string): Promise<string | null> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const Web3 = (await import("web3")).default
      const web3 = new Web3(window.ethereum)
      const balance = await web3.eth.getBalance(address)
      return web3.utils.fromWei(balance, "ether")
    } catch (error) {
      console.error("Error getting balance:", error)
      return null
    }
  }
  return null
}

export const formatAddress = (address: string): string => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatFlowAmount = (amount: string | number, decimals = 4): string => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return num.toFixed(decimals)
}

export const validateFlowAddress = (address: string): boolean => {
  // Basic Ethereum address validation (Flow EVM uses same format)
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Enhanced contract interaction utilities
export const createContract = async (abi: any[], address: string) => {
  if (typeof window !== "undefined" && window.ethereum) {
    const Web3 = (await import("web3")).default
    const web3 = new Web3(window.ethereum)
    return new web3.eth.Contract(abi, address)
  }
  throw new Error("Web3 not available")
}

export const estimateGas = async (contract: any, method: string, params: any[], from: string): Promise<number> => {
  try {
    const gasEstimate = await contract.methods[method](...params).estimateGas({ from })
    // Add 20% buffer for gas estimation
    return Math.floor(gasEstimate * 1.2)
  } catch (error) {
    console.error("Error estimating gas:", error)
    // Return a reasonable default
    return 500000
  }
}

export const sendTransaction = async (
  contract: any,
  method: string,
  params: any[],
  options: { from: string; value?: string; gas?: number },
) => {
  try {
    const gasLimit = options.gas || (await estimateGas(contract, method, params, options.from))

    return await contract.methods[method](...params).send({
      ...options,
      gas: gasLimit,
    })
  } catch (error: any) {
    // Enhanced error handling for common Flow/EVM errors
    if (error.message.includes("insufficient funds")) {
      throw new Error("Insufficient FLOW balance to complete transaction")
    } else if (error.message.includes("gas")) {
      throw new Error("Transaction failed due to gas estimation error")
    } else if (error.message.includes("revert")) {
      throw new Error("Transaction reverted - check contract conditions")
    } else if (error.code === 4001) {
      throw new Error("Transaction rejected by user")
    } else {
      throw new Error(`Transaction failed: ${error.message}`)
    }
  }
}

// Flow-specific utilities for faucet and testnet
export const requestTestnetFunds = async (address: string): Promise<boolean> => {
  try {
    // This would typically call Flow's faucet API
    // For now, we'll just provide instructions
    const faucetUrl = "https://faucet.flow.com/fund-account"
    window.open(faucetUrl, "_blank")
    return true
  } catch (error) {
    console.error("Error requesting testnet funds:", error)
    return false
  }
}

// Network monitoring utilities
export const setupNetworkListeners = (
  onAccountChange: (accounts: string[]) => void,
  onChainChange: (chainId: string) => void,
) => {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", onAccountChange)
    window.ethereum.on("chainChanged", onChainChange)

    // Cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", onAccountChange)
        window.ethereum.removeListener("chainChanged", onChainChange)
      }
    }
  }
  return () => {}
}

// Transaction status utilities
export const waitForTransaction = async (txHash: string, maxWaitTime = 60000): Promise<any> => {
  if (typeof window !== "undefined" && window.ethereum) {
    const Web3 = (await import("web3")).default
    const web3 = new Web3(window.ethereum)

    const startTime = Date.now()

    while (Date.now() - startTime < maxWaitTime) {
      try {
        const receipt = await web3.eth.getTransactionReceipt(txHash)
        if (receipt) {
          return receipt
        }
      } catch (error) {
        console.log("Waiting for transaction confirmation...")
      }

      // Wait 2 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    throw new Error("Transaction confirmation timeout")
  }
  throw new Error("Web3 not available")
}

export const getTransactionStatus = async (txHash: string): Promise<"pending" | "success" | "failed" | "not_found"> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const Web3 = (await import("web3")).default
      const web3 = new Web3(window.ethereum)

      const receipt = await web3.eth.getTransactionReceipt(txHash)
      if (!receipt) {
        return "pending"
      }

      return receipt.status ? "success" : "failed"
    } catch (error) {
      return "not_found"
    }
  }
  return "not_found"
}

// Flow blockchain specific constants and utilities
export const FLOW_CONSTANTS = {
  TESTNET: {
    CHAIN_ID: "0x221",
    CHAIN_ID_DECIMAL: 545,
    NAME: "Flow EVM Testnet",
    RPC_URL: "https://testnet.evm.nodes.onflow.org",
    EXPLORER_URL: "https://evm-testnet.flowscan.io",
    FAUCET_URL: "https://faucet.flow.com/fund-account",
  },
  MAINNET: {
    CHAIN_ID: "0x2EE",
    CHAIN_ID_DECIMAL: 747,
    NAME: "Flow EVM Mainnet",
    RPC_URL: "https://mainnet.evm.nodes.onflow.org",
    EXPLORER_URL: "https://evm.flowscan.io",
  },
  CURRENCY: {
    NAME: "FLOW",
    SYMBOL: "FLOW",
    DECIMALS: 18,
  },
}

// Error types for better error handling
export class Web3Error extends Error {
  constructor(
    message: string,
    public code?: string | number,
  ) {
    super(message)
    this.name = "Web3Error"
  }
}

export class NetworkError extends Web3Error {
  constructor(
    message: string,
    public chainId?: string,
  ) {
    super(message)
    this.name = "NetworkError"
  }
}

export class TransactionError extends Web3Error {
  constructor(
    message: string,
    public txHash?: string,
  ) {
    super(message)
    this.name = "TransactionError"
  }
}

// Utility to check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
}

// Utility to get MetaMask installation URL
export const getMetaMaskInstallUrl = (): string => {
  return "https://metamask.io/download/"
}
