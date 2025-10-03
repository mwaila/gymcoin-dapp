/**
 * Error Handling Utilities
 *
 * This module provides common error handling functions for GymToken scripts.
 */

/**
 * Pretty-prints an error with consistent formatting
 * @param {string} message - The error message
 * @param {unknown} error - The error object
 */
export function printError(message: string, error: unknown): void {
  console.error(`\n❌ ${message}`);

  if (error instanceof Error) {
    console.error(`   ${error.message}`);

    // Check for common errors and provide helpful solutions
    const errorMsg = error.message.toLowerCase();

    if (errorMsg.includes("insufficient funds")) {
      console.log(
        "\n💡 Solution: You need more ETH in your wallet for gas fees."
      );
      console.log(
        "   Get test ETH from a Sepolia faucet like https://sepoliafaucet.com/"
      );
    } else if (
      errorMsg.includes("could not detect network") ||
      errorMsg.includes("network error")
    ) {
      console.log("\n💡 Solution: Network connection issues. Try:");
      console.log("   1. Check your internet connection");
      console.log(
        "   2. Run scripts/findWorkingRpc.ts to find a working RPC endpoint"
      );
      console.log("   3. Update your .env file with a working RPC URL");
    } else if (
      errorMsg.includes("nonce") ||
      errorMsg.includes("replacement fee too low")
    ) {
      console.log("\n💡 Solution: Transaction nonce issues. Try:");
      console.log("   1. Wait for any pending transactions to complete");
      console.log(
        "   2. Increase gas price if you're trying to speed up a transaction"
      );
    }
  } else {
    console.error(`   ${String(error)}`);
  }
}

/**
 * Handles common network-related errors
 * @param {string} networkName - The name of the network
 */
export function handleNetworkErrors(networkName: string): void {
  if (networkName === "hardhat" || networkName === "localhost") {
    console.log(`\n⚠️ You are using the ${networkName} network.`);
    console.log(
      "   This is a local development network that resets after the script finishes."
    );
    console.log("   For persistent deployment, use a testnet like Sepolia:");
    console.log("   npx hardhat run scripts/deploy.ts --network sepolia");
  }
}

/**
 * Format address for display (adds ellipsis in the middle)
 * @param {string} address - The Ethereum address to format
 * @returns {string} The formatted address
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 42) return address;
  return `${address.substring(0, 6)}...${address.substring(38)}`;
}

/**
 * Format large number with commas for better readability
 * @param {string | number | bigint} value - The number to format
 * @returns {string} Formatted number
 */
export function formatWithCommas(value: string | number | bigint): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Verify the input address has the correct format
 * @param {string} address - The Ethereum address to verify
 * @returns {boolean} True if valid
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Prompt for confirmation before proceeding
 * @returns {Promise<boolean>} True if confirmed
 */
export async function confirmAction(
  message: string = "Continue?"
): Promise<boolean> {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(`${message} (y/n): `, (answer: string) => {
      readline.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}
