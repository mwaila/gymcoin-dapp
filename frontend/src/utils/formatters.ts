/**
 * Utility functions for formatting and display
 */

/**
 * Format an address to a shorter version
 * @param address - The full Ethereum address
 * @param chars - Number of characters to keep at start and end
 * @returns Shortened address with ellipsis in the middle
 */
export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return "";
  if (address.length < 10) return address;

  const start = address.substring(0, chars + 2); // +2 for the '0x' prefix
  const end = address.substring(address.length - chars);

  return `${start}...${end}`;
};

/**
 * Format a number with commas
 * @param value - The number to format
 * @returns Formatted number string with commas as thousands separators
 */
export const formatWithCommas = (value: number | string): string => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

/**
 * Format token balance with proper precision
 * @param balance - The token balance (string or number)
 * @param decimals - Number of decimal places to show (default 2)
 * @returns Formatted balance string
 */
export const formatTokenBalance = (
  balance: string | number,
  decimals = 2
): string => {
  if (typeof balance === "string") {
    balance = parseFloat(balance);
  }

  // For very small numbers, show more decimals
  if (balance > 0 && balance < 0.01) {
    return balance.toFixed(6);
  }

  return balance.toFixed(decimals);
};

/**
 * Get network name from chain ID
 * @param chainId - The Ethereum chain ID number
 * @returns Human-readable network name
 */
export const getNetworkName = (chainId: number | null): string => {
  if (!chainId) return "Unknown Network";

  switch (chainId) {
    case 1:
      return "Ethereum Mainnet";
    case 11155111:
      return "Sepolia Testnet";
    case 5:
      return "Goerli Testnet";
    case 137:
      return "Polygon";
    case 80001:
      return "Mumbai Testnet";
    default:
      return `Unknown Network (${chainId})`;
  }
};

/**
 * Check if a string is a valid Ethereum address
 * @param address - The address to validate
 * @returns True if valid Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Get time difference in a human-readable format
 * @param timestamp - UNIX timestamp in seconds
 * @returns Human-readable time difference (e.g. "5 minutes ago")
 */
export const getTimeDifference = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;

  return `${Math.floor(diff / 31536000)} years ago`;
};
