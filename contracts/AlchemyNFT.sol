// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AlchemyNFT is ERC721 {
    constructor() ERC721("Alchemy", "ALCH") {}

    function safeMint(address to, uint tokenId) public {
        _safeMint(to, tokenId);
    }
}
