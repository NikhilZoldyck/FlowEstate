// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract RealEstateNFT is Initializable, ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    // A mapping from the token ID to the real estate asset's metadata
    struct RealEstateData {
        string name;
        string description;
        string streetAddress;
        uint256 squareFootage;
        string imageUrl;
        uint256 price; // Price in a specific token (e.g., in wei if using ETH)
    }

    mapping(uint256 => RealEstateData) private _realEstateData;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin) initializer public {
        __ERC721_init("RealEstateNFT", "REFT");
        __Ownable_init(defaultAdmin);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @dev Mints a new NFT for a real estate asset.
     * This function can only be called by the contract owner.
     * @param to The address that will receive the NFT.
     * @param name The name of the property.
     * @param description A description of the property.
     * @param streetAddress The physical address of the property.
     * @param squareFootage The square footage of the property.
     * @param imageUrl The URL to an image of the property.
     * @param price The price of the property in a specific token.
     */
    function mint(
        address to,
        string calldata name,
        string calldata description,
        string calldata streetAddress,
        uint256 squareFootage,
        string calldata imageUrl,
        uint256 price
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        // Store the real estate data
        _realEstateData[tokenId] = RealEstateData(
            name,
            description,
            streetAddress,
            squareFootage,
            imageUrl,
            price
        );

        _safeMint(to, tokenId);
        return tokenId;
    }

    /**
     * @dev Returns the metadata for a given token ID.
     */
    function getRealEstateData(uint256 tokenId) public view returns (
        string memory name,
        string memory description,
        string memory streetAddress,
        uint256 squareFootage,
        string memory imageUrl,
        uint256 price
    ) {
        RealEstateData storage data = _realEstateData[tokenId];
        return (
            data.name,
            data.description,
            data.streetAddress,
            data.squareFootage,
            data.imageUrl,
            data.price
        );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireOwned(tokenId);
        // You would typically generate a JSON metadata URI here,
        // following the ERC721 Metadata JSON Schema.
        // For simplicity, we return an empty string.
        return "";
    }
}
