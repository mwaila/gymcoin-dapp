/**
 * GymToken Airdrop Script
 *
 * This script demonstrates how to airdrop GymToken to multiple addresses
 * in a single transaction. Use this for marketing campaigns or rewarding users.
 *
 * Run with: npx hardhat run scripts/airdrop.ts --network sepolia
 */
import { ethers } from "hardhat";
import { printError } from "./utils/errorHandling";

// Sample airdrop recipients
// For real use, load these from a CSV or JSON file
const RECIPIENTS = [
  {
    address: "0x1111111111111111111111111111111111111111",
    amount: "100", // 100 tokens
  },
  {
    address: "0x2222222222222222222222222222222222222222",
    amount: "250", // 250 tokens
  },
  {
    address: "0x3333333333333333333333333333333333333333",
    amount: "500", // 500 tokens
  },
];

/**
 * Function to perform token airdrop to multiple addresses
 */
async function performAirdrop() {
  try {
    console.log("🚀 GymToken Airdrop Script");
    console.log("========================\n");

    // Get the token contract address
    const tokenAddress =
      process.env.GYM_TOKEN_ADDRESS ||
      "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";

    // Get the signer (token owner)
    const [owner] = await ethers.getSigners();
    console.log(`Token Owner: ${owner.address}`);

    // Get the token contract
    const token = await ethers.getContractAt("GymToken", tokenAddress);
    console.log(`GymToken Address: ${await token.getAddress()}`);

    // Check owner's token balance
    const ownerBalance = await token.balanceOf(owner.address);
    const decimals = await token.decimals();
    console.log(
      `Owner Balance: ${ethers.formatUnits(ownerBalance, decimals)} GYM\n`
    );

    // Calculate total tokens to be airdropped
    let totalTokens = ethers.parseUnits("0", decimals);
    for (const recipient of RECIPIENTS) {
      totalTokens += ethers.parseUnits(recipient.amount, decimals);
    }

    // Check if owner has enough tokens
    if (ownerBalance < totalTokens) {
      console.log(`❌ Error: Insufficient token balance!`);
      console.log(`Required: ${ethers.formatUnits(totalTokens, decimals)} GYM`);
      console.log(
        `Available: ${ethers.formatUnits(ownerBalance, decimals)} GYM`
      );
      return;
    }

    // Confirm the airdrop
    console.log(`📦 Airdrop Summary:`);
    console.log(`=================`);
    console.log(`Recipients: ${RECIPIENTS.length}`);
    console.log(
      `Total Tokens: ${ethers.formatUnits(totalTokens, decimals)} GYM\n`
    );

    console.log("Recipient Details:");
    for (const [index, recipient] of RECIPIENTS.entries()) {
      console.log(
        `${index + 1}. ${recipient.address} - ${recipient.amount} GYM`
      );
    }

    // Perform the airdrop (one transfer per recipient)
    console.log(`\n🚀 Performing airdrop...`);

    for (const [index, recipient] of RECIPIENTS.entries()) {
      console.log(
        `Processing ${index + 1}/${RECIPIENTS.length}: ${recipient.address}`
      );

      // Convert amount to wei
      const amount = ethers.parseUnits(recipient.amount, decimals);

      // Transfer tokens to the recipient
      const tx = await token.transfer(recipient.address, amount);
      console.log(`Transaction sent: ${tx.hash}`);

      // Wait for confirmation
      console.log(`Waiting for confirmation...`);
      await tx.wait();
      console.log(`✅ Transfer confirmed!`);
    }

    // Check remaining balance
    const newBalance = await token.balanceOf(owner.address);
    console.log(`\n✅ Airdrop completed successfully!`);
    console.log(
      `Remaining Balance: ${ethers.formatUnits(newBalance, decimals)} GYM`
    );
  } catch (error) {
    printError("Airdrop failed", error);
  }
}

// Execute the airdrop
performAirdrop().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
