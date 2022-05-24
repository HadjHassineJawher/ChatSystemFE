import { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import MessageStyles from "./MessageStyles";
import * as SecureStore from "expo-secure-store";

const Message = ({ message, time, sender, senderImage }) => {
  const [isMe, setIsMe] = useState("");

  const getUserId = async (key: any) => {
    try {
      var id = await SecureStore.getItemAsync(key);
      setIsMe(id);
    } catch (error) {
      console.log("Error Retriving User Id " + error);
    }
  };

  useEffect(() => {
    getUserId("userId");
  }, []);
  getUserId("userId");

  const [showTime, setShowtime] = useState(false);
  var yes;

  if (sender === isMe) {
    yes = true;
  }

  const grey = "lightgrey";
  const blue = "#3A59F9";

  const DisplayTime = () => {
    if (!showTime) {
      setShowtime(true);
    } else {
      setShowtime(false);
    }
  };

  return (
    <>
      {showTime && (
        <Text
          style={[
            { color: "black" },
            {
              marginLeft: yes ? "auto" : 10,
              marginRight: yes ? 10 : "auto",
              fontSize: 10,
              top: -2,
            },
          ]}
        >
          Time : {time}
        </Text>
      )}
      <Image
        style={{
          width: 20,
          height: 20,
          borderRadius: 20,
          marginLeft: yes ? "auto" : 10,
          marginRight: yes ? 10 : "auto",
        }}
        source={{
          uri: `${senderImage}`,
        }}
      />
      <Pressable onPress={DisplayTime}>
        <View>
          <View
            style={[
              MessageStyles.container,
              {
                flexDirection: "row",
                backgroundColor: yes ? blue : grey,
                marginLeft: yes ? "auto" : 10,
                marginRight: yes ? 10 : "auto",
              },
            ]}
          >
            <Text style={{ color: yes ? "white" : "black" }}>{message}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};
export default Message;
