import { FlatList, View } from "react-native";
import ChatRoom from "../../components/ChatRoom";

import { useQuery } from "@apollo/client";
import { CHATROOM_BY_USER_ID, GET_CLIENTS } from "../../graphql/queries";
import { useEffect, useState } from "react";
import ConnectedUsers from "../../components/ConnectedUsers";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const [userId, setUserId] = useState("");

  const getUserId = async (key: any) => {
    try {
      var id = await SecureStore.getItemAsync(key);
      setUserId(id);
    } catch (error) {
      console.log("Error Retriving User Id " + error);
    }
  };

  useEffect(() => {
    getUserId("userId");
  });

  const { data: chatRoomData } = useQuery(CHATROOM_BY_USER_ID, {
    variables: { id: userId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    pollInterval: 50,
  });

  const { data: ConnectedUserData } = useQuery(GET_CLIENTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    pollInterval: 5000,
  });

  var finalConnectedUserData;

  if (ConnectedUserData) {
    ConnectedUserData.ClientList.forEach((element) => {
      if (element._id === userId) {
        var elementToRemove = element;
        finalConnectedUserData = ConnectedUserData.ClientList.filter(
          (object) => {
            return object !== elementToRemove;
          }
        );
      }
    });
  }

  var DataObject = {
    chatRoomsElements: [],
  };

  if (chatRoomData) {
    chatRoomData.ChatRoombyUserId.forEach((j: any) => {
      j.members.forEach((i: any) => {
        if (i._id === userId) {
          var elemToRemove = i;
          var member = j.members.filter((object) => {
            return object !== elemToRemove;
          });

          const transformArray = Object.assign(member);
          let newDataObject = {
            ChatRoom_Id: j._id,
            Users: [transformArray],
            LastMessages: j.messages[0],
          };
          DataObject.chatRoomsElements.push(newDataObject);
        }
      });
    });
  }

  var finalData = DataObject.chatRoomsElements;
  return (
    <View>
      {chatRoomData && (
        <FlatList
          data={finalData}
          keyExtractor={(item) => item.ChatRoom_Id}
          renderItem={({ item }) => <ChatRoom chatRoomData={item} />}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          ListHeaderComponent={() => {
            return (
              ConnectedUserData && (
                <FlatList
                  data={finalConnectedUserData}
                  keyExtractor={(item) => item._id}
                  removeClippedSubviews
                  renderItem={({ item }) => (
                    <ConnectedUsers connectedUsersData={item} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              )
            );
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
// if (loading) {
//   return (
//     <View style={[{ backgroundColor: "#FFFFF" }, HomeScreenStyles.root]}>
//       <Text style={HomeScreenStyles.loadingsmallText}>
//         Loading your Data.
//       </Text>
//       <ActivityIndicator size="large" color="#3A59F9" />
//     </View>
//   );
// }
