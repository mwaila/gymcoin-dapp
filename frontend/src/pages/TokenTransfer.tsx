import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  useToast,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightElement,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useWeb3 } from "../contexts/Web3Context";
import { isValidAddress } from "../utils/formatters";
import { ethers } from "ethers";

const TokenTransfer: React.FC = () => {
  const { account, tokenContract, tokenBalance, isConnected, connectWallet } =
    useWeb3();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  const toast = useToast();

  // Form validation
  const [recipientError, setRecipientError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate recipient address
    if (!recipient) {
      setRecipientError("Recipient address is required");
      isValid = false;
    } else if (!isValidAddress(recipient)) {
      setRecipientError("Please enter a valid Ethereum address");
      isValid = false;
    } else {
      setRecipientError("");
    }

    // Validate amount
    if (!amount) {
      setAmountError("Amount is required");
      isValid = false;
    } else {
      const amountValue = parseFloat(amount);
      const balanceValue = parseFloat(tokenBalance);

      if (isNaN(amountValue) || amountValue <= 0) {
        setAmountError("Please enter a valid amount");
        isValid = false;
      } else if (amountValue > balanceValue) {
        setAmountError("Insufficient balance");
        isValid = false;
      } else {
        setAmountError("");
      }
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!tokenContract) {
      toast({
        title: "Contract not loaded",
        description: "Please try connecting your wallet again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setTxHash("");

    try {
      // Convert amount to wei (considering 18 decimals)
      const amountInWei = ethers.parseUnits(amount, 18);

      // Send the transaction
      const tx = await tokenContract.transfer(recipient, amountInWei);

      toast({
        title: "Transaction submitted",
        description: "Your transfer is being processed.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      setTxHash(receipt.hash);

      toast({
        title: "Transfer successful",
        description: `Successfully transferred ${amount} GYM tokens.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setAmount("");
      setRecipient("");
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast({
        title: "Transfer failed",
        description: error.message || "An error occurred during the transfer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxAmount = () => {
    setAmount(tokenBalance);
  };

  // Background and border colors based on color mode
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!isConnected) {
    return (
      <Container maxW="container.md" py={8}>
        <Box
          p={8}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          textAlign="center"
        >
          <Heading mb={4}>Connect Your Wallet</Heading>
          <Text mb={6}>Please connect your wallet to transfer GYM tokens.</Text>
          <Button colorScheme="brand" size="lg" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>
            Transfer GYM Tokens
          </Heading>
          <Text color="gray.500">
            Send GYM tokens to another wallet address.
          </Text>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="sm"
        >
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            {/* Balance info */}
            <HStack width="100%" justifyContent="space-between">
              <Text>Your Balance:</Text>
              <Text fontWeight="bold">
                {parseFloat(tokenBalance).toFixed(2)} GYM
              </Text>
            </HStack>

            <Divider />

            {/* Recipient address input */}
            <FormControl isInvalid={!!recipientError}>
              <FormLabel>Recipient Address</FormLabel>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                isDisabled={isLoading}
              />
              <FormErrorMessage>{recipientError}</FormErrorMessage>
            </FormControl>

            {/* Amount input */}
            <FormControl isInvalid={!!amountError}>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <NumberInput
                  min={0}
                  max={parseFloat(tokenBalance)}
                  value={amount}
                  onChange={(valueString) => setAmount(valueString)}
                  width="100%"
                >
                  <NumberInputField placeholder="0.0" disabled={isLoading} />
                </NumberInput>
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleMaxAmount}
                    isDisabled={isLoading}
                  >
                    Max
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{amountError}</FormErrorMessage>
            </FormControl>

            {/* Submit button */}
            <Button
              colorScheme="brand"
              size="lg"
              width="100%"
              type="submit"
              isLoading={isLoading}
              loadingText="Processing..."
              mt={4}
            >
              Transfer Tokens
            </Button>
          </VStack>
        </Box>

        {/* Transaction result */}
        {txHash && (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="xl"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Transfer Successful!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              <Text mb={2}>
                Your transaction has been confirmed on the blockchain.
              </Text>
              <Button
                as="a"
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="outline"
              >
                View on Etherscan
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Network notice */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <AlertDescription>
            Currently operating on Sepolia testnet. Make sure your wallet is
            connected to Sepolia.
          </AlertDescription>
        </Alert>
      </VStack>
    </Container>
  );
};

export default TokenTransfer;
