/**
 * GymToken Explorer Script
 *
 * This script provides information about recent transfers and top holders
 * of the GymToken on the current network.
 *
 * Run with: npx hardhat run scripts/tokenExplorer.ts --network sepolia
 */
const hre = require("hardhat");
require("dotenv").config();

// Get network provider and block explorer based on network
function getNetworkInfo(networkName: string): {
  explorer: string | null;
  deployed: string | null;
} {
  switch (networkName) {
    case "sepolia":
      return {
        explorer: "https://sepolia.etherscan.io",
        deployed: "0x5dbB770Daa57c7f345E1e55024F0f06247f89682",
      };
    case "mainnet":
      return {
        explorer: "https://etherscan.io",
        deployed: null, // Not deployed on mainnet yet
      };
    default:
      return {
        explorer: null,
        deployed: null,
      };
  }
}

async function main() {
  try {
    // Get the current network
    const networkName = hre.network.name;
    const { explorer, deployed } = getNetworkInfo(networkName);

    console.log(`📊 GymToken Explorer - ${networkName} network\n`);

    // Check if we have a deployment on this network
    if (!deployed) {
      console.log(`⚠️ No known GymToken deployment on ${networkName} network.`);
      console.log(`Please deploy first or specify a different network.`);
      return;
    }

    // Get the token contract
    const token = await hre.ethers.getContractAt("GymToken", deployed);

    // Display token information
    console.log(`📝 Token Information:`);
    console.log(`=====================`);
    console.log(`Name: ${await token.name()}`);
    console.log(`Symbol: ${await token.symbol()}`);
    console.log(`Decimals: ${await token.decimals()}`);
    const totalSupply = await token.totalSupply();
    console.log(`Total Supply: ${hre.ethers.formatUnits(totalSupply, 18)} GYM`);
    console.log(`Contract Address: ${deployed}`);

    if (explorer) {
      console.log(`Block Explorer: ${explorer}/token/${deployed}\n`);
    }

    // Get the most recent transfer events (limited by RPC provider capabilities)
    console.log(`🔄 Recent Transfers:`);
    console.log(`==================`);

    // Get current block number
    const currentBlock = await hre.ethers.provider.getBlockNumber();

    // Look back approximately the last 10,000 blocks (about 1-2 days on most networks)
    const fromBlock = Math.max(0, currentBlock - 10000);

    // Query Transfer events
    const filter = token.filters.Transfer();
    const events = await token.queryFilter(filter, fromBlock, "latest");

    if (events.length === 0) {
      console.log("No transfer events found in the recent blocks.");
    } else {
      // Sort events by block number (most recent first)
      const sortedEvents = [...events].sort(
        (a, b) => b.blockNumber - a.blockNumber
      );

      // Show the most recent 5 transfers
      const recentTransfers = sortedEvents.slice(0, 5);

      for (const event of recentTransfers) {
        const tx = await hre.ethers.provider.getTransaction(
          event.transactionHash
        );
        const block = await hre.ethers.provider.getBlock(event.blockNumber);

        // Format the timestamp
        const date = new Date(Number(block.timestamp) * 1000);
        const formattedDate = date.toLocaleString();

        console.log(`\nTx: ${event.transactionHash}`);
        console.log(`Block: ${event.blockNumber} (${formattedDate})`);
        console.log(`From: ${event.args[0]}`);
        console.log(`To: ${event.args[1]}`);
        console.log(`Amount: ${hre.ethers.formatUnits(event.args[2], 18)} GYM`);

        if (explorer) {
          console.log(`View: ${explorer}/tx/${event.transactionHash}`);
        }
      }

      console.log(
        `\nShowing ${recentTransfers.length} of ${events.length} transfers found.`
      );
    }

    // Note about getting more detailed information
    console.log(
      `\n📌 Note: For a complete view of all transfers and holders, visit:`
    );
    console.log(`${explorer}/token/${deployed}`);
  } catch (error: unknown) {
    console.error("❌ Error exploring token:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
