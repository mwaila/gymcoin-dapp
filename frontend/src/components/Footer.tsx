import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      borderTopWidth={1}
      borderTopColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Terms</Link>
          <Link href={"#"}>Privacy</Link>
        </Stack>
        <Text>© 2025 GymToken. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <Link href={"https://github.com"} isExternal>
            <Icon as={FaGithub} boxSize={5} />
          </Link>
          <Link href={"https://twitter.com"} isExternal>
            <Icon as={FaTwitter} boxSize={5} />
          </Link>
          <Link href={"https://discord.com"} isExternal>
            <Icon as={FaDiscord} boxSize={5} />
          </Link>
        </Stack>
      </Container>

      <Flex
        justify="center"
        py={2}
        bg={useColorModeValue("gray.100", "gray.800")}
      >
        <Text fontSize="sm">
          Deployed on Sepolia at:{" "}
          <Link
            href="https://sepolia.etherscan.io/address/0x5dbB770Daa57c7f345E1e55024F0f06247f89682"
            isExternal
            color="brand.500"
            fontWeight="medium"
          >
            0x5dbB770Daa57c7f345E1e55024F0f06247f89682
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
