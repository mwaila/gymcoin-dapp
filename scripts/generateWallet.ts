const { ethers } = require("hardhat");

async function main() {
  console.log("🔑 Generating a test wallet for Sepolia deployment...\n");

  // Generate a random wallet
  const wallet = ethers.Wallet.createRandom();

  console.log("📋 Wallet Details:");
  console.log("==================");
  console.log(`Address: ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  console.log("\n⚠️  IMPORTANT SECURITY NOTES:");
  console.log("- This is a TEST wallet only!");
  console.log("- NEVER use this for mainnet or real funds!");
  console.log("- Copy the private key to your .env file");
  console.log("- Get test ETH from: https://sepoliafaucet.com/");
  console.log("\n📝 Next Steps:");
  console.log("1. Copy the private key above");
  console.log("2. Update PRIVATE_KEY in your .env file");
  console.log("3. Get test ETH from Sepolia faucet");
  console.log(
    "4. Run deployment: npx hardhat run scripts/deploy.ts --network sepolia"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
