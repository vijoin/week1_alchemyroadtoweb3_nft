const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Alchemy NFT Contract", () => {

    beforeEach( async () => {

        Alchemy = await ethers.getContractFactory("AlchemyNFT");
        [owner, addr1, ...addrs] = await ethers.getSigners();
        alchemy = await Alchemy.deploy();
    });
    
    describe.only("Transactions", () => {    
        it("Test minting", async () => {
            // Mint first NFT
            await alchemy.safeMint(owner.address)
            expect(await alchemy.balanceOf(owner.address)).to.be.equal(1)
            expect(await alchemy.ownerOf(0)).to.be.equal(owner.address)

            // Mint second NFT
            await alchemy.safeMint(addr1.address)
            expect(await alchemy.balanceOf(addr1.address)).to.be.equal(1)
            expect(await alchemy.ownerOf(1)).to.be.equal(addr1.address)

        });
    });

});