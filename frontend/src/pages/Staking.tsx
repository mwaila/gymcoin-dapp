import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  HStack,
  Divider,
  useToast,
  FormHelperText,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  useColorModeValue,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { FiLock, FiUnlock, FiPercent, FiClock } from "react-icons/fi";
import { useWeb3 } from "../contexts/Web3Context";
import StatCard from "../components/StatCard";
import { formatAddress, formatWithCommas } from "../utils/formatters";
import { ethers } from "ethers";

// Note: In a real implementation, we would need a staking contract ABI and address
// This is a mock implementation for UI demonstration purposes

const Staking: React.FC = () => {
  const { account, tokenContract } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [rewards, setRewards] = useState<string>("0");
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [apr, setApr] = useState<number>(12); // Mock APR percentage
  const [totalStaked, setTotalStaked] = useState<string>("1000000");
  const [stakingPeriod, setStakingPeriod] = useState<number>(30); // Days

  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchBalances = async () => {
      if (tokenContract && account) {
        try {
          const tokenBalance = await tokenContract.balanceOf(account);
          setBalance(ethers.formatUnits(tokenBalance, 18));

          // In a real implementation, we would get this data from a staking contract
          // Mocking some values for demonstration
          setStakedAmount("5000");
          setRewards("250");
        } catch (error) {
          console.error("Error fetching balances:", error);
          toast({
            title: "Error fetching data",
            description:
              "Could not load your token balance and staking information.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchBalances();
    // Simulate rewards accruing over time
    const interval = setInterval(() => {
      setRewards((prev) => {
        const current = parseFloat(prev);
        return (current + 0.01).toFixed(2);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [tokenContract, account, toast]);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseFloat(stakeAmount) > parseFloat(balance)) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough tokens to stake this amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, we would call the staking contract
      // This is a mock implementation for UI demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate blockchain delay

      // Update UI state to simulate successful staking
      setStakedAmount((prev) => {
        const newAmount = (
          parseFloat(prev) + parseFloat(stakeAmount)
        ).toString();
        return newAmount;
      });

      setBalance((prev) => {
        const newBalance = (
          parseFloat(prev) - parseFloat(stakeAmount)
        ).toString();
        return newBalance;
      });

      setStakeAmount("");

      toast({
        title: "Staking successful",
        description: `You have staked ${stakeAmount} GYM tokens.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error staking tokens:", error);
      toast({
        title: "Staking failed",
        description:
          "There was an error staking your tokens. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to unstake.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseFloat(unstakeAmount) > parseFloat(stakedAmount)) {
      toast({
        title: "Insufficient staked amount",
        description:
          "You do not have enough staked tokens to unstake this amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, we would call the staking contract
      // This is a mock implementation for UI demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate blockchain delay

      // Update UI state to simulate successful unstaking
      setStakedAmount((prev) => {
        const newAmount = (
          parseFloat(prev) - parseFloat(unstakeAmount)
        ).toString();
        return newAmount;
      });

      setBalance((prev) => {
        const newBalance = (
          parseFloat(prev) + parseFloat(unstakeAmount)
        ).toString();
        return newBalance;
      });

      setUnstakeAmount("");

      toast({
        title: "Unstaking successful",
        description: `You have unstaked ${unstakeAmount} GYM tokens.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error unstaking tokens:", error);
      toast({
        title: "Unstaking failed",
        description:
          "There was an error unstaking your tokens. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    setIsLoading(true);

    try {
      // In a real implementation, we would call the staking contract
      // This is a mock implementation for UI demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate blockchain delay

      // Update UI state to simulate successful claiming
      setBalance((prev) => {
        const newBalance = (parseFloat(prev) + parseFloat(rewards)).toString();
        return newBalance;
      });

      setRewards("0");

      toast({
        title: "Rewards claimed",
        description: `You have claimed ${rewards} GYM tokens.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error claiming rewards:", error);
      toast({
        title: "Claiming failed",
        description:
          "There was an error claiming your rewards. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxStake = () => {
    setStakeAmount(balance);
  };

  const handleMaxUnstake = () => {
    setUnstakeAmount(stakedAmount);
  };

  // Calculate the percentage of total staked by the user
  const userStakedPercentage =
    parseFloat(stakedAmount) > 0
      ? (parseFloat(stakedAmount) / parseFloat(totalStaked)) * 100
      : 0;

  // Calculate estimated daily rewards
  const dailyRewards = parseFloat(stakedAmount) * (apr / 100 / 365);

  // For demonstration, simulate a dynamic APR that changes slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setApr((prev) => {
        const change = Math.random() * 0.4 - 0.2; // Random fluctuation between -0.2 and +0.2
        return Math.max(8, Math.min(16, prev + change)); // Keep APR between 8% and 16%
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading mb={2}>GYM Token Staking</Heading>
        <Text color="gray.500">Stake your GYM tokens to earn rewards</Text>
      </Box>

      {/* Staking Overview Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Your Balance"
          stat={`${formatWithCommas(parseFloat(balance))} GYM`}
          icon={FiLock}
        />
        <StatCard
          title="Total Staked"
          stat={`${formatWithCommas(parseFloat(stakedAmount))} GYM`}
          icon={FiUnlock}
        />
        <StatCard title="APR" stat={`${apr.toFixed(2)}%`} icon={FiPercent} />
        <StatCard
          title="Staking Period"
          stat={`${stakingPeriod} Days`}
          icon={FiClock}
        />
      </SimpleGrid>

      {/* Staking Tabs */}
      <Box
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="sm"
        mb={8}
      >
        <Tabs isFitted colorScheme="brand">
          <TabList>
            <Tab>Stake</Tab>
            <Tab>Unstake</Tab>
            <Tab>Rewards</Tab>
          </TabList>

          <TabPanels>
            {/* Stake Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  Stake your GYM tokens to earn {apr.toFixed(2)}% APR
                </Alert>

                <FormControl>
                  <FormLabel>Amount to Stake</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                    <InputRightAddon
                      children="MAX"
                      cursor="pointer"
                      onClick={handleMaxStake}
                    />
                  </InputGroup>
                  <FormHelperText>
                    Available: {formatWithCommas(parseFloat(balance))} GYM
                  </FormHelperText>
                </FormControl>

                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Estimated Daily Rewards:
                  </Text>
                  <Text>{dailyRewards.toFixed(4)} GYM per day</Text>
                </Box>

                <Button
                  colorScheme="brand"
                  size="lg"
                  onClick={handleStake}
                  isLoading={isLoading}
                  loadingText="Staking..."
                  isDisabled={
                    !stakeAmount ||
                    parseFloat(stakeAmount) <= 0 ||
                    parseFloat(stakeAmount) > parseFloat(balance)
                  }
                >
                  Stake Tokens
                </Button>
              </VStack>
            </TabPanel>

            {/* Unstake Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  Unstake your GYM tokens anytime without penalties
                </Alert>

                <FormControl>
                  <FormLabel>Amount to Unstake</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                    <InputRightAddon
                      children="MAX"
                      cursor="pointer"
                      onClick={handleMaxUnstake}
                    />
                  </InputGroup>
                  <FormHelperText>
                    Staked: {formatWithCommas(parseFloat(stakedAmount))} GYM
                  </FormHelperText>
                </FormControl>

                <Button
                  colorScheme="brand"
                  size="lg"
                  onClick={handleUnstake}
                  isLoading={isLoading}
                  loadingText="Unstaking..."
                  isDisabled={
                    !unstakeAmount ||
                    parseFloat(unstakeAmount) <= 0 ||
                    parseFloat(unstakeAmount) > parseFloat(stakedAmount)
                  }
                >
                  Unstake Tokens
                </Button>
              </VStack>
            </TabPanel>

            {/* Rewards Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                >
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Your Rewards</Heading>
                    <Stat>
                      <StatLabel>Available to claim</StatLabel>
                      <StatNumber>
                        {formatWithCommas(parseFloat(rewards))} GYM
                      </StatNumber>
                      <StatHelpText>
                        Approximately ${(parseFloat(rewards) * 0.1).toFixed(2)}{" "}
                        USD
                      </StatHelpText>
                    </Stat>

                    <Button
                      colorScheme="brand"
                      onClick={handleClaimRewards}
                      isLoading={isLoading}
                      loadingText="Claiming..."
                      isDisabled={parseFloat(rewards) <= 0}
                    >
                      Claim Rewards
                    </Button>
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Reward Rate
                  </Text>
                  <Text>
                    {(apr / 365).toFixed(4)}% daily ({apr.toFixed(2)}% APR)
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Next reward calculation:
                  </Text>
                  <Text>
                    Rewards are calculated and distributed continuously
                  </Text>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Staking Stats */}
      <Box
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="sm"
        p={6}
      >
        <Heading size="md" mb={4}>
          Staking Statistics
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Total Value Staked
            </Text>
            <Text fontSize="xl">
              {formatWithCommas(parseFloat(totalStaked))} GYM
            </Text>
            <Text fontSize="sm" color="gray.500">
              Approximately ${(parseFloat(totalStaked) * 0.1).toFixed(2)} USD
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2}>
              Your Share
            </Text>
            <Text fontSize="xl">{userStakedPercentage.toFixed(4)}%</Text>
            <Progress
              value={userStakedPercentage}
              size="sm"
              colorScheme="brand"
              mt={2}
              borderRadius="full"
            />
          </Box>
        </SimpleGrid>

        <Divider my={6} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Total Rewards Distributed
            </Text>
            <Text fontSize="xl">75,000 GYM</Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2}>
              Your Total Earned
            </Text>
            <Text fontSize="xl">
              {(parseFloat(rewards) + 500).toFixed(2)} GYM
            </Text>
            <Text fontSize="sm" color="gray.500">
              Lifetime rewards earned
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Staking;
