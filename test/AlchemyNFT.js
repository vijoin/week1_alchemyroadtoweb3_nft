const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Alchemy NFT Contract", () => {
  let Alchemy;
  let alchemy;
  let owner;
  let addr1;
  let addrs;
  let maxSupply = 100;
  let maxMintByAccount = 50;
  let uri = "https://localhost/nft.json";

  beforeEach(async () => {
    Alchemy = await ethers.getContractFactory("AlchemyNFT");
    [owner, addr1, ...addrs] = await ethers.getSigners();
    alchemy = await Alchemy.deploy(maxSupply, maxMintByAccount);
  });

  describe("Transactions", () => {
    it("Test minting", async () => {
      // Mint first NFT
      await alchemy.safeMint(owner.address, uri);
      expect(await alchemy.balanceOf(owner.address)).to.be.equal(1);
      expect(await alchemy.ownerOf(0)).to.be.equal(owner.address);

      // Mint second NFT
      await alchemy.safeMint(addr1.address, uri);
      expect(await alchemy.balanceOf(addr1.address)).to.be.equal(1);
      expect(await alchemy.ownerOf(1)).to.be.equal(addr1.address);
    });

    it("Max Supply reached", async () => {
      for (let i = 0; i < maxSupply / 2; i++) {
        await alchemy.safeMint(owner.address, uri);
        await alchemy.safeMint(addr1.address, uri);
      }
      await expect(alchemy.safeMint(owner.address, uri)).to.be.revertedWith(
        "I'm sorry, we reached the cap"
      );
    });

    it("Max Mint by Account reached", async () => {
      for (let i = 0; i < maxMintByAccount; i++) {
        await alchemy.safeMint(addr1.address, uri);
      }
      await expect(alchemy.safeMint(addr1.address, uri)).to.be.revertedWith(
        "I'm sorry, you reached the cap allowed by Account"
      );
    });

    it("URI is set and retrieved correctly", async () => {
      await alchemy.safeMint(owner.address, uri);
      expect(await alchemy.tokenURI(0)).to.be.equal(uri);
    });
  });

  describe("Enumerable capabilities", () => {
    it("Count all NFTs minted", async () => {
      const minted_count =
        Math.ceil(Math.random() * maxSupply) % maxMintByAccount;
      for (let i = 0; i < minted_count; i++) {
        await alchemy.safeMint(owner.address, uri);
      }
      expect(await alchemy.totalSupply()).to.be.equal(minted_count);
    });

    it("List all NFTs of owner", async () => {
      for (let i = 0; i < 3; i++) {
        await alchemy.safeMint(owner.address, uri);
        await alchemy.safeMint(addr1.address, uri);
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
