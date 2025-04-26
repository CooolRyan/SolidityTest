require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const receiverAddress = process.env.RECEIVER;
  const deployerAddress = await deployer.getAddress();
  const contractAddress = process.env.TOKEN;
  const receiverPrivateKey = process.env.RECEIVER_PRIVATE_KEY;

  const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
  const receiverSigner = new ethers.Wallet(receiverPrivateKey, provider);

  console.log("Using deployer:", deployerAddress);
  console.log("Receiver address:", receiverAddress);
  console.log("Connected to contract at:", contractAddress);

  const abi = [
    "function mint(address to, uint256 amount)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address owner) view returns (uint256)"
  ];
  
  const Token = new ethers.Contract(contractAddress, abi, provider);

  // ========== [1] Mint ==========
  console.log("Minting tokens...");
  
  const mintTx = await Token.connect(deployer).mint(
    receiverAddress,
    ethers.parseUnits("1000", 18)
  );
  await mintTx.wait();

  console.log("Minted 1000 tokens to", receiverAddress);

  // ========== [2] Transfer ==========
  console.log("Transferring tokens...");

  const TokenWithReceiver = Token.connect(receiverSigner);

  const transferTx = await TokenWithReceiver.transfer(
    deployerAddress,
    ethers.parseUnits("100", 18)
  );
  await transferTx.wait();

  console.log("Transferred 100 tokens back to deployer");

  // ========== [3] Balance 확인 ==========
  const balanceDeployer = await Token.balanceOf(deployerAddress);
  const balanceReceiver = await Token.balanceOf(receiverAddress);

  console.log("Deployer Balance:", ethers.formatUnits(balanceDeployer, 18));
  console.log("Receiver Balance:", ethers.formatUnits(balanceReceiver, 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
