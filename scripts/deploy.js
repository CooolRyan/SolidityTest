const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const Token = await hre.ethers.getContractFactory("ERC1400");

  const token = await Token.deploy(
    "STO TEST TOKEN",   // _name
    "MST",              // _symbol
    18                  // _decimals
  );

  await token.waitForDeployment();

  console.log("ERC-1400 Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
