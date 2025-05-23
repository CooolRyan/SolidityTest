require("@nomicfoundation/hardhat-toolbox");
require("hardhat-erc1820");
const dotenv = require("dotenv");

dotenv.config();
console.log("WALLET:", process.env.WALLET ? "설정됨" : "설정되지 않음");
console.log("PRIVATE_KEY:", process.env.DEPLOYER_PRIVATE_KEY ? "설정됨" : "설정되지 않음");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };

module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY], 
      chainId: 80002,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY, // << 추가
    },
  },
};