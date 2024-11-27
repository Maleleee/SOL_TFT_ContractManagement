// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TeamfightTactics {

    mapping(address => string[]) private userLegends;

    // Events
    event LegendAcquired(address indexed user, string legendRarity, string legendName);

    // Modifier to check the correct Ether amount for each Little Legend
    modifier correctPayment(uint256 price) {
        require(msg.value == price, "Incorrect ETH amount sent.");
        _;
    }

    // Buy a common Little Legend (1 ETH)
    function buyCommonLegend() external payable correctPayment(1 ether) {
        string memory legendName = getRandomLegend("Common");
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Common", legendName);
    }

    // Buy an uncommon Little Legend (2 ETH)
    function buyUncommonLegend() external payable correctPayment(2 ether) {
        string memory legendName = getRandomLegend("Uncommon");
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Uncommon", legendName);
    }

    // Buy a rare Little Legend (3 ETH)
    function buyRareLegend() external payable correctPayment(3 ether) {
        string memory legendName = getRandomLegend("Rare");
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Rare", legendName);
    }

    // Get the list of Little Legends acquired by the caller
    function getMyLegends() external view returns (string[] memory) {
        return userLegends[msg.sender];
    }

    // Internal function to get a random Little Legend based on rarity
    function getRandomLegend(string memory legendRarity) internal pure returns (string memory) {
        // Returning Little Legends based on rarity
        if (keccak256(abi.encodePacked(legendRarity)) == keccak256(abi.encodePacked("Common"))) {
            return "Featherknight";  // Common Little Legend
        } else if (keccak256(abi.encodePacked(legendRarity)) == keccak256(abi.encodePacked("Uncommon"))) {
            return "Astral";  // Uncommon Little Legend
        } else if (keccak256(abi.encodePacked(legendRarity)) == keccak256(abi.encodePacked("Rare"))) {
            return "Chibi Yasuo";  // Rare Little Legend
        } else {
            return "Unknown Legend";
        }
    }
}
