require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config()

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_RINKEBY = process.env.ETHERSCAN_RINKEBY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiUrl: {
      rinkeby: "https://api-rinkeby.etherscan.io/"
    },
    apiKey: {
      rinkeby: `${ETHERSCAN_RINKEBY}`,
    }
  }
};
