const config = [
  {
    // polygon testnet
    chainId: 0x7a69,
    web3BlogAddress: "0x53661D1e8717813136B88E2AAB0732c7eA1663e3",
    rpcUrls: ["https://rpc-amoy.polygon.technology"],
    chainName: "Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
    arweaveGateway: ["http://127.0.0.1:1984/"],
  },
  {
    // polygon mainnet
    chainId: 0x89,
    web3BlogAddress: "",
    rpcUrls: [
      "https://polygon-rpc.com",
      "https://api.zan.top/node/v1/polygon/mainnet/public",
      "https://polygon.drpc.org",
    ],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
    arweaveGateway: ["https://arweave.net/"],
  },
];

const selection = 0;

export const configuration = () => config[selection];
export const rpcUrl = () => {
  return config[selection].params[0].rpcUrls[0];
};
export const contractAddress = config[selection].web3BlogAddress;
export const arweaveGateway = config[selection].arweaveGateway;

export const MAX_TITLE_LENGTH = 100;
export const PAGE_SIZE = 10;
