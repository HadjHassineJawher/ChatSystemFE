import { StyleSheet } from "react-native";

const ChatRoomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 38,
    marginRight: 15,
  },
  groupChatImage: {
    width: 44,
    height: 44,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  chatImage: {
    width: 44,
    height: 44,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    left: 30,
    top: 30,
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
  badgeContainer: {
    backgroundColor: "#3A59F9",
    width: 20,
    height: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    left: 50,
    top: 15,
  },
  badgeText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  time: {
    marginRight: 10,
    fontSize: 12,
  },
});

export default ChatRoomStyles;
