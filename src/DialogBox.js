import { useState } from "react";
import { Flex, Button, Input, HStack } from "@chakra-ui/react";
import DialogBoxStyles from "./DialogBoxStyles.js"; // Import DialogBoxStyles


const DialogBox = ({ onDialogClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStartClick = () => {
    // Do something with the input value
    console.log("User input:", inputValue);
  };

  return (
    <Flex sx={DialogBoxStyles.dialogContainer}>
      <Flex sx={DialogBoxStyles.dialogBox}>
        <HStack>
          <Input sx={DialogBoxStyles.dialogInput}
            placeholder="What do you want to focus on?"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button sx={DialogBoxStyles.dialogButton} colorScheme="blue" onClick={handleStartClick}>
            Start
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default DialogBox;
