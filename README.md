# Web3 Blog

This application is a decentralized application (DAPP) by using solidity and arweave as backend, react as frontend.

## What this application does

- This application will be deployed to arweave network.
- The owner create and edit blogs.
- Visitors browse the existing blogs.

## What technologies are used

solidity(polygan), hardhat, ethers-js, arweave-js, openzeppelin, react, javascript, css, arkb

## How to install and run this project

### For front-end
- `npm install -g arlocal` or `npm install --save-dev arlocal` to install arlocal, more details in <https://github.com/textury/arlocal>
- `arlocal` or `npx arlocal` to run a local arweave node environment in your machine.
- `npm install` to install all the dependencies
- `npm run start` to run this project in the development mode.
- `npm run build` to build this project for production.
- `npm run deploy-test` to deploy this project to your local arweave node environment
- `npm run deploy` to deploy this project to arweave network, you can use [ans](https://www.ans.gg/) to optimize the url

### For smart contract
- `npx hardhat compile` to compile the contract
- `npx hardhat test` to run all the contract test cases
- `npx hardhat coverage` to get the contract test cases coverage, coverage report is in ./coverage/index.html