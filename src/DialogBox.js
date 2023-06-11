import { useState } from "react";
import { Flex, Button, Input, HStack } from "@chakra-ui/react";
import dialogBoxStyles from "./DialogBoxStyles"; // Import DialogBoxStyles


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
    <Flex sx={dialogBoxStyles.dialogContainer}>
      <Flex sx={dialogBoxStyles.dialogBox}>
        <HStack>
          <Input sx={dialogBoxStyles.dialogInput}
            placeholder="What do you want to focus on?"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button sx={dialogBoxStyles.dialogButton} colorScheme="blue" onClick={handleStartClick}>
            Start
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default DialogBox;
