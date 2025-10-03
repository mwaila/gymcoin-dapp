# GymToken - ERC20 Token Project

A Hardhat-based Ethereum project for deploying and managing the **GymToken** (GYM), a standard ERC20 token built with OpenZeppelin contracts.

## 📋 Project Overview

This project demonstrates:

- **ERC20 Token Implementation**: A complete token contract using OpenZeppelin standards
- **Hardhat Development Environment**: Modern Ethereum development toolkit
- **TypeScript Integration**: Type-safe smart contract interactions
- **Multiple Solidity Compiler Support**: Configured for different Solidity versions
- **Easy Deployment Scripts**: Automated deployment with detailed logging

## 🏗️ Project Structure

```
mytoken/
├── contracts/
│   ├── Token.sol           # GymToken ERC20 contract
│   ├── Counter.sol         # Example counter contract
│   └── Counter.t.sol.bak   # Foundry test file (backup)
├── scripts/
│   ├── deploy.ts          # Main deployment script
│   └── send-op-tx.ts      # OP transaction example
├── ignition/
│   └── modules/
│       └── Counter.ts     # Ignition deployment module
├── test/
│   └── Counter.ts         # Test files
├── hardhat.config.ts      # Hardhat configuration
└── package.json          # Dependencies and scripts
```

## 🪙 GymToken Contract Details

- **Name**: Gym Token
- **Symbol**: GYM
- **Standard**: ERC20 (OpenZeppelin implementation)
- **Initial Supply**: 1,000,000,000 GYM (1 billion tokens)
- **Decimals**: 18 (standard)
- **Features**:
  - Transfer functionality
  - Allowance system
  - Minting at deployment
  - Standard ERC20 events

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository** (or navigate to your project directory):

```bash
cd C:\Projectx\BlockChain\Ethereum\mytoken
```

2. **Install dependencies**:

```bash
npm install
```

3. **Compile contracts**:

```bash
npx hardhat compile
```

## 🔧 Usage

### Compiling Contracts

Compile all Solidity contracts:

```bash
npx hardhat compile
```

### Deploying GymToken

Deploy to local Hardhat network:

```bash
npx hardhat run scripts/deploy.ts --network hardhat
```

Deploy to Sepolia testnet:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

The deployment script will:

- Deploy GymToken with 1 billion initial supply
- Mint all tokens to the deployer's address
- Display the deployed contract address

### Verifying on Etherscan

