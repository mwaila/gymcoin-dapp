import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  Text,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useWeb3 } from "../contexts/Web3Context";
import { formatAddress, getNetworkName } from "../utils/formatters";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, isActive }) => {
  const activeBg = useColorModeValue("brand.50", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.200");

  return (
    <RouterLink to={to}>
      <Box
        px={3}
        py={2}
        rounded="md"
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? "brand.500" : undefined}
        fontWeight={isActive ? "semibold" : "medium"}
        _hover={{
          textDecoration: "none",
          bg: isActive ? activeBg : hoverBg,
        }}
      >
        {children}
      </Box>
    </RouterLink>
  );
};

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    account,
    isConnected,
    connectWallet,
    disconnectWallet,
    chainId,
    tokenBalance,
    isLoading,
  } = useWeb3();

  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transfer", path: "/transfer" },
    { name: "Explorer", path: "/explorer" },
    { name: "Staking", path: "/staking" },
  ];

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <RouterLink to="/">
              <Flex alignItems="center">
                {/* Logo would go here */}
                <Text
                  fontSize="xl"
                  fontWeight="extrabold"
                  bgGradient="linear(to-r, brand.500, blue.500)"
                  bgClip="text"
                >
                  GymToken
                </Text>
              </Flex>
            </RouterLink>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"} gap={2}>
          <IconButton
            aria-label={`Toggle ${
              colorMode === "light" ? "Dark" : "Light"
            } Mode`}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />

          {isConnected ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                rightIcon={<ChevronDownIcon />}
                borderColor="brand.500"
                size={{ base: "sm", md: "md" }}
              >
                {formatAddress(account || "")}
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text fontWeight="bold">Network:</Text>&nbsp;
                  <Text>{getNetworkName(chainId)}</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="bold">Balance:</Text>&nbsp;
                  <Text>{parseFloat(tokenBalance).toFixed(2)} GYM</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              colorScheme="brand"
              variant="solid"
              onClick={connectWallet}
              size={{ base: "sm", md: "md" }}
              isLoading={isLoading}
            >
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
