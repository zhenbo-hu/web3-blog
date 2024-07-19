import { ethers } from "ethers";
import { configuration } from "../config";
import Web3Blog from "../artifacts/contracts/Web3Blog.sol/Web3Blog.json";

const defaultWeb3Blog = new ethers.Contract(
  configuration().web3BlogAddress,
  Web3Blog.abi,
  new ethers.BrowserProvider(window.ethereum)
);

export async function getWeb3BlogOwner() {
  const ownerAddress = await defaultWeb3Blog.owner();
  return { success: true, data: ownerAddress };
}

export async function getWeb3BlogTokenId() {
  const tokenId = await defaultWeb3Blog.getTokenId();
  return { success: true, data: Number(tokenId) };
}

export async function getDetailByTokenId(tokenId) {
  const detail = await defaultWeb3Blog.getDetailByTokenId(tokenId);

  const [tokenTitle, lastUpdateTimestamp] = detail;
  
  if (tokenTitle === "" || lastUpdateTimestamp === "") {
    return {
      success: false,
      title: "",
      lastUpdateTimestamp: "",
    };
  }
  return {
    success: true,
    title: tokenTitle,
    lastUpdateTimestamp: lastUpdateTimestamp,
  };
}

export async function getTokenUri(tokenId) {
  const tokenUri = await defaultWeb3Blog.tokenURI(tokenId);
  if (tokenUri === "") {
    return { success: false, data: "" };
  }
  return { success: true, data: tokenUri };
}

export async function safeMint(signer, title, updateTimestamp, tokenUri) {
  try {
    if (
      signer === null ||
      typeof title !== "string" ||
      title.length === 0 ||
      typeof updateTimestamp !== "string" ||
      updateTimestamp.length === 0 ||
      typeof tokenUri !== "string" ||
      tokenUri.length === 0
    ) {
      return { success: false };
    }

    const web3Blog = new ethers.Contract(
      configuration().web3BlogAddress,
      Web3Blog.abi,
      signer
    );

    const transaction = await web3Blog
      .connect(signer)
      .safeMint(title, updateTimestamp, tokenUri);
    await transaction.wait(1);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function updateNFT(
  signer,
  tokenId,
  title,
  updateTimestamp,
  tokenUri
) {
  try {
    if (
      signer === null ||
      typeof title !== "string" ||
      title.length === 0 ||
      typeof updateTimestamp !== "string" ||
      updateTimestamp.length === 0 ||
      typeof tokenUri !== "string" ||
      tokenUri.length === 0
    ) {
      return { success: false };
    }

    const web3Blog = new ethers.Contract(
      configuration().web3BlogAddress,
      Web3Blog.abi,
      signer
    );

    const transaction = await web3Blog
      .connect(signer)
      .updateNFT(tokenId, title, updateTimestamp, tokenUri);
    await transaction.wait(1);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
