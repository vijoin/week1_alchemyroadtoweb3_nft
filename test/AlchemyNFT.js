const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Alchemy NFT Contract", () => {
  beforeEach(async () => {
    Alchemy = await ethers.getContractFactory("AlchemyNFT");
    [owner, addr1, ...addrs] = await ethers.getSigners();
    alchemy = await Alchemy.deploy();
  });

  describe("Transactions", () => {
    it("Test minting", async () => {
      // Mint first NFT
      await alchemy.safeMint(owner.address);
      expect(await alchemy.balanceOf(owner.address)).to.be.equal(1);
      expect(await alchemy.ownerOf(0)).to.be.equal(owner.address);

      // Mint second NFT
      await alchemy.safeMint(addr1.address);
      expect(await alchemy.balanceOf(addr1.address)).to.be.equal(1);
      expect(await alchemy.ownerOf(1)).to.be.equal(addr1.address);
    });
  });

  describe("Enumerable capabilities", () => {
    it("Count all NFTs minted", async () => {
      const minted_count = Math.floor(Math.random() * 100);
      for (let i = 0; i < minted_count; i++) {
        await alchemy.safeMint(owner.address);
      }
      expect(await alchemy.totalSupply()).to.be.equal(minted_count);
    });

    it("List all NFTs of owner", async () => {
      for (let i = 0; i < 3; i++) {
        await alchemy.safeMint(owner.address);
        await alchemy.safeMint(addr1.address);
      }

      const totalNFTsOwner = await alchemy.balanceOf(owner.address);

      let listOfTokensOfOwner = new Array();
      for (let i = 0; i < totalNFTsOwner; i++) {
        listOfTokensOfOwner.push(
          (await alchemy.tokenOfOwnerByIndex(owner.address, i)).toNumber()
        );
      }
      expect(listOfTokensOfOwner).to.eql([0, 2, 4]);
    });
  });
});
