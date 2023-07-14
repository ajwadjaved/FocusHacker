import React, { useState } from 'react';
import {
  Flex,
  Box,
  Spacer,
  IconButton,
  useColorMode,
  Link,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { signIn } from "./api";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    setShowEmailInput(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    try {
      setIsLoading(true);
      await signIn(email);
      setIsLoading(false);
      // Perform any additional logic or UI updates after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Error signing in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Flex alignItems="center" p={4} bg="blue.700" color="white" fontFamily="sans-serif">
      <Box fontSize="xl" fontWeight="bold">FocusHacker</Box>
      <Box ml={4}>
        <Link href="#" mr={4}>Analysis</Link>
        <Link href="#">About</Link>
      </Box>
      <Spacer />

      {showEmailInput ? (
        <FormControl id="email" isInvalid={error}>
          <Flex alignItems="center">
          <Box ml="auto" maxWidth="200px"> {/* Add the maxWidth property to limit the width */}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            isDisabled={isLoading}
            width="100%" // Adjust the width to fill the available space
          />
        </Box>
            <Button
              colorScheme="purple"
              onClick={handleEmailSubmit}
              isLoading={isLoading}
              ml={2}
            >
              OK
            </Button>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </Flex>
        </FormControl>
      ) : (
        <Button colorScheme="purple" onClick={handleSignIn}>
          Sign In
        </Button>
      )}

      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        aria-label="Toggle theme"
        variant="ghost"
        color={colorMode === "light" ? "yellow: 0" : "white"}
      />
    </Flex>
  );
};

export default NavBar;
