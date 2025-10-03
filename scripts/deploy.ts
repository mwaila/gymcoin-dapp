/**
 * GymToken Deployment Script
 *
 * This script deploys the GymToken ERC20 contract to the specified network.
 * Run with: npx hardhat run scripts/deploy.ts --network <network-name>
 *
 * Supported networks:
 * - hardhat (default, local development)
 * - localhost (local node on port 8545)
 * - sepolia (Ethereum testnet)
 */
const hre = require("hardhat");

async function main() {
  try {
    // Deployment parameters
    const initialSupply = 1000000000; // 1 billion tokens

    // Get network information
    const network = hre.network.name;
    console.log(`📡 Deploying GymToken to ${network} network...`);

    // Get the contract factory for GymToken
    console.log(`⚙️  Preparing contract factory...`);
    const Token = await hre.ethers.getContractFactory("GymToken");

    // Deploy with constructor arguments
    console.log(
      `🚀 Deploying with initial supply of ${initialSupply} tokens...`
    );
    const token = await Token.deploy(initialSupply);

    // Wait for deployment to complete
    console.log(`⏳ Waiting for deployment transaction to be confirmed...`);
    await token.waitForDeployment();

    // Get deployment address
    const deployedAddress = await token.getAddress();

    // Log success information
    console.log(`\n✅ GymToken successfully deployed!`);
    console.log(`📝 Contract Address: ${deployedAddress}`);
    console.log(
      `🔍 Verify on Etherscan: npx hardhat verify --network ${network} ${deployedAddress} ${initialSupply}`
    );

    // Return deployed contract address for any subsequent scripts
    return deployedAddress;
  } catch (error) {
    console.error(`❌ Deployment failed:`);
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`❌ Unhandled error in deployment script:`);
  console.error(error);
  process.exitCode = 1;
});
