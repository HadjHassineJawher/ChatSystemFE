import { StyleSheet } from "react-native";

const HomeScreenStyles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  loadingText: {
    alignContent: "center",
    fontSize: 27,
    lineHeight: 27,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#3A59F9",
    marginBottom: 20,
  },
  loadingsmallText: {
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 25,
    color: "black",
    letterSpacing: 1,
  },
  root: {
    height: "100%",
    padding: 25,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreenStyles;
