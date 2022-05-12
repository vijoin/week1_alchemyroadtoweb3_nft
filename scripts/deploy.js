const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account Balance:", (await deployer.getBalance()).toString());

    const Alchemy = await ethers.getContractFactory("AlchemyNFT");
    const alchemy = await Alchemy.deploy(100, 5);

    console.log("AlchemyNFT Contract address:", alchemy.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });