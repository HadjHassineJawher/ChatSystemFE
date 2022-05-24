import { StyleSheet } from "react-native";

const UsersScreenStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 9,
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    borderRadius: 25,
    borderColor: "#dedede",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 1,
  },
  icon: {
    marginHorizontal: 13,
  },
});

export default UsersScreenStyles;
