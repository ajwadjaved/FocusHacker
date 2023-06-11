import { chakra } from "@chakra-ui/react";

const DialogBoxStyles = {
  dialogContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
  },
  dialogBox: {
    width: "500px",
    flexDirection: "column",
    padding: 4,
    borderRadius: "md",
    boxShadow: "md",
  },
  dialogInput: {
    width: "400px",
    marginBottom: 1,
  },
  dialogButton: {
    alignSelf: "flex-end",
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
