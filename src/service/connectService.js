import { ethers } from "ethers";
import { configuration } from "../config";
import { messageBox } from "./messageService";

export const defaultProvider = () => {
  return ethers.getDefaultProvider();
}

export const browserProvider = () => {
  return new ethers.BrowserProvider(window.ethereum);
}

export const getSigner = async (provider) => {
  return await provider.getSigner();
}

export const getAddress = async (signer) => {
  return await signer.getAddress();
}

export const tryConnectWallet = async () => {
  let provider = null, signer = null, address = null;
  if (window.ethereum == null) {
    alert("MetaMask not installed, cannot connect wallet!");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await getSigner(provider);
    address = await getAddress(signer);
  }

  return { provider, signer, address };
}

export const connectOnce = async (provider) => {
  await provider.send("eth_requestAccounts", []);
  let signer = provider.getSigner();
  let network = await provider.getNetwork();
  let address = await signer.getAddress();
  return { chainId: network.chainId, address: address, signer };
};

export const trying = async (provider) => {
  const { chainId, address, signer } = await connectOnce(provider);
  const supported = configuration().chainId.toString();
  if (chainId === supported) {
    messageBox(
      "success",
      "",
      "chainId: " + chainId + "      account: " + address.substring(0, 5) + ".."
    );

    return { success: true, provider, signer };
  }
  messageBox(
    "warning",
    "",
    "chainId: " + chainId + "      account: " + address.substring(0, 5) + ".."
  );

  return { success: false };
};

export const connect = async (provider) => {
  let { success } = await trying(provider);
  if (success) return;
  const conf = configuration();
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: conf.params,
  });
  await trying();
};
