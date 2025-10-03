import React from "react";
import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  stat: string;
  icon: IconType;
  helpText?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  stat,
  icon,
  helpText,
  color = "brand.500",
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={5}
      shadow="sm"
      border="1px solid"
      borderColor={borderColor}
      bg={bgColor}
      rounded="lg"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="medium" isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize="xl" fontWeight="bold">
            {stat}
          </StatNumber>
          {helpText && <StatHelpText fontSize="small">{helpText}</StatHelpText>}
        </Box>
        <Box
          my="auto"
          color={color}
          alignContent="center"
          p={2}
          bg={`${color}10`}
          borderRadius="full"
        >
          <Icon as={icon} boxSize={6} />
        </Box>
      </Flex>
    </Stat>
  );
};

export default StatCard;
