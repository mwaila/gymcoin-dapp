# GymToken Deployment Information

## Contract Details

- **Name**: Gym Token
- **Symbol**: GYM
- **Type**: ERC20 (OpenZeppelin Implementation)
- **Initial Supply**: 1,000,000,000 (1 billion tokens)

## Deployment Information

- **Network**: Sepolia Testnet
- **Contract Address**: 0x5dbB770Daa57c7f345E1e55024F0f06247f89682
- **Owner Address**: 0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE
- **Explorer Link**: [View on Etherscan](https://sepolia.etherscan.io/address/0x5dbB770Daa57c7f345E1e55024F0f06247f89682)

## Available Scripts

### 1. Check Balance

```
npx hardhat run scripts/checkBalance.ts --network sepolia
```

Shows ETH and GYM token balance for your wallet.

### 2. Transfer Tokens

```
npx hardhat run scripts/transferTokens.ts --network sepolia
```

Sends tokens to another address (edit recipient and amount in the script).

### 3. Interactive Token Manager

```
npx hardhat run scripts/gymTokenManager.ts --network sepolia
```

Interactive menu to check balance, transfer tokens, approve spenders, etc.

### 4. Find Working RPC

```
npx ts-node scripts/findWorkingRpc.ts
```

Tests and finds a working RPC endpoint for Sepolia if the current one fails.

## Verification Status

- ✅ Contract source code is verified on Etherscan
- ✅ Public functions are accessible through Etherscan's "Read Contract" and "Write Contract" tabs

## Important Notes

- This contract follows the standard ERC20 interface and behavior
- All tokens are initially minted to the deployer's address
- To interact with the token, make sure you have enough Sepolia ETH for gas fees
