const hre = require("hardhat");

async function main() {
  console.log("🔄 Testing connection to Sepolia network...");

  try {
    // Try to get the network details
    const network = await hre.ethers.provider.getNetwork();
    console.log(
      `✅ Successfully connected to network: ${network.name} (chainId: ${network.chainId})`
    );

    // Get latest block to confirm RPC is responsive
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`✅ Current block number: ${blockNumber}`);

    // Get gas price to verify we can make transactions
    const gasPrice = await hre.ethers.provider.getFeeData();
    console.log(
      `✅ Current gas price: ${hre.ethers.formatUnits(
        gasPrice.gasPrice,
        "gwei"
      )} gwei`
    );

    // Get deployer account and balance
    const [deployer] = await hre.ethers.getSigners();
    console.log(`✅ Deployer address: ${deployer.address}`);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log(`✅ Account balance: ${hre.ethers.formatEther(balance)} ETH`);

    if (balance === 0n) {
      console.log("\n⚠️ Warning: Your account has zero balance!");
      console.log(
        "You need to get test ETH from a Sepolia faucet before deploying."
      );
      console.log("See desc.txt for faucet links.");
    } else {
      console.log(
        "\n✅ Connection test successful! You can now deploy your contract."
      );
      console.log("Run: npx hardhat run scripts/deploy.ts --network sepolia");
    }
  } catch (error: any) {
    console.error("\n❌ Connection test failed!");
    console.error(`Error details: ${error.message || "Unknown error"}`);
    console.error("\nPossible solutions:");
    console.error("1. Try a different RPC URL in your .env file");
    console.error("2. Check your internet connection");
    console.error("3. The Sepolia network might be congested, try again later");
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
