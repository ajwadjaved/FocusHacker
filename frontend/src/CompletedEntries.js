import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

const theme = extendTheme({
  // Theme configuration
});

const CompletedEntries = ({ entries }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        width="40%"
        margin="0 auto"
        border="2px solid black"
        borderRadius="md"
        p={2}
        mt={0}
        overflow="auto"
        maxHeight="500px"
      >
        <Heading as="h2" size="md" mb={4}>
          Work Diary
        </Heading>
        {entries.length > 0 ? (
          <Table variant="simple" colorScheme="pink" borderWidth="0px" borderRadius="md" size="sm">
            <Thead>
              <Tr>
                <Th fontSize="md">Entry</Th>
                <Th fontSize="md">Tag</Th>
                <Th fontSize="md">Description</Th>
                <Th fontSize="md">Time Worked</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.slice(0).reverse().map((entry, index) => ( //displays in reverse order for the table
                <Tr
                  key={index}
                  _hover={{
                    background: "rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                >
                  <Td fontSize="md">{entry.entry}</Td>
                  <Td fontSize="md">{entry.tag}</Td>
                  <Td fontSize="md">{entry.description || "No description"}</Td>
                  <Td fontSize="md">{entry.time}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No completed entries yet.</Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default CompletedEntries;
