# 🏠 Flow Property NFT Marketplace

A decentralized marketplace for tokenizing and trading real estate properties as NFTs on the Flow blockchain.

## 📝 Short Description

Web3 property marketplace: mint real estate as NFTs, list for sale, and trade on Flow blockchain with MetaMask.

## 🌟 Description

The Flow Property NFT Marketplace is a comprehensive web3 application that revolutionizes real estate trading by tokenizing properties as Non-Fungible Tokens (NFTs) on the Flow blockchain. This platform enables property owners to mint their real estate as digital assets and create a liquid marketplace for property trading.

### Key Features

- *🏡 Property Tokenization*: Convert real estate properties into NFTs with detailed metadata including address, description, square footage, and pricing
- *🔗 Wallet Integration*: Seamless MetaMask connection with automatic Flow Testnet network switching
- *💰 Marketplace Trading*: Browse, list, and purchase property NFTs with real-time transaction tracking
- *📊 Database Persistence*: Supabase integration for storing property details and managing marketplace listings
- *🎨 Modern UI/UX*: Responsive design with Tailwind CSS and shadcn/ui components
- *⚡ Real-time Updates*: Automatic marketplace refresh and transaction status tracking

### User Journey

1. *Connect Wallet*: Users connect their MetaMask wallet and switch to Flow Testnet
2. *Mint Property*: Property owners fill out detailed forms to mint their real estate as NFTs
3. *Automatic Listing*: Minted properties are automatically listed in the marketplace database
4. *Browse & Buy*: Users can browse available properties and purchase them with cryptocurrency
5. *Transaction Tracking*: All transactions are tracked with Flow blockchain explorer links

## 🛠 How It's Made

### Technology Stack

*Frontend Framework*
- *Next.js 14*: React framework with App Router for server-side rendering and optimal performance
- *TypeScript*: Type-safe development with enhanced developer experience
- *Tailwind CSS*: Utility-first CSS framework for rapid UI development
- *shadcn/ui*: High-quality React components built on Radix UI primitives

*Blockchain Integration*
- *Flow Blockchain*: EVM-compatible blockchain for NFT minting and trading
- *MetaMask*: Web3 wallet integration for transaction signing and account management
- *Web3.js/Ethers.js*: Blockchain interaction libraries for smart contract communication

*Backend & Database*
- *Supabase*: PostgreSQL database for storing property metadata and marketplace listings
- *Next.js API Routes*: Server-side endpoints for CRUD operations on property data
- *Real-time Subscriptions*: Live updates when properties are minted or purchased

*Smart Contracts*
- *ERC-721 NFT Contract*: Standard NFT implementation for property tokenization
- *Marketplace Contract*: Custom contract for handling property listings and sales
- *Flow Testnet Deployment*: Contracts deployed on Flow's test network for development

*Smart Contract Integration*
- Custom NFT contract with property-specific metadata fields
- Marketplace contract for decentralized trading without intermediaries
- Gas optimization techniques for cost-effective transactions
- Event emission for real-time frontend updates

### Notable Implementation Details

*Hybrid Architecture*: The application uses a hybrid approach combining on-chain NFT ownership with off-chain metadata storage in Supabase for optimal performance and cost efficiency.

*Real-time Synchronization*: Implemented automatic marketplace refresh using visibility API and manual refresh buttons to ensure users always see the latest property listings.

*Error Handling*: Comprehensive error handling for blockchain transactions, network switching, and database operations with user-friendly error messages.

*Responsive Design*: Mobile-first design approach ensuring the marketplace works seamlessly across all device sizes.

*Transaction Tracking*: Integration with Flow blockchain explorer for transparent transaction monitoring and verification.

### Partner Technologies

*Flow Blockchain Benefits*:
- Low transaction fees compared to Ethereum mainnet
- Fast transaction finality (1-2 seconds)
- Developer-friendly EVM compatibility
- Built-in faucet for testnet development
- Robust ecosystem and tooling support

*Supabase Integration*:
- Real-time database subscriptions for live marketplace updates
- Built-in authentication system (ready for future user accounts)
- Automatic API generation from database schema
- Scalable PostgreSQL backend with global CDN

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask browser extension
- Flow Testnet ETH (available from faucet)

### Installation

1. *Clone the repository*
   \\\`bash
   git clone <repository-url>
   cd flow-property-nft
   \\\`

2. *Install dependencies*
   \\\`bash
   npm install
   \\\`

3. *Set up environment variables*
   \\\`bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   \\\`

4. *Set up database*
   - Create a new Supabase project
   - Run the SQL schema from the database section above
   - Configure Row Level Security policies as needed

5. *Deploy smart contracts*
   - Deploy the NFT contract to Flow Testnet
   - Update contract addresses in lib/web3.ts
   - Verify contracts on Flow explorer

6. *Start development server*
   \\\`bash
   npm run dev
   \\\`

### Usage

1. *Connect Wallet*: Click "Connect Wallet" and approve MetaMask connection
2. *Switch Network*: Allow automatic switch to Flow Testnet or add manually
3. *Get Test ETH*: Use the Flow faucet to get testnet tokens
4. *Mint Property*: Navigate to "Sell Property" and fill out the property form
5. *View Marketplace*: Check "Buy Property" to see your minted NFT listed
6. *Trade Properties*: Purchase other properties or list additional ones

## 🏆 Hackathon Submission

This project qualifies for the *Flow Builder Pool Prize* by:
- ✅ Deploying smart contracts on Flow Testnet
- ✅ Executing transactions on the Flow network
- ✅ Building a complete dApp with real utility
- ✅ Demonstrating Flow's EVM compatibility
- ✅ Showcasing the Flow ecosystem's capabilities

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

Built with ❤ on Flow Blockchain
