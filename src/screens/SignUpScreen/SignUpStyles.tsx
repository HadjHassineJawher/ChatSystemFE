import { StyleSheet } from "react-native";

const SignUpStyles = StyleSheet.create({
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
    maxWidth: 320,
    maxHeight: 200,
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
  smalltext: {
    color: "#3A59F9",
  },
  smallNormaltext: {
    marginTop: 15,
    textAlign: "center",
    color: "black",
    width: 290,
  },
  backarrowContainer: {
    marginTop: 21,
  },
  backArrow: {
    margin: 13,
    left: 12,
    alignItems: "center",
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
  inputBorder: {
    borderWidth: 1,
    margin: 3,
    borderRadius: 5,
    backgroundColor: "white",
    width: "33.33%",
    lineHeight: 27,
    marginVertical: 5,
  },
});

export default SignUpStyles;
