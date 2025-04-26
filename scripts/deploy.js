const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const Token = await hre.ethers.getContractFactory("ERC1400");

  const token = await Token.deploy(
    "STO TEST TOKEN",
    "MST",
    ["0x7265736572766564000000000000000000000000000000000000000000000000"],
    18,
    [],
    []
  );

  await token.waitForDeployment();  // <<<< 이거로 수정해야 함

  console.log("ERC-1400 Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
