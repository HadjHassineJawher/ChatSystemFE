import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import ChatRoomStyles from "./ChatRoomStyles";

const ChatRoom = ({ chatRoomData }) => {
  const navigation = useNavigation();

  var chatGroup;
  var singleChat;
  var user = [];
  var image = [];

  chatRoomData.Users.forEach((element) => {
    if (element.length == 2) {
      return (
        (chatGroup = element),
        element.forEach((a) => {
          user.push(a.username);
          image.push(a.image);
        })
      );
    } else {
      return (
        (singleChat = element),
        element.forEach((a) => {
          user.push(a.username);
          image.push(a.image);
        })
      );
    }
  });

  const onChatRoomPressed = () => {
    navigation.navigate("Conversation", {
      _id: chatRoomData.ChatRoom_Id,
      user: user,
      image: image,
    });
  };

  return (
    <>
      <TouchableOpacity onPress={onChatRoomPressed} activeOpacity={0.5}>
        <View style={ChatRoomStyles.container}>
          {singleChat && singleChat ? (
            <>
              <Image
                source={{
                  uri: `${singleChat[0].image}`,
                }}
                style={ChatRoomStyles.image}
              />

              <View style={ChatRoomStyles.badgeContainer}>
                <Text style={ChatRoomStyles.badgeText}>2</Text>
              </View>

              <View style={ChatRoomStyles.rightContainer}>
                <View style={ChatRoomStyles.row}>
                  <Text style={ChatRoomStyles.name}>
                    {singleChat[0].username}
                  </Text>
                  <Text style={ChatRoomStyles.time}>
                    {chatRoomData.LastMessages.time}
                  </Text>
                </View>
                <Text
                  style={ChatRoomStyles.text}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {chatRoomData.LastMessages.body}
                </Text>
              </View>
            </>
          ) : (
            chatGroup && (
              <>
                <Image
                  source={{
                    uri: `${chatGroup[0].image}`,
                  }}
                  style={ChatRoomStyles.groupChatImage}
                />
                <Image
                  source={{
                    uri: `${chatGroup[1].image}`,
                  }}
                  style={ChatRoomStyles.chatImage}
                />

                <View style={ChatRoomStyles.badgeContainer}>
                  <Text style={ChatRoomStyles.badgeText}>3</Text>
                </View>
                <View style={ChatRoomStyles.rightContainer}>
                  <View style={ChatRoomStyles.row}>
                    <Text style={ChatRoomStyles.name}>
                      {chatGroup.map((e) => {
                        return (
                          <>
                            <Text key={e._id}>
                              {e.username.length > 15
                                ? e.username.substring(0, 15 - 3) + " ..."
                                : e.username + ", "}
                            </Text>
                          </>
                        );
                      })}
                    </Text>
                    <Text style={ChatRoomStyles.time}>
                      {chatRoomData.LastMessages.time}
                    </Text>
                  </View>
                  <Text
                    style={ChatRoomStyles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {chatRoomData.LastMessages.body}
                  </Text>
                </View>
              </>
            )
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
export default ChatRoom;
