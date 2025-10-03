const hre = require("hardhat");
const readline = require("readline");
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to prompt user
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

async function displayMenu(): Promise<string> {
  console.clear();
  console.log("=================================================");
  console.log("🪙  GYM TOKEN MANAGER - SEPOLIA TESTNET  🪙");
  console.log("=================================================");
  console.log("1. View Token Information");
  console.log("2. Check Wallet Balance");
  console.log("3. Transfer Tokens");
  console.log("4. Approve Spender");
  console.log("5. Check Allowance");
  console.log("0. Exit");
  console.log("=================================================");

  const choice = await prompt("Enter your choice (0-5): ");
  return choice;
}

async function getTokenInfo(): Promise<void> {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);

  console.log("\n📋 TOKEN INFORMATION");
  console.log("=================================================");
  console.log(`Contract Address: ${tokenAddress}`);
  console.log(`Name: ${await token.name()}`);
  console.log(`Symbol: ${await token.symbol()}`);
  console.log(`Decimals: ${await token.decimals()}`);

  const totalSupply = await token.totalSupply();
  console.log(`Total Supply: ${hre.ethers.formatUnits(totalSupply, 18)} GYM`);
  console.log("=================================================\n");

  await prompt("Press Enter to continue...");
}

async function checkBalance(): Promise<void> {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);

  console.log("\n📊 BALANCE CHECKER");
  console.log("=================================================");

  const address = await prompt(
    "Enter wallet address (leave blank for your wallet): "
  );
  const checkAddress = address || (await hre.ethers.getSigners())[0].address;

  // Get ETH balance
  const ethBalance = await hre.ethers.provider.getBalance(checkAddress);
  console.log(`\nAddress: ${checkAddress}`);
  console.log(`ETH Balance: ${hre.ethers.formatEther(ethBalance)} ETH`);

  // Get token balance
  const tokenBalance = await token.balanceOf(checkAddress);
  console.log(`GYM Balance: ${hre.ethers.formatUnits(tokenBalance, 18)} GYM`);
  console.log("=================================================\n");

  await prompt("Press Enter to continue...");
}

async function transferTokens(): Promise<void> {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);
  const [sender] = await hre.ethers.getSigners();

  console.log("\n💸 TRANSFER TOKENS");
  console.log("=================================================");
  console.log(`From: ${sender.address}`);

  const recipient = await prompt("Enter recipient address: ");
  if (!recipient || !recipient.startsWith("0x") || recipient.length !== 42) {
    console.log("❌ Invalid Ethereum address format!");
    await prompt("Press Enter to continue...");
    return;
  }

  const amountInput = await prompt("Enter amount to send (in GYM): ");
  const amount = hre.ethers.parseUnits(amountInput, 18);

  console.log(`\n📤 Sending ${amountInput} GYM to ${recipient}...`);

  try {
    const tx = await token.transfer(recipient, amount);
    console.log(`Transaction hash: ${tx.hash}`);

    console.log("\n⏳ Waiting for confirmation...");
    await tx.wait();

    console.log("✅ Transfer completed!");
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
  } catch (error: any) {
    console.error(`❌ Transfer failed: ${error.message || "Unknown error"}`);
  }

  console.log("=================================================\n");
  await prompt("Press Enter to continue...");
}

async function approveSpender(): Promise<void> {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);
  const [owner] = await hre.ethers.getSigners();

  console.log("\n👍 APPROVE SPENDER");
  console.log("=================================================");
  console.log(`Token owner: ${owner.address}`);

  const spender = await prompt("Enter spender address: ");
  if (!spender || !spender.startsWith("0x") || spender.length !== 42) {
    console.log("❌ Invalid Ethereum address format!");
    await prompt("Press Enter to continue...");
    return;
  }

  const amountInput = await prompt("Enter amount to approve (in GYM): ");
  const amount = hre.ethers.parseUnits(amountInput, 18);

  console.log(`\n👉 Approving ${spender} to spend ${amountInput} GYM...`);

  try {
    const tx = await token.approve(spender, amount);
    console.log(`Transaction hash: ${tx.hash}`);

    console.log("\n⏳ Waiting for confirmation...");
    await tx.wait();

    console.log("✅ Approval completed!");
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
  } catch (error: any) {
    console.error(`❌ Approval failed: ${error.message || "Unknown error"}`);
  }

  console.log("=================================================\n");
  await prompt("Press Enter to continue...");
}

async function checkAllowance(): Promise<void> {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);

  console.log("\n🔍 CHECK ALLOWANCE");
  console.log("=================================================");

  const owner = await prompt("Enter token owner address: ");
  if (!owner || !owner.startsWith("0x") || owner.length !== 42) {
    console.log("❌ Invalid owner address format!");
    await prompt("Press Enter to continue...");
    return;
  }

  const spender = await prompt("Enter spender address: ");
  if (!spender || !spender.startsWith("0x") || spender.length !== 42) {
    console.log("❌ Invalid spender address format!");
    await prompt("Press Enter to continue...");
    return;
  }

  const allowance = await token.allowance(owner, spender);
  console.log(`\nAllowance: ${hre.ethers.formatUnits(allowance, 18)} GYM`);
  console.log("=================================================\n");

  await prompt("Press Enter to continue...");
}

async function main() {
  try {
    while (true) {
      const choice = await displayMenu();

      switch (choice) {
        case "1":
          await getTokenInfo();
          break;
        case "2":
          await checkBalance();
          break;
        case "3":
          await transferTokens();
          break;
        case "4":
          await approveSpender();
          break;
        case "5":
          await checkAllowance();
          break;
        case "0":
          console.log("\nThank you for using GYM Token Manager! Goodbye! 👋");
          rl.close();
          process.exit(0);
        default:
          console.log("\n❌ Invalid choice. Press Enter to continue...");
          await prompt("");
      }
    }
  } catch (error: any) {
    console.error(
      `\n❌ An error occurred: ${error.message || "Unknown error"}`
    );
    rl.close();
    process.exit(1);
  }
}

// Execute main function and handle errors
main().catch((error: any) => {
  console.error(error);
  rl.close();
  process.exit(1);
});
