import { StyleSheet } from "react-native";

const UsersStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 38,
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",

    fontSize: 16,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },

  rightContainer: {
    flex: 1,
    justifyContent: "center",
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
    left: 48,
    bottom: 16,
  },
  disconnectedbadge: {
    backgroundColor: "#F44336",
    width: 16,
    height: 16,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    left: 48,
    bottom: 16,
  },
});

export default UsersStyles;
