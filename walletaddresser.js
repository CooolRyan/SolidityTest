const { Wallet } = require("ethers");

async function main() {
  const wallet = Wallet.createRandom();
  
  console.log("🌟 테스트 지갑 생성 완료");
  console.log("주소:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  console.log("Mnemonic (복구용 문구):", wallet.mnemonic.phrase);
}

main();
