const hre = require("hardhat");

async function main() {
  const TeamfightTactics = await hre.ethers.getContractFactory("TeamfightTactics");
  const tft = await TeamfightTactics.deploy();
  await tft.deployed();

  console.log(`TeamfightTactics contract deployed to: ${tft.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
