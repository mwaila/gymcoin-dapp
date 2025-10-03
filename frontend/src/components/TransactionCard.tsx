import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Link,
  Badge,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  FiArrowUpRight,
  FiArrowDownLeft,
  FiExternalLink,
} from "react-icons/fi";
import { formatAddress, getTimeDifference } from "../utils/formatters";

interface TransactionCardProps {
  txHash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
  type: "incoming" | "outgoing";
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  txHash,
  from,
  to,
  amount,
  timestamp,
  type,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const timeText = getTimeDifference(timestamp);

  const isIncoming = type === "incoming";
  const transactionColor = isIncoming ? "green.500" : "blue.500";
  const TransactionIcon = isIncoming ? FiArrowDownLeft : FiArrowUpRight;

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      mb={3}
      boxShadow="sm"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Box
            p={2}
            bg={`${transactionColor}15`}
            color={transactionColor}
            borderRadius="full"
            mr={3}
          >
            <Icon as={TransactionIcon} boxSize={5} />
          </Box>

          <Box>
            <Text fontWeight="bold">
              {isIncoming ? "Received" : "Sent"} {amount} GYM
            </Text>
            <HStack spacing={1} mt={1}>
              <Text fontSize="sm" color="gray.500">
                {isIncoming ? "From" : "To"}:
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {formatAddress(isIncoming ? from : to)}
              </Text>
            </HStack>
          </Box>
        </Flex>

        <Flex direction="column" alignItems="flex-end">
          <Badge colorScheme={isIncoming ? "green" : "blue"} mb={2}>
            {isIncoming ? "IN" : "OUT"}
          </Badge>
          <HStack>
            <Text fontSize="xs" color="gray.500">
              {timeText}
            </Text>
            <Link
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              isExternal
              color="brand.500"
            >
              <Icon as={FiExternalLink} boxSize={3} />
            </Link>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TransactionCard;
