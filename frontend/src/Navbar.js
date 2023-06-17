import React from 'react';
import { Flex, Box, Spacer, IconButton, useColorMode, Link } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center" p={4} bg="blue.500" color="white" fontFamily="sans-serif">
      <Box fontSize="xl" fontWeight="bold">FocusHacker</Box>
      <Box ml={4}>
        <Link href="#" mr={4}>Analysis</Link>
        <Link href="#">About</Link>
      </Box>
      <Spacer />
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        aria-label="Toggle theme"
        variant="ghost"
        color={colorMode === "light" ? "gray.800" : "white"} // Adjusted color based on colorMode
      />
    </Flex>
  );
};

export default NavBar;
