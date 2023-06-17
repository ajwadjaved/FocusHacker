import { chakra } from "@chakra-ui/react";

const DialogBoxStyles = {
  dialogContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
  },
  dialogBox: {
    width: "720px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "md",
    // backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogInput: {
    width: "500px",
    marginBottom: 1,
  },
  tagInput: {
    width: "120px",
    marginBottom: 1,
  },
  dialogButton: {
    alignSelf: "flex-end",
    rounded: "md", // Rounded corners
    px: "3", // Horizontal padding
    py: "0", // Vertical padding
    fontSize: "md", // Font size
    fontWeight: "bold", // Font weight
    // _hover: {
      // // Hover styles
      // backgroundColor: "bglue.100",
  },
  timer: {
    fontFamily: "monospace",
    fontSize: "1.0rem",
    fontWeight: "bold",
    color: "black",
    padding: "0.5rem",
    borderRadius: "4px",
    backgroundColor: "blue.400",
    display: "inline-block",
    minWidth: "6rem",
    textAlign: "center",
    boxShadow: "md",
  },
};

export default DialogBoxStyles;
