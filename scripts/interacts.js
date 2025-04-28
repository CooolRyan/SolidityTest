// require("dotenv").config();
// const { ethers } = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   const receiverAddress = process.env.RECEIVER;
//   const deployerAddress = await deployer.getAddress();
//   const contractAddress = process.env.TOKEN;
//   const receiverPrivateKey = process.env.RECEIVER_PRIVATE_KEY;

//   const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
//   const receiverSigner = new ethers.Wallet(receiverPrivateKey, provider);

//   console.log("Using deployer:", deployerAddress);
//   console.log("Receiver address:", receiverAddress);
//   console.log("Connected to contract at:", contractAddress);

//   const abi = [
//     "function mint(address to, uint256 amount)",
//     "function transfer(address to, uint256 amount) returns (bool)",
//     "function balanceOf(address owner) view returns (uint256)"
//   ];
  
//   const Token = new ethers.Contract(contractAddress, abi, provider);

//   // ========== [1] Mint ==========
//   console.log("Minting tokens...");
  
//   const mintTx = await Token.connect(deployer).mint(
//     "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // hardcoded receiver address for testing
//     ethers.parseUnits("1000", 18)
//   );
//   await mintTx.wait();

//   console.log("Minted 1000 tokens to", receiverAddress);

//   // ========== [2] Transfer ==========
//   console.log("Transferring tokens...");

//   const TokenWithReceiver = Token.connect(receiverSigner);

//   const transferTx = await TokenWithReceiver.transfer(
//     deployerAddress,
//     ethers.parseUnits("100", 18)
//   );
//   await transferTx.wait();

//   console.log("Transferred 100 tokens back to deployer");

//   // ========== [3] Balance 확인 ==========
//   const balanceDeployer = await Token.balanceOf(deployerAddress);
//   const balanceReceiver = await Token.balanceOf(receiverAddress);

//   console.log("Deployer Balance:", ethers.formatUnits(balanceDeployer, 18));
//   console.log("Receiver Balance:", ethers.formatUnits(balanceReceiver, 18));
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);

  const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
  const receiverAddress = process.env.RECEIVER;
  const deployerSigner = new ethers.Wallet(deployerPrivateKey, provider);

  const contractAddress = process.env.TOKEN;

  console.log("Using deployer:", await deployerSigner.getAddress());
  console.log("Receiver address:", receiverAddress);
  console.log("Connected to ERC1400 contract at:", contractAddress);

  const abi = [
    "function issue(address tokenHolder, uint256 value, bytes calldata data) external",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address to, uint256 value) external returns (bool)",
    "function getDefaultPartitions() external view returns (bytes32[])"
  ];

  const Token = new ethers.Contract(contractAddress, abi, deployerSigner);

  // ========== [1] issue (발행) ==========
  console.log("Issuing tokens...");

  const issueAmount = ethers.parseUnits("1000", 18); // 1000 토큰
  const issueData = "0x"; // 빈 데이터

  const issueTx = await Token.issue(receiverAddress, issueAmount, issueData);
  await issueTx.wait();

  console.log(`Issued ${ethers.formatUnits(issueAmount, 18)} tokens to`, receiverAddress);

  // ========== [2] Transfer (전송) ==========
  console.log("Transferring tokens from receiver back to deployer...");

  // 이제 receiverSigner 필요
  const receiverPrivateKey = process.env.RECEIVER_PRIVATE_KEY;
  const receiverSigner = new ethers.Wallet(receiverPrivateKey, provider);

  // receiver 기준으로 컨트랙트 다시 연결
  const TokenWithReceiver = Token.connect(receiverSigner);

  const deployerAddress = await deployerSigner.getAddress();

  const transferAmount = ethers.parseUnits("100", 18);

  const transferTx = await TokenWithReceiver.transfer(
    deployerAddress,
    transferAmount
  );
  await transferTx.wait();

  console.log(`Transferred ${ethers.formatUnits(transferAmount, 18)} tokens to deployer`);

  // ========== [3] Balance 확인 ==========
  const receiverBalance = await Token.balanceOf(receiverAddress);
  const deployerBalance = await Token.balanceOf(deployerAddress);

  console.log("Receiver Balance:", ethers.formatUnits(receiverBalance, 18));
  console.log("Deployer Balance:", ethers.formatUnits(deployerBalance, 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
