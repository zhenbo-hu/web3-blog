require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("dotenv").config();

const POLYGON_API_KEY = process.env.API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./src/artifacts",
  },
  defaultNetwork: "amoy",
  networks: {
    hardhat: {}, // for local and test
    amoy: {
      // contract address: 0x53661D1e8717813136B88E2AAB0732c7eA1663e3
      url: "https://polygon-amoy.blockpi.network/v1/rpc/public",
      accounts: [POLYGON_API_KEY],
      chainId: 80002,
    },
    polygon: {
      url: "https://polygon.llamarpc.com",
      accounts: [POLYGON_API_KEY],
      chainId: 137,
    },
  },
};
