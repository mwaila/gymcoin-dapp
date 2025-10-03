# GymToken Scripts

This directory contains scripts for deploying, managing, and interacting with the GymToken ERC20 contract.

## Available Scripts

### Core Scripts

- **deploy.ts**: Main deployment script for the GymToken contract

  ```bash
  npx hardhat run scripts/deploy.ts --network sepolia
  ```

- **checkBalance.ts**: Check ETH and GymToken balances for a wallet

  ```bash
  npx hardhat run scripts/checkBalance.ts --network sepolia
  ```

- **transferTokens.ts**: Transfer GymToken to another address

  ```bash
  npx hardhat run scripts/transferTokens.ts --network sepolia
  ```

- **tokenExplorer.ts**: View recent transfers and token information

  ```bash
  npx hardhat run scripts/tokenExplorer.ts --network sepolia
  ```

### Distribution Scripts

- **airdrop.ts**: Send GymToken to multiple addresses at once

  ```bash
  npx hardhat run scripts/airdrop.ts --network sepolia
  ```

### Utility Scripts

- **findWorkingRpc.ts**: Find a working RPC endpoint for Sepolia testnet

  ```bash
  npx ts-node scripts/findWorkingRpc.ts
  ```

- **testConnection.ts**: Test connection to Sepolia and check wallet details

  ```bash
  npx hardhat run scripts/testConnection.ts --network sepolia
  ```

- **generateWallet.ts**: Generate a new wallet for testing

  ```bash
  npx hardhat run scripts/generateWallet.ts
  ```

### Interactive Tools

- **gymTokenManager.ts**: Interactive CLI tool for managing GymToken

  ```bash
  npx hardhat run scripts/gymTokenManager.ts --network sepolia
  ```

## Usage Guidelines

1. Always make sure you have enough Sepolia ETH for gas fees
2. Set your private key in the `.env` file before running scripts
3. Run `findWorkingRpc.ts` if you experience connection issues
