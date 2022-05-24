import { StyleSheet } from "react-native";

const ConnectedUsersStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 38,
  },
  connectedbadge: {
    backgroundColor: "#4CAF50",
    width: 16,
    height: 16,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    left: 50,
    bottom: 16,
  },
  disconnectedbadge: {
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    left: 50,
    bottom: 16,
  },
});

export default ConnectedUsersStyles;
