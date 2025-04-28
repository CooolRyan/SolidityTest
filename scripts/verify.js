// verify.js

require("dotenv").config();
const { run } = require("hardhat");

async function main() {
  const contractAddress = process.env.TOKEN;

  if (!contractAddress) {
    console.error("\u274C TOKEN address not found in .env file");
    process.exit(1);
  }

  console.log("\u2728 Verifying contract at:", contractAddress);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        "STO TEST TOKEN", // _name
        "MST",             // _symbol
        18                 // _decimals
      ],
    });

    console.log("\u2705 Verification completed successfully!");
  } catch (error) {
    console.error("\u274C Verification failed:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
