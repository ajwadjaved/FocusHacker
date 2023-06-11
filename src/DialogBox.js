import React, { useState, useEffect } from "react";
import { Flex, Button, Input, HStack } from "@chakra-ui/react";
import DialogBoxStyles from "./DialogBoxStyles.js";

const DialogBox = ({ onStartClick }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStartClick = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false); // Stop the timer
    } else {
      setIsTimerRunning(true); // Start the timer
      setTimer(0); // Reset the timer
    }
    onStartClick(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const timerText = isTimerRunning ? `Timer: ${timer} seconds` : "";

  return (
    <Flex sx={DialogBoxStyles.dialogContainer}>
      <Flex sx={DialogBoxStyles.dialogBox}>
        <HStack>
          <Input
            sx={DialogBoxStyles.dialogInput}
            placeholder="What do you want to focus on?"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            sx={DialogBoxStyles.dialogButton}
            colorScheme="blue"
            onClick={handleStartClick}
          >
            {isTimerRunning ? "Stop" : "Start"}
          </Button>
          <span>{timerText}</span>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default DialogBox;
