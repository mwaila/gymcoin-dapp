import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { useToast, Box, Text, Button } from "@chakra-ui/react";

// ABI import (we'll create this file next)
import { GymTokenABI } from "../utils/contracts";

// Types
interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  chainId: number | null;
  isConnected: boolean;
  tokenContract: ethers.Contract | null;
  tokenBalance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

// GymToken contract address on Sepolia testnet
const TOKEN_CONTRACT_ADDRESS = "0x5dbB770Daa57c7f345E1e55024F0f06247f89682";

// Create the context
const Web3Context = createContext<Web3ContextType | null>(null);

// Provider component
export const Web3Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  // Initialize provider from window.ethereum
  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(ethersProvider);

          // Check if already connected
          const accounts = await ethersProvider.listAccounts();
          if (accounts.length > 0) {
            const userSigner = await ethersProvider.getSigner();
            const userChainId = (await ethersProvider.getNetwork()).chainId;

            setAccount(accounts[0].address);
            setSigner(userSigner);
            setChainId(Number(userChainId));

            // Initialize token contract
            initTokenContract(ethersProvider, userSigner);
          }
        } catch (error) {
          console.error("Failed to initialize provider:", error);
        }
      }
    };

    initProvider();
  }, []);

  // Initialize token contract
  const initTokenContract = async (
    provider: ethers.BrowserProvider,
    signer: ethers.JsonRpcSigner
  ) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        GymTokenABI,
        signer || provider
      );

      setTokenContract(contract);

      // Get token balance if we have an account
      if (signer) {
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        setTokenBalance(ethers.formatUnits(balance, 18));
      }
    } catch (error) {
      console.error("Failed to initialize token contract:", error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Ethereum wallet found",
        description:
          "Please install MetaMask or another web3 wallet to continue.",
        status: "warning",
        duration: 10000,
        isClosable: true,
      });

      // Provide link to install MetaMask via toast notification
      toast({
        title: "Install a wallet",
        description: "Click the button below to install MetaMask",
        status: "info",
        duration: 15000,
        isClosable: true,
        render: () => (
          <Box
            p={3}
            bg="blue.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="blue.200"
          >
            <Text fontWeight="medium" mb={2}>
              Would you like to install MetaMask now?
            </Text>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() =>
                window.open("https://metamask.io/download/", "_blank")
              }
            >
              Install MetaMask
            </Button>
          </Box>
        ),
      });

      // Set up read-only provider for Sepolia
      try {
        const INFURA_ID =
          process.env.REACT_APP_INFURA_ID || "9aa3d95b3bc440fa88ea12eaa4456161"; // Fallback to public key
        const readOnlyProvider = new ethers.JsonRpcProvider(
          `https://sepolia.infura.io/v3/${INFURA_ID}`
        );
        setProvider(readOnlyProvider as unknown as ethers.BrowserProvider);
        setChainId(11155111); // Sepolia chain ID

        // Initialize token contract in read-only mode
        const contract = new ethers.Contract(
          TOKEN_CONTRACT_ADDRESS,
          GymTokenABI,
          readOnlyProvider
        );
        setTokenContract(contract);

        toast({
          title: "Read-only mode activated",
          description:
            "You can browse the app but can't perform transactions without a wallet",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Failed to initialize read-only provider:", error);
      }

      return;
    }

    setIsLoading(true);

    try {
      // Request accounts access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const userSigner = await ethersProvider.getSigner();
      const userChainId = (await ethersProvider.getNetwork()).chainId;

      setAccount(accounts[0]);
      setProvider(ethersProvider);
      setSigner(userSigner);
      setChainId(Number(userChainId));

      // Initialize token contract
      await initTokenContract(ethersProvider, userSigner);

      toast({
        title: "Wallet connected",
        description: `Connected to ${accounts[0].slice(
          0,
          6
        )}...${accounts[0].slice(-4)}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection error",
        description: error.message || "Failed to connect wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setSigner(null);
    setTokenBalance("0");

    toast({
      title: "Wallet disconnected",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else if (accounts[0] !== account) {
          // User switched accounts
          setAccount(accounts[0]);

          if (provider) {
            const newSigner = await provider.getSigner();
            setSigner(newSigner);

            // Update token balance for new account
            if (tokenContract) {
              const balance = await tokenContract.balanceOf(accounts[0]);
              setTokenBalance(ethers.formatUnits(balance, 18));
            }
          }
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        // Convert from hex to decimal
        const newChainId = parseInt(chainIdHex, 16);
        setChainId(newChainId);

        // Reload page as recommended by MetaMask
        window.location.reload();
      };

      // Subscribe to events
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      // Clean up listeners
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [account, provider, tokenContract, disconnectWallet]);

  // Update token balance when account changes
  useEffect(() => {
    const updateBalance = async () => {
      if (tokenContract && account) {
        try {
          const balance = await tokenContract.balanceOf(account);
          setTokenBalance(ethers.formatUnits(balance, 18));
        } catch (error) {
          console.error("Error fetching token balance:", error);
        }
      }
    };

    updateBalance();
  }, [tokenContract, account]);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        chainId,
        isConnected: !!account,
        tokenContract,
        tokenBalance,
        connectWallet,
        disconnectWallet,
        isLoading,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook for using web3 context
export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }

  return context;
};

// Add a window interface declaration
declare global {
  interface Window {
    ethereum: any;
  }
}
