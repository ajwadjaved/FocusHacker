import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  colors: {
    primary: "#FF0000",
    secondary: "#00FF00",
  },
  components: {
    Heading: {
      baseStyle: {
        color: "primary",
      },
    },
    UnorderedList: {
      baseStyle: {
        spacing: 4,
      },
    },
    ListItem: {
      baseStyle: {
        paddingY: 2,
        paddingLeft: 4,
        borderRadius: "md",
        backgroundColor: "secondary",
        color: "white",
      },
    },
  },
});

const CompletedEntries = ({ entries }) => {
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
          <UnorderedList>
            {entries.map((entry, index) => (
              <ListItem key={index}>
                <Text>{entry}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Text>No completed entries yet.</Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default CompletedEntries;