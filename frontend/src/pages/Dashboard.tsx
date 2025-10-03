import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button,
  useColorModeValue,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { FiUser, FiDollarSign, FiClock, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../contexts/Web3Context";
import StatCard from "../components/StatCard";
import TransactionCard from "../components/TransactionCard";
import { formatWithCommas } from "../utils/formatters";

interface TransactionData {
  txHash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
  type: "incoming" | "outgoing";
}

const Dashboard: React.FC = () => {
  const {
    account,
    tokenContract,
    tokenBalance,
    chainId,
    isConnected,
    connectWallet,
  } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionData[]
  >([]);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Fetch transactions when component mounts
  useEffect(() => {
    if (isConnected && tokenContract && account) {
      fetchTransactions();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, tokenContract, account]);

  const fetchTransactions = async () => {
    setIsLoading(true);

    try {
      // This is a mock function since we can't easily get historical transactions
      // In a real app, you would query events from the blockchain or use an indexer
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading

      // Mock data for demo purposes
      const mockTransactions = [
        {
          txHash:
            "0x7d9fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630a",
          from: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
          to: account || "",
          amount: "250",
          timestamp: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
          type: "incoming" as const,
        },
        {
          txHash:
            "0x6d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630b",
          from: account || "",
          to: "0x1234567890123456789012345678901234567890",
          amount: "100",
          timestamp: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
          type: "outgoing" as const,
        },
        {
          txHash:
            "0x5d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630c",
          from: "0xabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde",
          to: account || "",
          amount: "500",
          timestamp: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
          type: "incoming" as const,
        },
      ];

      setRecentTransactions(mockTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast({
        title: "Error fetching transactions",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box
          p={8}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          textAlign="center"
        >
          <Heading mb={4}>Connect Your Wallet</Heading>
          <Text mb={6}>
            Please connect your wallet to view your GymToken dashboard.
          </Text>
          <Button colorScheme="brand" size="lg" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>Dashboard</Heading>
      <Text mb={8} color="gray.500">
        View your GymToken balance and activity
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Token Balance"
          stat={`${formatWithCommas(parseFloat(tokenBalance))} GYM`}
          icon={FiDollarSign}
          helpText="Your GYM balance"
        />
        <StatCard
          title="USD Value"
          stat="$0.00"
          icon={FiDollarSign}
          helpText="Current value in USD"
          color="green.500"
        />
        <StatCard
          title="Network"
          stat={chainId === 11155111 ? "Sepolia" : "Unknown"}
          icon={FiActivity}
          helpText={
            chainId === 11155111
              ? "Connected to Sepolia testnet"
              : "Unsupported network"
          }
          color={chainId === 11155111 ? "brand.500" : "red.500"}
        />
        <StatCard
          title="Account"
          stat="Active"
          icon={FiUser}
          helpText="Wallet connected"
          color="blue.500"
        />
      </SimpleGrid>

      <Box
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        p={6}
        boxShadow="sm"
        mb={8}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="md">Recent Transactions</Heading>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FiClock />}
            onClick={() => navigate("/explorer")}
          >
            View All
          </Button>
        </Flex>

        {isLoading ? (
          <Flex justify="center" align="center" py={10}>
            <Spinner size="xl" color="brand.500" thickness="3px" />
          </Flex>
        ) : recentTransactions.length > 0 ? (
          <Stack spacing={4}>
            {recentTransactions.map((tx) => (
              <TransactionCard
                key={tx.txHash}
                txHash={tx.txHash}
                from={tx.from}
                to={tx.to}
                amount={tx.amount}
                timestamp={tx.timestamp}
                type={tx.type}
              />
            ))}
          </Stack>
        ) : (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            No transactions found for this account.
          </Alert>
        )}
      </Box>

      <Box
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        p={6}
        boxShadow="sm"
      >
        <Heading size="md" mb={6}>
          Token Management
        </Heading>

        <Tabs colorScheme="brand" variant="enclosed">
          <TabList>
            <Tab>Quick Actions</Tab>
            <Tab>Token Info</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Button
                  size="lg"
                  colorScheme="brand"
                  variant="solid"
                  onClick={() => navigate("/transfer")}
                  height="100px"
                >
                  Transfer Tokens
                </Button>
                <Button
                  size="lg"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => navigate("/staking")}
                  height="100px"
                >
                  Stake Tokens
                </Button>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Token Name
                  </Text>
                  <Text mb={3}>Gym Token</Text>

                  <Text fontWeight="bold" mb={1}>
                    Token Symbol
                  </Text>
                  <Text mb={3}>GYM</Text>

                  <Text fontWeight="bold" mb={1}>
                    Decimals
                  </Text>
                  <Text mb={3}>18</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    Contract Address
                  </Text>
                  <Text mb={3} fontSize="sm" wordBreak="break-all">
                    0x5dbB770Daa57c7f345E1e55024F0f06247f89682
                  </Text>

                  <Text fontWeight="bold" mb={1}>
                    Network
                  </Text>
                  <Text mb={3}>Sepolia Testnet</Text>

                  <Text fontWeight="bold" mb={1}>
                    Total Supply
                  </Text>
                  <Text mb={3}>1,000,000,000 GYM</Text>
                </Box>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Dashboard;
