import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Divider,
  Flex,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Button,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  Link,
  Avatar,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiExternalLink,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { useWeb3 } from "../contexts/Web3Context";
import StatCard from "../components/StatCard";
import { formatAddress, formatWithCommas } from "../utils/formatters";
import { ethers } from "ethers";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: number;
}

interface TokenHolder {
  address: string;
  balance: string;
  percentage: number;
}

const TokenExplorer: React.FC = () => {
  const { tokenContract, provider } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalSupply, setTotalSupply] = useState<string>("0");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (tokenContract) {
        setIsLoading(true);
        try {
          // Get total supply
          const supply = await tokenContract.totalSupply();
          setTotalSupply(ethers.formatUnits(supply, 18));

          // In a real application, you would fetch actual data from the blockchain
          // For now, we're using mock data
          await fetchMockData();
        } catch (error) {
          console.error("Error fetching token info:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTokenInfo();
  }, [tokenContract]);

  const fetchMockData = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock transactions
    const mockTransactions: Transaction[] = [
      {
        hash: "0x7d9fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630a",
        from: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        to: "0x1234567890123456789012345678901234567890",
        value: "250000",
        timestamp: Math.floor(Date.now() / 1000) - 86400,
        blockNumber: 3936250,
      },
      {
        hash: "0x6d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630b",
        from: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        to: "0xabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde",
        value: "100000",
        timestamp: Math.floor(Date.now() / 1000) - 172800,
        blockNumber: 3935218,
      },
      {
        hash: "0x5d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630c",
        from: "0x9876543210987654321098765432109876543210",
        to: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        value: "500000",
        timestamp: Math.floor(Date.now() / 1000) - 259200,
        blockNumber: 3934182,
      },
      {
        hash: "0x4d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630d",
        from: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        to: "0x5555555555555555555555555555555555555555",
        value: "75000",
        timestamp: Math.floor(Date.now() / 1000) - 345600,
        blockNumber: 3933140,
      },
      {
        hash: "0x3d8fc71d0a2cff65d1f50b798f7393f8a28a84aadc52db8da4b8f8f6fb73630e",
        from: "0x6666666666666666666666666666666666666666",
        to: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        value: "320000",
        timestamp: Math.floor(Date.now() / 1000) - 432000,
        blockNumber: 3932100,
      },
    ];

    // Mock holders
    const mockHolders: TokenHolder[] = [
      {
        address: "0xdf4D45FbAa4EC85e5A19d8af327671B9B462EEcE",
        balance: "650000000",
        percentage: 65,
      },
      {
        address: "0x1234567890123456789012345678901234567890",
        balance: "250000000",
        percentage: 25,
      },
      {
        address: "0xabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde",
        balance: "100000000",
        percentage: 10,
      },
    ];

    setTransactions(mockTransactions);
    setHolders(mockHolders);
  };

  const getFormattedDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatToken = (value: string): string => {
    return formatWithCommas(parseFloat(ethers.formatUnits(value, 18)));
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading mb={2}>GymToken Explorer</Heading>
        <Text color="gray.500">
          Explore token transactions and holder information
        </Text>
      </Box>

      {isLoading ? (
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" thickness="4px" color="brand.500" />
        </Flex>
      ) : (
        <VStack spacing={8} align="stretch">
          {/* Token Overview */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard
              title="Total Supply"
              stat={`${formatWithCommas(parseFloat(totalSupply))} GYM`}
              icon={FiBarChart2}
            />
            <StatCard
              title="Holders"
              stat={holders.length.toString()}
              icon={FiUsers}
            />
            <StatCard
              title="Transactions"
              stat={transactions.length.toString()}
              icon={FiClock}
            />
            <StatCard
              title="Market Cap"
              stat="$0.00"
              icon={FiDollarSign}
              helpText="Testnet token"
            />
          </SimpleGrid>

          {/* Search Box */}
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <VStack spacing={4}>
              <Heading size="md" alignSelf="flex-start">
                Search
              </Heading>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search by address, transaction hash, or token ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              <HStack width="100%">
                <Button
                  colorScheme="brand"
                  width={{ base: "100%", md: "auto" }}
                >
                  Search
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Recent Transactions */}
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Heading size="md" mb={4}>
              Recent Transactions
            </Heading>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Tx Hash</Th>
                    <Th>Block</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((tx) => (
                    <Tr key={tx.hash}>
                      <Td>
                        <HStack>
                          <Text>{formatAddress(tx.hash, 6)}</Text>
                          <Link
                            href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                            isExternal
                          >
                            <FiExternalLink />
                          </Link>
                        </HStack>
                      </Td>
                      <Td>{tx.blockNumber}</Td>
                      <Td>{formatAddress(tx.from)}</Td>
                      <Td>{formatAddress(tx.to)}</Td>
                      <Td isNumeric>{formatToken(tx.value)}</Td>
                      <Td>{getFormattedDate(tx.timestamp)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            {transactions.length === 0 && (
              <Alert status="info" mt={4}>
                <AlertIcon />
                No transactions found
              </Alert>
            )}
          </Box>

          {/* Top Token Holders */}
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Heading size="md" mb={4}>
              Top Token Holders
            </Heading>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Address</Th>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Percentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {holders.map((holder, index) => (
                    <Tr key={holder.address}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <HStack>
                          <Avatar size="xs" bg="brand.500" />
                          <Text>{formatAddress(holder.address)}</Text>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${holder.address}`}
                            isExternal
                          >
                            <FiExternalLink />
                          </Link>
                        </HStack>
                      </Td>
                      <Td isNumeric>
                        {formatWithCommas(
                          parseFloat(ethers.formatUnits(holder.balance, 18))
                        )}
                      </Td>
                      <Td isNumeric>{holder.percentage}%</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            {holders.length === 0 && (
              <Alert status="info" mt={4}>
                <AlertIcon />
                No holders found
              </Alert>
            )}
          </Box>

          {/* Contract Info */}
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Heading size="md" mb={4}>
              Contract Information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontWeight="bold">Contract Address:</Text>
                <HStack mt={1}>
                  <Text fontSize="sm">
                    0x5dbB770Daa57c7f345E1e55024F0f06247f89682
                  </Text>
                  <Link
                    href="https://sepolia.etherscan.io/address/0x5dbB770Daa57c7f345E1e55024F0f06247f89682"
                    isExternal
                  >
                    <FiExternalLink />
                  </Link>
                </HStack>

                <Text fontWeight="bold" mt={4}>
                  Token Name:
                </Text>
                <Text mt={1}>Gym Token</Text>

                <Text fontWeight="bold" mt={4}>
                  Symbol:
                </Text>
                <Text mt={1}>GYM</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Decimals:</Text>
                <Text mt={1}>18</Text>

                <Text fontWeight="bold" mt={4}>
                  Total Supply:
                </Text>
                <Text mt={1}>
                  {formatWithCommas(parseFloat(totalSupply))} GYM
                </Text>

                <Text fontWeight="bold" mt={4}>
                  Network:
                </Text>
                <Badge colorScheme="blue" mt={1}>
                  Sepolia Testnet
                </Badge>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      )}
    </Container>
  );
};

export default TokenExplorer;
