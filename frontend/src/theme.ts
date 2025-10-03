import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Custom colors
const colors = {
  brand: {
    50: "#e6fffa",
    100: "#b3f5e6",
    200: "#80ecd2",
    300: "#4de3be",
    400: "#1adaa9",
    500: "#00c38d", // Primary brand color
    600: "#00a173",
    700: "#00805a",
    800: "#005e40",
    900: "#003d27",
  },
  // Add custom gradient colors
  gradients: {
    primary: "linear-gradient(45deg, #00c38d 0%, #45c9ff 100%)",
    secondary: "linear-gradient(45deg, #3a3a3a 0%, #1e1e1e 100%)",
  },
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
      borderRadius: "lg",
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
      },
      gradient: {
        bgGradient: "linear(to-r, brand.500, blue.500)",
        color: "white",
        _hover: {
          bgGradient: "linear(to-r, brand.600, blue.600)",
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "bold",
      letterSpacing: "tight",
    },
  },
  Card: {
    baseStyle: {
      p: "6",
      bg: "gray.800",
      borderRadius: "xl",
      boxShadow: "xl",
    },
  },
};

// Font configuration
const fonts = {
  heading: '"Montserrat", sans-serif',
  body: '"Montserrat", sans-serif',
};

// Global styles
const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      color: props.colorMode === "dark" ? "gray.50" : "gray.900",
    },
  }),
};

// Extend the theme
const theme = extendTheme({
  config,
  colors,
  components,
  fonts,
  styles,
});

export default theme;
