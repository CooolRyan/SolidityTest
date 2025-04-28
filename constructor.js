const { ethers } = require("ethers");

async function main() {
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    ["string", "string", "uint8"],
    ["STO TEST TOKEN", "MST", 18]
  );
  console.log(encoded);
}

main();
