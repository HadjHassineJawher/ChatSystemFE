import { StyleSheet } from "react-native";

const MessageInputStyles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderColor: "#dedede",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  buttonContainer: {
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 35,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  sendImageContainer: {
    flexDirection: "row",
    marginVertical: 11,
    alignSelf: "stretch",
    marginLeft: "auto",
    borderRadius: 10,
  },
  sendSoundContainer: {
    marginVertical: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    maxWidth: "70%",
    padding: 8,
    marginLeft: "auto",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "lightgrey",
  },
  audioProgressBg: {
    height: 1,
    flex: 1,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    margin: 10,
  },
  audioProgressFg: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#3A59F9",
    position: "absolute",
    top: -3.5,
  },
});

export default MessageInputStyles;
