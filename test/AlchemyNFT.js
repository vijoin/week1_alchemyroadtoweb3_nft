const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Alchemy NFT Contract", () => {

    beforeEach( async () => {

        Alchemy = await ethers.getContractFactory("AlchemyNFT");
        [owner, ...addrs] = await ethers.getSigners();
        alchemy = await Alchemy.deploy();
    });
    
    describe.only("Transactions", () => {    
        it("Test minting", async () => {
            await alchemy.safeMint(owner.address, Math.floor(Math.random() * 100))
            expect(await alchemy.balanceOf(owner.address)).to.be.equal(1)
        });
    });

});