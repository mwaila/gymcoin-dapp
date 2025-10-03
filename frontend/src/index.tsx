import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import { Web3Provider } from "./contexts/Web3Context";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Web3Provider>
          <Router>
            <App />
          </Router>
        </Web3Provider>
      </ChakraProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
