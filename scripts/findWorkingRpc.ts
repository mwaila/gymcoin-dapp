const hre = require("hardhat");
const { ethers } = require("ethers");
require("dotenv").config();

// List of public Sepolia RPC endpoints to try
const RPC_URLS = [
  "https://ethereum-sepolia.publicnode.com",
  "https://rpc.sepolia.org",
  "https://sepolia.blockpi.network/v1/rpc/public",
  "https://sepolia.gateway.tenderly.co",
];

async function testConnection(url: string) {
  console.log(`🔄 Testing connection to: ${url}`);

  // Create a custom provider with the URL
  const provider = new hre.ethers.JsonRpcProvider(url);

  try {
    // Set a shorter timeout for this test
    const networkPromise = provider.getNetwork();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection timed out")), 10000)
    );

    // Race the connection against a timeout
    const network = await Promise.race([networkPromise, timeoutPromise]);
    console.log(
      `✅ Connected to network: ${network.name} (chainId: ${network.chainId})`
    );

    // Get latest block
    const blockNumber = await provider.getBlockNumber();
    console.log(`✅ Current block number: ${blockNumber}`);

    return { success: true, provider };
  } catch (error: any) {
    console.log(`❌ Connection failed: ${error.message || "Unknown error"}`);
    return { success: false };
  }
}

async function main() {
  console.log(
    "🔄 Testing Sepolia connections with multiple RPC endpoints...\n"
  );

  // First try the configured endpoint
  const configuredUrl = process.env.SEPOLIA_URL;
  if (configuredUrl) {
    console.log("Testing the configured RPC endpoint from .env file:");
    const result = await testConnection(configuredUrl);

    if (result.success) {
      // If configured URL works, use it to check wallet details
      return await checkWalletDetails(result.provider);
    }

    console.log("\nConfigured endpoint failed, trying alternatives...\n");
  }

  // Try each RPC URL until one works
  for (const url of RPC_URLS) {
    if (url !== configuredUrl) {
      // Skip if we already tried this URL
      const result = await testConnection(url);

      if (result.success) {
        console.log(`\n✅ Found working RPC endpoint: ${url}`);
        console.log(
          "👉 Update your .env file with this URL for future deployments"
        );

        // Update the .env file with this working URL
        try {
          const fs = require("fs");
          const envFile = fs.readFileSync(".env", "utf8");
          const updatedEnv = envFile.replace(
            /SEPOLIA_URL=.+/,
            `SEPOLIA_URL=${url}`
          );
          fs.writeFileSync(".env", updatedEnv);
          console.log("✅ .env file updated with working URL\n");
        } catch (error: any) {
          console.log(
            `⚠️ Could not update .env file: ${
              error.message || "Unknown error"
            }\n`
          );
        }

        // Check wallet details with working provider
        return await checkWalletDetails(result.provider);
      }
    }
  }

  console.error("\n❌ All RPC endpoints failed!");
  console.error("Possible solutions:");
  console.error("1. Check your internet connection");
  console.error("2. The Sepolia network might be experiencing issues");
  console.error("3. Try again later or find another RPC provider");
  process.exitCode = 1;
}

async function checkWalletDetails(provider: any) {
  try {
    console.log("\n📋 Checking wallet details:");
    console.log("=======================");

    // Create a wallet from the private key
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY || "");
    const signer = wallet.connect(provider);

    console.log(`✅ Wallet address: ${wallet.address}`);

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`✅ Account balance: ${hre.ethers.formatEther(balance)} ETH`);

    if (balance === 0n) {
      console.log("\n⚠️ Warning: Your account has zero balance!");
      console.log(
        "You need to get test ETH from a Sepolia faucet before deploying:"
      );
      console.log("- https://sepoliafaucet.com/");
      console.log("- https://www.alchemy.com/faucets/ethereum-sepolia");
      console.log("- https://sepolia-faucet.pk910.de/");
    } else {
      console.log(
        "\n✅ Connection test successful! You can now deploy your contract."
      );
      console.log(
        `👉 Run: npx hardhat run scripts/deploy.ts --network sepolia`
      );
    }

    return true;
  } catch (error: any) {
    console.error(
      `\n❌ Error checking wallet details: ${error.message || "Unknown error"}`
    );
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
