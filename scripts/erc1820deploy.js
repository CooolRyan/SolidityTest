// scripts/deployERC1820.js
const hre = require("hardhat");

async function main() {
  const ERC1820Registry = await hre.ethers.getContractFactory("ERC1820Registry");
  const registry = await ERC1820Registry.deploy();
  await registry.waitForDeployment();
  console.log("ERC1820 deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
