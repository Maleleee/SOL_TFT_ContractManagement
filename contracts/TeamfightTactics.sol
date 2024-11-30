// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TeamfightTactics {
    mapping(address => string[]) public userLegends;
    mapping(address => uint256) public tftPoints;

    string[] private commonLegends = ["Furyhorn", "Hauntling", "Silverwing", "Featherknight", "Molediver", "Runespirit"];
    string[] private uncommonLegends = ["Paddlemar", "Protector", "Hushtail", "Dango", "Fuwa", "Shisa"];
    string[] private rareLegends = ["Melisma", "Ossia", "QiQi", "Craggle", "Flutterbug", "Tocker"];
    string[] private epicLegends = ["Abyssia", "Squink", "Starmaw", "Bellswayer", "Lightcharger", "Nixie"];
    string[] private legendaryLegends = ["Ao Shin", "Choncc", "Umbra", "Dowsie", "Fenroar", "Nimblefoot"];
    string[] private mythicLegends = ["Duckbill", "Gloop", "Piximander", "Burno", "Poggles", "Bungo", "Prancie"];

    event LegendAcquired(address indexed user, string rarity, string legendName);
    event TFTPointsPurchased(address indexed user, uint256 amount);

    modifier correctPayment(uint256 amount) {
        require(msg.value == amount, "Incorrect payment amount");
        _;
    }

    modifier hasEnoughPoints(uint256 pointsRequired) {
        require(tftPoints[msg.sender] >= pointsRequired, "Not enough TFT points");
        _;
    }

    // Buy a common Little Legend (1 TFT Point)
    function buyCommonLegend() external hasEnoughPoints(1) {
        tftPoints[msg.sender] -= 1;
        string memory legendName = getRandomLegend(commonLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Common", legendName);
    }

    // Buy an uncommon Little Legend (2 TFT Points)
    function buyUncommonLegend() external hasEnoughPoints(2) {
        tftPoints[msg.sender] -= 2;
        string memory legendName = getRandomLegend(uncommonLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Uncommon", legendName);
    }

    // Buy a rare Little Legend (3 TFT Points)
    function buyRareLegend() external hasEnoughPoints(3) {
        tftPoints[msg.sender] -= 3;
        string memory legendName = getRandomLegend(rareLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Rare", legendName);
    }

    // Buy an epic Little Legend (5 TFT Points)
    function buyEpicLegend() external hasEnoughPoints(5) {
        tftPoints[msg.sender] -= 5;
        string memory legendName = getRandomLegend(epicLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Epic", legendName);
    }

    // Buy a legendary Little Legend (10 TFT Points)
    function buyLegendaryLegend() external hasEnoughPoints(10) {
        tftPoints[msg.sender] -= 10;
        string memory legendName = getRandomLegend(legendaryLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Legendary", legendName);
    }

    // Buy a mythic Little Legend (20 TFT Points)
    function buyMythicLegend() external hasEnoughPoints(20) {
        tftPoints[msg.sender] -= 20;
        string memory legendName = getRandomLegend(mythicLegends);
        userLegends[msg.sender].push(legendName);
        emit LegendAcquired(msg.sender, "Mythic", legendName);
    }

    // Buy TFT Points
    function buyTFTPoints() external payable {
        uint256 points = msg.value / 1 ether; // 1 ETH = 1 TFT Point
        tftPoints[msg.sender] += points;
        emit TFTPointsPurchased(msg.sender, points);
    }

    // Get the list of Little Legends acquired by the caller
    function getMyLegends() external view returns (string[] memory) {
        return userLegends[msg.sender];
    }

    // Get the TFT Points balance of the caller
    function getTFTPoints() external view returns (uint256) {
        return tftPoints[msg.sender];
    }

    // Internal function to get a random Little Legend based on rarity
    function getRandomLegend(string[] memory legends) internal view returns (string memory) {
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % legends.length;
        return legends[randomIndex];
    }
}