Verify your contract on Etherscan for better transparency:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> 1000000000
```

Replace `<CONTRACT_ADDRESS>` with your deployed contract address.

## 📝 Deployed Contracts

### Sepolia Testnet

- **Contract Address**: [0x5dbB770Daa57c7f345E1e55024F0f06247f89682](https://sepolia.etherscan.io/address/0x5dbB770Daa57c7f345E1e55024F0f06247f89682)
- **Token Name**: Gym Token
- **Symbol**: GYM
- **Total Supply**: 1,000,000,000 GYM
- **Deployed On**: June 2024
- **Owner Address**: 0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE

## 💻 Interacting with GymToken

### Using Etherscan

You can interact with the verified contract directly on Etherscan:

1. Visit the contract page on [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x5dbB770Daa57c7f345E1e55024F0f06247f89682)
2. Go to the "Contract" tab and select "Read Contract" to view token information
3. Go to "Write Contract" to interact with functions like `transfer`, `approve`, etc.

### Using Hardhat Scripts

Create custom scripts for specific interactions. For example, to check your token balance:

```typescript
// scripts/checkBalance.ts
const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";
  const accountToCheck = "YOUR_ADDRESS_HERE";

  const token = await hre.ethers.getContractAt("GymToken", tokenAddress);
  const balance = await token.balanceOf(accountToCheck);

  console.log(`GYM Token Balance: ${hre.ethers.formatUnits(balance, 18)} GYM`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run the script with:

```bash
npx hardhat run scripts/checkBalance.ts --network sepolia
```

## 🔍 Testing RPC Endpoints

If you experience RPC connection issues, you can test multiple endpoints with the provided script:

```bash
npx ts-node scripts/findWorkingRpc.ts
```

This script will:

````bash

1. Test the configured RPC endpoint in your `.env` file
2. Try alternative endpoints if the configured one fails
3. Update your `.env` file with a working endpoint
4. Check your wallet balance

## ⚠️ Troubleshooting

### Common Issues

#### RPC Connection Problems

```plaintext
Error: could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.7.2)
````

**Solution**:

- Try changing the RPC URL in your `.env` file
- Run `npx ts-node scripts/findWorkingRpc.ts` to find a working endpoint
- Increase the timeout in your `hardhat.config.ts` file

#### Insufficient Funds

```plaintext
Error: insufficient funds for intrinsic transaction cost
```

**Solution**:

- Get testnet ETH from a Sepolia faucet
- Check your balance with `npx hardhat run scripts/checkBalance.ts --network sepolia`

#### Contract Verification Failed

```plaintext
The constructor arguments don't match
```

**Solution**:

- Ensure you're passing the correct constructor arguments
- For GymToken: `npx hardhat verify --network sepolia <CONTRACT_ADDRESS> 1000000000`

```
✅ GymToken deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Testing Deployment

You can interact with the deployed contract using Hardhat console:

```bash
npx hardhat console --network hardhat
```

Example interactions:

```javascript
// Get contract factory
const Token = await ethers.getContractFactory("GymToken");

// Connect to deployed contract (replace with actual address)
const token = await Token.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

// Check token details
await token.name(); // "Gym Token"
await token.symbol(); // "GYM"
await token.totalSupply(); // 1000000000000000000000000000 (1B * 10^18)
```

## 🌐 Network Configuration

The project is configured to work with multiple networks. Currently set up for:

- **Hardhat Network**: Local development network (default)
- **Localhost**: Local Ethereum node (port 8545)

### Adding New Networks

To add testnets or mainnet, update `hardhat.config.ts`:

```typescript
networks: {
  sepolia: {
    url: "https://sepolia.infura.io/v3/YOUR-PROJECT-ID",
    accounts: ["YOUR-PRIVATE-KEY"]
  }
}
```

Then deploy with:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## 📝 Smart Contract Details

### GymToken.sol

```solidity
contract GymToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gym Token", "GYM") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
```

**Key Features:**

- Inherits from OpenZeppelin's ERC20 implementation
- Mints entire supply to contract deployer
- No additional minting functionality (fixed supply)
- Standard transfer and approval mechanisms

### Deployment Parameters

- **Initial Supply**: 1,000,000,000 tokens (specified in deploy.ts)
- **Deployed to**: Contract deployer's address
- **Gas Optimization**: Compiler optimization enabled

## 🧪 Development Workflow

### 1. Make Contract Changes

Edit `contracts/Token.sol` for any modifications

### 2. Compile & Check

```bash
npx hardhat compile
```

### 3. Deploy & Test

```bash
npx hardhat run scripts/deploy.ts --network hardhat
```

### 4. Verify Deployment

Use Hardhat console or create test scripts to interact with your contract

## 🛠️ Customization

### Changing Token Parameters

Edit `contracts/Token.sol`:

```solidity
constructor(uint256 initialSupply) ERC20("Your Token Name", "SYMBOL") {
    _mint(msg.sender, initialSupply * 10 ** decimals());
}
```

### Modifying Supply

Edit `scripts/deploy.ts`:

```typescript
const initialSupply = 5000000000; // 5 billion tokens
```

### Adding Features

Consider adding:

- **Minting**: Allow new token creation
- **Burning**: Token destruction functionality
- **Pausing**: Emergency stop functionality
- **Access Control**: Admin roles and permissions

## 📚 Dependencies

- **@openzeppelin/contracts**: Secure, audited smart contract library
- **hardhat**: Development environment and task runner
- **ethers**: Ethereum library for JavaScript/TypeScript
- **typescript**: Type safety and modern JavaScript features

## 🔍 Troubleshooting

### Common Issues

**1. Compilation Errors**

```bash
npx hardhat clean
npx hardhat compile
```

**2. Deployment Failures**

- Check network connectivity
- Ensure sufficient ETH for gas fees
- Verify contract constructor parameters

**3. Type Errors**

- Ensure TypeScript dependencies are installed
- Check import paths and contract names

### Getting Help

- Check [Hardhat Documentation](https://hardhat.org/docs)
- Review [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- Examine error messages carefully

## 📄 License

This project is licensed under the ISC License.
