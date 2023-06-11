import React from "react";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  ChakraProvider,
  extendTheme
} from "@chakra-ui/react";

const theme = extendTheme({
  // Theme configuration
});

const CompletedEntries = ({ entries }) => { // Remove totalTime since it's no longer needed
  return (
    <ChakraProvider theme={theme}>
      <Box
        width="40%"
        margin="0 auto"
        border="1px solid black"
        borderRadius="md"
        p={4}
        mt={4}
      >
        <Heading as="h2" size="md" mb={4}>
          Completed Entries
        </Heading>
        {entries.length > 0 ? (
          <>
            <UnorderedList styleType="none">
              {entries.map((entry, index) => (
                <ListItem
                  key={index}
                  _hover={{
                    background: "rgba(0, 0, 0, 0.1)",
                    cursor: "pointer"
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Text>{entry.entry}</Text> {/* Access the entry property */}
                    <Text marginLeft="8px">Time Worked: {entry.time}</Text> {/* Access the time property */}
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </>
        ) : (
          <Text>No completed entries yet.</Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default CompletedEntries;
