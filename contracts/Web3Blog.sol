// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Web3Blog is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable
{
    uint256 private _nextTokenId;
    mapping(uint256 => string) private titles;
    mapping(uint256 => string) private lastUpdateTimestamp;

    event MintLog(
        address indexed from,
        uint256 tokenId,
        string updateTimestamp,
        string tokenUri
    );
    event UpdateLog(
        address indexed from,
        uint256 tokenId,
        string updateTimestamp,
        string tokenUri
    );

    function initialize() public initializer {
        __ERC721_init("Web3Blog", "W3B");
        __ERC721URIStorage_init();
        __Ownable_init(msg.sender);
    }

    function safeMint(
        string memory title,
        string memory updateTimestamp,
        string memory uri
    ) public onlyOwner {
        uint256 tokenId = ++_nextTokenId;
        _safeMint(msg.sender, tokenId);
        titles[tokenId] = title;
        lastUpdateTimestamp[tokenId] = updateTimestamp;
        _setTokenURI(tokenId, uri);

        emit MintLog(msg.sender, tokenId, updateTimestamp, uri);
    }

    function updateNFT(
        uint256 tokenId,
        string memory title,
        string memory updateTimestamp,
        string memory uri
    ) public onlyOwner {
        _setTokenURI(tokenId, uri);
        titles[tokenId] = title;
        lastUpdateTimestamp[tokenId] = updateTimestamp;
        emit UpdateLog(msg.sender, tokenId, updateTimestamp, uri);
    }

    function getTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    function getDetailByTokenId(
        uint256 tokenId
    ) public view returns (string memory title, string memory updateTimestamp) {
        title = titles[tokenId];
        updateTimestamp = lastUpdateTimestamp[tokenId];
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
