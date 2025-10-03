import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TokenTransfer from "./pages/TokenTransfer";
import TokenExplorer from "./pages/TokenExplorer";
import Staking from "./pages/Staking";

const App: React.FC = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />

      <Box flex="1" py={{ base: 4, md: 8 }} px={{ base: 4, md: 6, lg: 8 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<TokenTransfer />} />
          <Route path="/explorer" element={<TokenExplorer />} />
          <Route path="/staking" element={<Staking />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
};

export default App;
