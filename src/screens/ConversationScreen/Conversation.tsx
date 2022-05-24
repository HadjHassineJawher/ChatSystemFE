import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { MESSAGE_BY_CHAT_ROOM } from "../../graphql/queries";

const ConversationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let _id = route.params?._id;
  let userName = route.params?.user;
  let userImage = route.params?.image;

  var DataObject = {
    MessageElements: [],
  };

  const { loading, error, data } = useQuery(MESSAGE_BY_CHAT_ROOM, {
    variables: { _Id: _id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    pollInterval: 50,
  });

  if (data) {
    data.MessagesbyChatRoomID.forEach((j: any) => {
      j.from.forEach((i: any) => {
        let newDataObject = {
          Message_ID: j._id,
          MessageBody: [],
          MessageTime: j.time,
          From: i._id,
          Image: i.image,
        };
        newDataObject.MessageBody.push(j.body);
        DataObject.MessageElements.push(newDataObject);
      });
    });
  }

  // if (loading) {
  //   return (
  //     <View style={[{ backgroundColor: "#FFFFF" }, ConversationStyles.root]}>
  //       <Text style={ConversationStyles.loadingsmallText}>
  //         Loading your Data.
  //       </Text>
  //       <ActivityIndicator size="large" color="#3A59F9" />
  //     </View>
  //   );
  // }

  var finalData = DataObject.MessageElements.reverse();
  useEffect(() => {
    navigation.setOptions({
      title: [userName, userImage],
    });
  });

  return (
    <>
      <FlatList
        data={finalData}
        keyExtractor={(item) => item.Message_ID}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        renderItem={({ item }) => (
          <Message
            message={item.MessageBody}
            time={item.MessageTime}
            sender={item.From}
            senderImage={item.Image}
          />
        )}
        inverted
      />
      <MessageInput chatRoom={_id} />
    </>
  );
};

export default ConversationScreen;
