# GymToken Frontend Installation Guide

This guide will help you install and run the GymToken React frontend application.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn

## Installation Steps

1. **Navigate to the frontend directory**

```bash
cd C:\Projectx\BlockChain\Ethereum\mytoken\frontend
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn
```

This will install all the required dependencies defined in the package.json file.

3. **Configure the environment**

Create a `.env` file in the root of the frontend directory with the following content:

```
REACT_APP_TOKEN_ADDRESS=0x5dbB770Daa57c7f345E1e55024F0f06247f89682
REACT_APP_NETWORK_ID=11155111
REACT_APP_INFURA_ID=YOUR_INFURA_ID
```

Replace `YOUR_INFURA_ID` with your actual Infura project ID. If you don't have one, you can create a free account at [Infura](https://infura.io/).

4. **Start the development server**

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

This will launch the development server and automatically open the application in your default web browser. The application will be running at `http://localhost:3000`.

## Build for Production

When you're ready to deploy the application to production, you can create an optimized build:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

This will create a `build` folder with all the optimized and minified assets ready for deployment.

## Connecting to the Blockchain

The application is configured to connect to the Sepolia testnet where your GymToken contract is deployed. To interact with the application:

1. Install MetaMask or another Web3 wallet browser extension
2. Configure your wallet to connect to Sepolia testnet
3. Ensure you have some Sepolia ETH for gas fees
4. Click "Connect Wallet" in the application to link your wallet

## Features

- **Dashboard**: View your token balance and recent transactions
- **Transfer**: Send GYM tokens to other addresses
- **Explorer**: Browse token transactions and holder information
- **Staking**: Stake your tokens to earn rewards (mock functionality)

## Troubleshooting

- If you encounter errors during installation, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
- Ensure you have the correct Node.js version installed.
- If you have issues connecting to the blockchain, verify that your wallet is properly configured for the Sepolia testnet.
- For Web3 connection issues, check that your Infura API key is correct in the `.env` file.

## Support

For any issues or questions, please refer to the project documentation or contact the development team.
