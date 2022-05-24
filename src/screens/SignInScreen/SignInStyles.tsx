import { StyleSheet } from "react-native";

const SignInStyles = StyleSheet.create({
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
    width: "90%",
    maxWidth: 380,
    maxHeight: 240,
  },
  title: {
    fontSize: 30,
    // lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 1,

    color: "#3A59F9",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 12,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  createone: {
    marginTop: 10,
    color: "black",
    letterSpacing: 1,
  },
  registertext: {
    color: "#3A59F9",
    fontWeight: "bold",
    fontSize: 18,
  },
  loadingText: {
    alignContent: "center",
    fontSize: 27,
    // lineHeight: 27,
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

export default SignInStyles;
