const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🔍 Checking wallet information for Sepolia deployment...\n");

  // Get the signer from the configured network
  const [deployer] = await hre.ethers.getSigners();

  console.log("📋 Wallet Details:");
  console.log("==================");
  console.log(`Address: ${deployer.address}`);

  // Get ETH balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`ETH Balance: ${hre.ethers.formatEther(balance)} ETH`);

  // Check if the deployed GymToken contract exists
  try {
    const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
    const token = await hre.ethers.getContractAt("GymToken", tokenAddress);

    // Get GYM token balance
    const tokenBalance = await token.balanceOf(deployer.address);
    console.log(
      `GYM Token Balance: ${hre.ethers.formatUnits(tokenBalance, 18)} GYM`
    );

    // Get total supply for reference
    const totalSupply = await token.totalSupply();
    console.log(`Total Supply: ${hre.ethers.formatUnits(totalSupply, 18)} GYM`);
  } catch (error) {
    console.log(
      "\n⚠️ Could not fetch GymToken balance. Contract may not be deployed on this network."
    );
  }

  // Estimate deployment cost
  console.log("\n💰 Estimated Deployment Cost:");
  console.log("==================");
  console.log("Approximate gas needed: ~0.001 - 0.002 ETH");

  if (balance === 0n) {
    console.log("\n⚠️  Your wallet has ZERO balance!");
    console.log("\n📝 Next Steps:");
    console.log("1. Copy your wallet address above");
    console.log("2. Visit one of these Sepolia faucets:");
    console.log("   - https://sepoliafaucet.com/");
    console.log("   - https://www.alchemy.com/faucets/ethereum-sepolia");
    console.log(
      "   - https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
    );
    console.log("3. Request test ETH (usually 0.5 - 1 ETH per request)");
    console.log("4. Wait 1-2 minutes for the transaction to confirm");
    console.log("5. Run this script again to verify balance");
    console.log(
      "6. Deploy: npx hardhat run scripts/deploy.ts --network sepolia"
    );
  } else {
    console.log("\n✅ Wallet has sufficient balance for deployment!");
    console.log(
      "You can proceed with: npx hardhat run scripts/deploy.ts --network sepolia"
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
