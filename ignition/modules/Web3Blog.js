const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("Web3BlogModule", (m) => {
  const web3Blog = m.contract("Web3Blog", [], {
  });

  m.call(web3Blog, "initialize", []);

  return { web3Blog };
});
