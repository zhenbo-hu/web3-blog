const config = [
  // {
  //   chainId: 0x7A69,
  //   web3BlogAddress: "0xE3826fFd05dFb053782A7968F9a70571e9Cab54C",
  //   params: [
  //     {
  //       chainId: "0x7A69",
  //       rpcUrls: ["http://127.0.0.1:8545/"],
  //       chainName: "localhost-hardhat",
  //       nativeCurrency: {
  //         name: "LETH",
  //         symbol: "LETH",
  //         decimals: 18,
  //       },
  //       blockExplorerUrls: ["https://polygonscan.com/"],
  //     },
  //   ],
  // },
  // {
  //   chainId: "137",
  //   rpcUrls: ["https://polygon-mainnet.infura.io"],
  //   chainName: "Polygon Mainnet",
  //   nativeCurrency: {
  //     name: "MATIC",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   blockExplorerUrls: ["https://polygonscan.com/"],
  // },
  {
    chainId: 0x7A69,
    web3BlogAddress: "0x53661D1e8717813136B88E2AAB0732c7eA1663e3",
    rpcUrls: ["https://rpc-amoy.polygon.technology"],
    chainName: "Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  }
];

const selection = 0;

export const configuration = () => config[selection];
export const rpcUrl = () => {
  return config[selection].params[0].rpcUrls[0];
};
export const contractAddress = config[selection].web3BlogAddress;
