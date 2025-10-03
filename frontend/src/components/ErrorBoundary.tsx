import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  Code,
} from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.md" py={10}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="auto"
            borderRadius="md"
            p={6}
            mb={6}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops! Something went wrong
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We're sorry for the inconvenience. Please try refreshing the page.
            </AlertDescription>
          </Alert>

          <VStack spacing={4} align="stretch">
            {this.state.error && (
              <Box bg="gray.50" p={4} borderRadius="md" fontSize="sm">
                <Text fontWeight="bold" mb={2}>
                  Error details:
                </Text>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  p={3}
                  borderRadius="md"
                >
                  {this.state.error.toString()}
                </Code>
              </Box>
            )}

            <Box textAlign="center" mt={4}>
              <Button onClick={this.handleReload} colorScheme="brand" mr={4}>
                Reload Page
              </Button>
              <Button onClick={this.handleGoHome} variant="outline">
                Go to Home
              </Button>
            </Box>

            <Text fontSize="sm" textAlign="center" mt={4}>
              If the problem persists, try installing{" "}
              <Link
                href="https://metamask.io/download/"
                isExternal
                color="blue.500"
              >
                MetaMask
              </Link>{" "}
              or contact our support team.
            </Text>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
