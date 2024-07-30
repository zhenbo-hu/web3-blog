const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { toNumber } = require("ethers");
const hre = require("hardhat");

describe("Web3Blog", function () {
  async function deployWeb3Blog() {
    const [owner] = await hre.ethers.getSigners();

    const web3Blog = await hre.ethers.deployContract("Web3Blog");
    await web3Blog.initialize();

    return { web3Blog, owner };
  }

  describe("Deployment", async function () {
    it("Should get owner successful", async function () {
      const { web3Blog, owner } = await loadFixture(deployWeb3Blog);
      const ownerAddress = await web3Blog.owner();

      expect(ownerAddress).to.equal(owner.address);
    });
  });

  describe("Mint and update blog for Web3Blog", async function () {
    it("Init tokenId is 0", async function () {
      const { web3Blog, _ } = await loadFixture(deployWeb3Blog);
      const tokenId = await web3Blog.getTokenId();

      expect(0).to.equal(tokenId);
    });

    it("Mint a new blog", async function () {
      const { web3Blog, _ } = await loadFixture(deployWeb3Blog);
      await web3Blog.safeMint("title", "updateTimestamp", "arweave_tx_id");
      const tokenId = await web3Blog.getTokenId();
      const { title, updateTimestamp } = await web3Blog.getDetailByTokenId(
        tokenId
      );
      const uri = await web3Blog.tokenURI(tokenId);

      expect(1).to.equal(tokenId);
      expect("title").to.equal(title);
      expect("updateTimestamp").to.equal(updateTimestamp);
      expect("arweave_tx_id").to.equal(uri);
    });

    it("Update a exist blog", async function () {
      const { web3Blog, _ } = await loadFixture(deployWeb3Blog);
      await web3Blog.safeMint("title", "updateTimestamp", "arweave_tx_id");
      const tokenId = await web3Blog.getTokenId();

      await web3Blog.updateNFT(
        tokenId,
        "title2",
        "updateTimestamp2",
        "arweave_tx_id2"
      );

      const updatedTokenId = await web3Blog.getTokenId();
      const { title, updateTimestamp } = await web3Blog.getDetailByTokenId(
        updatedTokenId
      );
      const updatedUri = await web3Blog.tokenURI(tokenId);

      console.log(title);
      console.log(updateTimestamp);
      console.log(updatedUri);

      expect(tokenId).to.equal(updatedTokenId);
      expect("title2").to.equal(title);
      expect("updateTimestamp2").to.equal(updateTimestamp);
      expect("arweave_tx_id2").to.equal(updatedUri);
    });
  });
});
