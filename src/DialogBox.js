import React, { useState, useEffect } from "react";
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStartClick = () => {
    if (isTimerRunning) {
      setIsPaused(!isPaused); // Pause or continue the timer
    } else {
      setIsTimerRunning(true); // Start the timer
      setMinutes(0); // Reset the minutes
      setSeconds(0); // Reset the seconds
      setShowTimer(true); // Show the timer
      setTotalTime(""); // Reset the total time
    }
  };
  

  const handleStopClick = () => {
    setIsTimerRunning(false); // Stop the timer
    setIsPaused(false); // Reset pause state
    onStartClick(inputValue, `${minutes}:${seconds}`); // Pass input value and total time to parent component
    setInputValue(""); // Clear input value
    setShowTimer(false); // Hide the timer
  };
  

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

  const handlePauseClick = () => {
    setIsPaused(true); // Pause the timer
  };

  const handleContinueClick = () => {
    setIsPaused(false); // Continue the timer
  };

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
                    colorScheme="blue"
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
                <Button
                  sx={DialogBoxStyles.dialogButton}
                  colorScheme="green"
                  onClick={handleStopClick}
                >
                  Complete
                </Button>
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
                <Button
                  sx={DialogBoxStyles.dialogButton}
                  colorScheme="blue"
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
