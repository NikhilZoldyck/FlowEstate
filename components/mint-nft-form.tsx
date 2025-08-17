<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-100 p-6">
    <div class="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Mint Property NFT</h2>
      <p class="text-center text-sm text-gray-500 mb-6">Transform your real estate into digital assets on the blockchain</p>
\
      <form @submit.prevent="mintNFT" class="space-y-6">
        <div class="flex flex-col">
          <label for="name" class="text-lg font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          />
        </div>

        <div class="flex flex-col">
          <label for="address" class="text-lg font-medium text-gray-700">Property Address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            required
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="description"
            required
            rows="4"
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          ></textarea>
        </div>

        <div class="flex flex-col">
          <label for="squareFootage" class="text-lg font-medium text-gray-700">Square Footage</label>
          <input
            type="number"
            id="squareFootage"
            v-model="squareFootage"
            required
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          />
        </div>

        <div class="flex flex-col">
          <label for="price" class="text-lg font-medium text-gray-700">Sale Price (ETH)</label>
          <input
            type="number"
            id="price"
            v-model="price"
            required
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          />
        </div>

        <div class="flex flex-col">
          <label for="image" class="text-lg font-medium text-gray-700">Property Image URL</label>
          <input
            type="url"
            id="image"
            v-model="image"
            required
            class="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
\
          :disabled="isLoading"
          class="w-full py-3 mt-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
\
          {{ isLoading ? 'Minting...\' : \'Mint NFT' }}
        </button>
      </form>

      <div v-if="status" class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-lg">
        {{ status }}
      </div>
    </div>
  </div>
</template><script>
import Web3 from "web3"

export default {
  data() {
    return {
      name: "",
      address: "",
      description: "",
      squareFootage: "",
      price: "",
      image: "",
      isLoading: false,
      status: "",
      contractAddress: "0x548E5c954034C0F91674D5Afd6E6dF01f2B59819",
      abi: [
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
      ],
    }
  },
  methods: {
    async mintNFT() {
      if (!window.ethereum) {
        alert("Please install MetaMask to interact with this DApp.")
        return
      }

      this.isLoading = true
      this.status = "Connecting to wallet..."

      try {
        const web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: "eth_requestAccounts" })

        const accounts = await web3.eth.getAccounts()
        const contract = new web3.eth.Contract(this.abi, this.contractAddress)

        this.status = "Uploading metadata to Walrus..."

        // Create metadata object
        /*const metadata = {
          name: this.name,
          description: this.description,
          image: this.image,
          attributes: [
            { trait_type: "Address", value: this.address },
            { trait_type: "Square Footage", value: this.squareFootage },
            { trait_type: "Price", value: this.price }
          ]
        };*/

        // Upload to Walrus (or fallback to direct JSON)
        // const tokenURI = await this.uploadToWalrus(metadata);

        this.status = "Minting NFT..."

        // Call the correct mint function based on your ABI
        const tx = await contract.methods
          .mint(
            accounts[0], // to
            this.name, // name
            this.description, // description
            this.address, // streetAddress
            Number.parseInt(this.squareFootage), // squareFootage
            this.image, // imageUrl
            Number.parseInt(this.price) * 1e18, // price
          )
          .send({ from: accounts[0] })

        this.status = `NFT minted successfully! Transaction: ${tx.transactionHash}`
        this.resetForm()
      } catch (error) {
        console.error("Error minting NFT:", error)
        this.status = `Error: ${error.message}`
      } finally {
        this.isLoading = false
      }
    },

    async uploadToWalrus(metadata) {
      // Method 1: Try Walrus API directly (if you have correct endpoint)
      try {
        return await this.uploadToWalrusAPI(metadata)
      } catch (error) {
        console.warn("Walrus upload failed, using fallback:", error)

        // Method 2: Fallback - create data URL or use alternative storage
        return this.createDataURL(metadata)
      }
    },

    async uploadToWalrusAPI(metadata) {
      // Updated Walrus API integration
      const WALRUS_PUBLISHER_URL = "https://publisher.walrus-testnet.walrus.space/v1/store"

      try {
        //const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });

        const response = await fetch(WALRUS_PUBLISHER_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(metadata),
        })

        if (!response.ok) {
          throw new Error(`Walrus API error: ${response.status}`)
        }

        const result = await response.json()

        // Return the Walrus blob ID or URL
        return result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId || `walrus://${result.blobId}`
      } catch (error) {
        throw new Error(`Failed to upload to Walrus: ${error.message}`)
      }
    },

    createDataURL(metadata) {
      // Fallback: Create a data URL (for testing)
      const jsonString = JSON.stringify(metadata)
      return `data:application/json;base64,${btoa(jsonString)}`
    },

    // Alternative: Upload to a simple storage service
    async uploadToAlternativeStorage(metadata) {
      try {
        // Example using a public JSON storage service
        const response = await fetch("https://api.jsonbin.io/v3/b", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "YOUR_JSONBIN_API_KEY", // Get from jsonbin.io
          },
          body: JSON.stringify(metadata),
        })

        if (response.ok) {
          const result = await response.json()
          return `https://api.jsonbin.io/v3/b/${result.metadata.id}`
        }
        throw new Error("Storage service failed")
      } catch (error) {
        throw new Error(`Storage upload failed: ${error.message}`)
      }
    },

    resetForm() {
      this.name = ""
      this.address = ""
      this.description = ""
      this.squareFootage = ""
      this.price = ""
      this.image = ""
    },
  },
}
</script>
