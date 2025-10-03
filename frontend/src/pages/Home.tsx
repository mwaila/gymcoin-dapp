import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  Image,
  SimpleGrid,
  HStack,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { FiTarget, FiGlobe, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../contexts/Web3Context";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected } = useWeb3();

  const handleGetStarted = () => {
    if (isConnected) {
      navigate("/dashboard");
    } else {
      connectWallet();
    }
  };

  const handleInstallWallet = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const featureBg = useColorModeValue("white", "gray.800");

  return (
    <Box>
      {/* MetaMask Alert */}
      {!window.ethereum && (
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={6}
          mb={6}
          borderRadius="lg"
        >
          <AlertIcon boxSize={8} />
          <AlertTitle mt={4} mb={2} fontSize="lg">
            No Ethereum Wallet Detected
          </AlertTitle>
          <AlertDescription maxW="md">
            To interact with GymToken, you'll need a Web3 wallet like MetaMask.
            <Box mt={4}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleInstallWallet}
                mb={2}
              >
                Install MetaMask
              </Button>
            </Box>
            <Text fontSize="sm" mt={2}>
              You can still explore the app in read-only mode.
              <Link
                color="blue.500"
                href="https://ethereum.org/wallets/"
                isExternal
                ml={1}
              >
                Learn more about wallets
              </Link>
            </Text>
          </AlertDescription>
        </Alert>
      )}

      {/* Hero Section */}
      <Container maxW={"3xl"} minH="70vh" display="flex" alignItems="center">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 18 }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
          >
            Powering the fitness <br />
            <Text as={"span"} color={"brand.500"}>
              ecosystem of tomorrow
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "lg", md: "xl" }}>
            GymToken (GYM) is a fitness-focused cryptocurrency designed to
            reward physical activity, incentivize healthy habits, and transform
            how we interact with fitness services.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"brand"}
              bg={"brand.500"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "brand.600",
              }}
              size="lg"
              onClick={handleGetStarted}
            >
              {isConnected ? "Go to Dashboard" : "Connect Wallet"}
            </Button>
            <Button
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
              onClick={() => navigate("/explorer")}
            >
              Explore Token
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
                transform={"rotate(10deg)"}
                display={{ base: "none", md: "inline-flex" }}
              />
              <Text
                fontSize={"sm"}
                position={"absolute"}
                right={"-100px"}
                top={"-12px"}
                transform={"rotate(10deg)"}
                display={{ base: "none", md: "inline-flex" }}
              >
                Start in seconds
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Features Section */}
      <Box bg={bgColor} py={16}>
        <Container maxW={"6xl"}>
          <Heading textAlign="center" mb={10}>
            Key Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FiTarget} w={10} h={10} />}
              title={"Fitness Rewards"}
              text={
                "Earn GYM tokens by completing workouts, achieving goals, and maintaining healthy habits."
              }
            />
            <Feature
              icon={<Icon as={FiGlobe} w={10} h={10} />}
              title={"Global Ecosystem"}
              text={
                "Use GYM tokens at participating gyms, fitness apps, and health-focused merchants worldwide."
              }
            />
            <Feature
              icon={<Icon as={FiLock} w={10} h={10} />}
              title={"Secure Blockchain"}
              text={
                "Built on Ethereum with strong security standards and fully audited smart contracts."
              }
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Token Stats Section */}
      <Box py={16}>
        <Container maxW={"5xl"}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 8, md: 12 }}
            alignItems="center"
          >
            <Box flex={1}>
              <Heading mb={4}>GymToken Stats</Heading>
              <Text fontSize="lg" mb={6}>
                GYM is a fixed-supply token with a maximum of 1 billion tokens.
                Currently deployed on the Sepolia testnet, with plans for
                mainnet launch in Q4 2025.
              </Text>

              <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between">
                  <Text fontWeight="medium">Token Name:</Text>
                  <Text>Gym Token</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontWeight="medium">Symbol:</Text>
                  <Text>GYM</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontWeight="medium">Total Supply:</Text>
                  <Text>1,000,000,000 GYM</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontWeight="medium">Decimals:</Text>
                  <Text>18</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontWeight="medium">Network:</Text>
                  <Text>Sepolia Testnet</Text>
                </HStack>
              </VStack>

              <Button
                mt={8}
                size="md"
                variant="outline"
                colorScheme="brand"
                rightIcon={<Arrow width={4} color="brand.500" />}
                onClick={() => navigate("/transfer")}
              >
                Transfer Tokens
              </Button>
            </Box>

            <Box flex={1} height={{ base: "300px", md: "400px" }}>
              {/* Token visualization or chart would go here */}
              <Flex
                h="100%"
                bg={useColorModeValue("gray.100", "gray.700")}
                borderRadius="xl"
                justify="center"
                align="center"
                p={6}
              >
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  Token Visualization Placeholder
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

const Feature = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactElement;
}) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      p={8}
      boxShadow="md"
      align={"center"}
      pos={"relative"}
      _after={{
        content: '""',
        w: 4,
        h: 4,
        bg: "brand.500",
        pos: "absolute",
        bottom: -2,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
      }}
      transition="transform 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
      }}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"brand.500"}
        mb={5}
      >
        {icon}
      </Flex>
      <Heading fontSize={"xl"}>{title}</Heading>
      <Text fontSize={"md"} color={"gray.500"} textAlign="center">
        {text}
      </Text>
    </Stack>
  );
};

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Home;
