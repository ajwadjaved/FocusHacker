import React, { useState, useEffect } from "react";
// import { Tooltip } from "@chakra-ui/react";

import { Flex, Button, Input, HStack, chakra } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import DialogBoxStyles from "./DialogBoxStyles.js";

const DialogBox = ({ onStartClick }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [totalTime, setTotalTime] = useState("");
  const [tagValue, setTagValue] = useState(""); // New state for tag value
  // const [showTooltip, setShowTooltip] = useState(false); // New state for tooltip

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    // Check if the entered value starts with "@"
    if (value.startsWith("@")) {
      setTagValue(value); // Update tag value
    } else {
      setTagValue(`@${value}`); // Add "@" at the start of the value
    }
  };
  
  const handleStartClick = () => {
    if (inputValue.trim() === "") {
      // setShowTooltip(true); // Set the flag to show the tooltip
      return; // If inputValue is empty, do not start the timer
    }
    
    if (isTimerRunning) {
      setIsPaused(!isPaused); // Toggle timer on
    } else {
      setIsTimerRunning(true); // Start the timer
      setMinutes(0); // Reset the minutes
      setSeconds(0); // Reset the seconds
      setShowTimer(true); // Show the timer
      setTotalTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`); // Set the total time
    }
  };
  
  const handleStopClick = () => {
    setIsTimerRunning(false); // Stop the timer
    setIsPaused(false); // Reset pause state
    const formattedTagValue = tagValue.trim() !== "" ? tagValue : "No tag"; // Format the tag value
    const totalTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // Calculate the total time
    onStartClick(inputValue, totalTime, formattedTagValue); // Pass input value, total time, and tag value to parent component
    setInputValue(""); // Clear input value
    setTagValue(""); // Clear tag value
    setShowTimer(false); // Hide the timer
  };
  
  const handlePauseClick = () => {
    setIsPaused(true); // Pause the timer
  };

  const handleContinueClick = () => {
    setIsPaused(false); // Continue the timer
  };
  
  // const handleKeyPress = (e) => {
  //   if (e.code === "Space") {
  //     if (isPaused) {
  //       handleContinueClick(); // Continue the timer
  //     } else {
  //       handlePauseClick(); // Pause the timer
  //     }
  //   }
  // };
  
  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyPress); // Add event listener for keydown
  
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress); // Clean up event listener
  //   };
  // }, [showTimer]);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && !isPaused) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning, isPaused]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
    if (minutes === 60) {
      setMinutes(0);
      setSeconds(0);
    }
  }, [minutes, seconds]);

  const timerText = isTimerRunning
    ? `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : "";

  const timerStyle = isTimerRunning ? DialogBoxStyles.timer : {};

  return (
    <Flex sx={DialogBoxStyles.dialogContainer}>
      <Flex sx={DialogBoxStyles.dialogBox}>
        <AnimatePresence>
          {showTimer ? (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HStack>
                <chakra.span sx={timerStyle}>{timerText}</chakra.span>
                {isPaused ? (
                  <Button
                    sx={DialogBoxStyles.dialogButton}
                    colorScheme="green"
                    onClick={handleContinueClick}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    sx={DialogBoxStyles.dialogButton}
                    colorScheme="red"
                    onClick={handlePauseClick}
                  >
                    Pause
                  </Button>
                )}
                {isPaused ? null : ( // Show "Complete" button only when not paused
                  <Button
                    sx={DialogBoxStyles.dialogButton}
                    colorScheme="green"
                    onClick={handleStopClick}
                  >
                    Complete
                  </Button>
                )}
              </HStack>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HStack>
                <Input
                  sx={DialogBoxStyles.dialogInput}
                  placeholder="What do you want to focus on?"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Input
                  sx={DialogBoxStyles.tagInput}
                  placeholder="@Add a tag"
                  value={tagValue}
                  onChange={handleTagChange}
                />
                <Button
                  sx={DialogBoxStyles.dialogButton}
                  colorScheme="green"
                  onClick={handleStartClick}
                >
                  {isTimerRunning ? "Stop" : "Start"}
                </Button>
                {isTimerRunning && (
                  <chakra.span sx={timerStyle}>{timerText}</chakra.span>
                )}
              </HStack>
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </Flex>
  );

  
  
}
        
export default DialogBox;