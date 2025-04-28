// deploy.js
require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
  const deployer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

  console.log("Deploying with address:", deployer.address);

  const abi = [
    "constructor(string memory _name, string memory _symbol, uint8 _decimals)"
  ];

  const bytecode = "0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000e53544f205445535420544f4b454e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034d53540000000000000000000000000000000000000000000000000000000000";

  const factory = new ethers.ContractFactory(abi, bytecode, deployer);

  const token = await factory.deploy(
    "STO TEST TOKEN",  // name
    "MST",             // symbol
    18                 // decimals
  );

  await token.waitForDeployment();
  console.log("Deployed ERC1400 at:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
