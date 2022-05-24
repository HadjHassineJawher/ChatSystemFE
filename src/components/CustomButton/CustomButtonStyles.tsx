import { StyleSheet } from "react-native";

const CustomButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: "#3A59F9",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  container_PRIMARY: {
    backgroundColor: "#3A59F9",
  },
  container_TERTIARY: {
    backgroundColor: "#FFFFFF",
  },
  text_TERTIARY: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CustomButtonStyles;
