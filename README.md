# Teamfight Tactics Little Legends Shop Smart Contract Management 


This smart contract provides a decentralized platform for purchasing "Little Legends" of various rarities in a Teamfight Tactics-themed shop. Users can buy legends using Ethereum and manage their collection securely.


# Description
This project simulates a "Little Legends Shop" on the Ethereum blockchain. It allows users to:

* Purchase Little Legends of different rarities (Common, Uncommon, Rare, Epic, Legendary, and Mythic) using TFT Points, which can be purchased with Ethereum.
* View their personal collection of Little Legends.
* Track transactions and maintain a secure balance of TFT Points.

Each legend rarity has its own cost in TFT Points, ensuring a dynamic and engaging purchasing system.



## Functions

# Legend Purchases

* Common Legends: Cost 1 TFT Point.
* Uncommon Legends: Cost 2 TFT Points.
* Rare Legends: Cost 3 TFT Points.
* Epic Legends: Cost 5 TFT Points.
* Legendary Legends: Cost 10 TFT Points.
* Mythic Legends: Cost 20 TFT Points.

## Point Management

* Buy TFT Points: Exchange Ethereum for TFT points at a rate of 1 ETH = 1 TFT Point

# Getting Started
1. Install Prerequisites

Make sure you have the following installed:

* Node.js: Install it from the official website.
* MetaMask: Install the MetaMask browser extension for managing your Ethereum account.
* Ganache (optional): If you want to test the contract locally, you can use Ganache, a local Ethereum blockchain.

2. Install Project Dependencies

* To set up the project, you will need to install Hardhat and Ethers.js. First, initialize a Node.js project in your project folder, then install the necessary dependencies.

3. Create the Hardhat Project

* Create a new Hardhat project by following the instructions from the Hardhat documentation. Choose to create a basic sample project.

4. Add the Smart Contract

* Place the smart contract file (TeamfightTactics.sol) into the contracts/ folder of your Hardhat project.

5. Compile the Contract

* Using Hardhat, compile the smart contract to ensure there are no errors. Follow the instructions in the Hardhat documentation for compiling Solidity contracts.

6. Deploy the Contract

* Create a deployment script (e.g., scripts/deploy.js) that will deploy the contract to an Ethereum test network. In this script, you will use the Hardhat environment to deploy your contract and obtain its address.

7. Interact with the Contract
After deploying the contract, you can interact with it using MetaMask and Ethers.js in a front-end application or directly through Hardhat.

* Buy TFT Points: Send ETH to purchase TFT Points.
* Buy Legends: Call the corresponding function (e.g., buyCommonLegend()).
* View Legends: Retrieve your collection with getMyLegends().


# Testing and Debugging

Common Errors

1. Insufficient TFT Points: Ensure your balance is adequate for the purchase.
2. Incorrect Payment Amount: Verify the correct amount of ETH is sent when buying points

# Authors 

Allen Shoji C. Takahashi
202111055@fit.edu.ph 

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.
