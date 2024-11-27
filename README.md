# Teamfight Tactics Little Legends Shop Smart Contract Management 


This smart contract allows users to purchase "Little Legends" of different rarities in a Teamfight Tactics-themed shop. The contract allows for the buying of Common, Uncommon, and Rare Little Legends using Ethereum.

# Description
This project is a simple Ethereum smart contract that simulates a Legend Shop. The contract allows users to:

* Buy a Common Legend: Costs 1 ETH.
* Buy an Uncommon Legend: Costs 2 ETH.
* Buy a Rare Legend: Costs 3 ETH.
The contract also allows users to view their purchased Little Legends and tracks each purchase.

# Functions
1. buyCommonLegend(): Buys a Common Legend for 1 ETH.
2. buyUncommonLegend(): Buys an Uncommon Legend for 2 ETH.
3. buyRareLegend(): Buys a Rare Legend for 3 ETH.
4. getPurchasedLegends(): Returns the list of Little Legends a user has purchased.
The contract uses error handling mechanisms to ensure valid purchases and to prevent invalid interactions with the contract.



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

* Buy a Common Legend: Call the buyCommonLegend() function and send 1 ETH.
* Buy an Uncommon Legend: Call the buyUncommonLegend() function and send 2 ETH.
* Buy a Rare Legend: Call the buyRareLegend() function and send 3 ETH.
* View Purchased Legends: Call the getPurchasedLegends() function to view the list of your purchased legends.


# Testing and Debugging
Revert Errors: If a purchase fails, check for errors such as "Insufficient funds for purchase."
Require Failures: Ensure the correct amount of ETH is sent with each purchase (e.g., "Insufficient funds to buy this legend").


# Authors 

Allen Shoji C. Takahashi
202111055@fit.edu.ph 

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.