const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Preparing to transfer GYM tokens...\n");

  // Get the token contract instance
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);

  // Get the signer
  const [sender] = await hre.ethers.getSigners();
  console.log(`🔑 Sender address: ${sender.address}`);

  // Recipient address - replace with actual recipient address
  const recipientAddress = "0x123456789abcdef123456789abcdef123456789a"; // REPLACE THIS!

  // Amount to transfer (100 tokens with 18 decimals)
  const amount = hre.ethers.parseUnits("100", 18);

  console.log(
    `📤 Sending ${hre.ethers.formatUnits(
      amount,
      18
    )} GYM tokens to ${recipientAddress}...`
  );

  // Check current balances
  const senderBalanceBefore = await token.balanceOf(sender.address);
  const recipientBalanceBefore = await token.balanceOf(recipientAddress);

  console.log("\n📊 Balances Before Transfer:");
  console.log(`Sender: ${hre.ethers.formatUnits(senderBalanceBefore, 18)} GYM`);
  console.log(
    `Recipient: ${hre.ethers.formatUnits(recipientBalanceBefore, 18)} GYM`
  );

  // Execute the transfer
  try {
    const tx = await token.transfer(recipientAddress, amount);
    console.log(`\n⏳ Transaction sent! Waiting for confirmation...`);
    console.log(`Transaction hash: ${tx.hash}`);

    // Wait for transaction confirmation
    await tx.wait();
    console.log(`\n✅ Transfer completed!`);

    // Check new balances
    const senderBalanceAfter = await token.balanceOf(sender.address);
    const recipientBalanceAfter = await token.balanceOf(recipientAddress);

    console.log("\n📊 Balances After Transfer:");
    console.log(
      `Sender: ${hre.ethers.formatUnits(senderBalanceAfter, 18)} GYM`
    );
    console.log(
      `Recipient: ${hre.ethers.formatUnits(recipientBalanceAfter, 18)} GYM`
    );

    console.log(`\n🔍 View the transaction on Etherscan:`);
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
  } catch (error: any) {
    console.error(`\n❌ Transfer failed: ${error.message || "Unknown error"}`);
    console.error(
      "Please check that the recipient address is valid and that you have sufficient token balance."
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
