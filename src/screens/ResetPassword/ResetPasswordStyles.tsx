import { StyleSheet } from "react-native";

const ResetPasswordStyles = StyleSheet.create({
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
  logo: {
    width: "84%",
    maxWidth: 350,
    maxHeight: 220,
  },
  title: {
    fontSize: 35,
    lineHeight: 40,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    letterSpacing: 1,
    color: "#3A59F9",
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
});

export default ResetPasswordStyles;
