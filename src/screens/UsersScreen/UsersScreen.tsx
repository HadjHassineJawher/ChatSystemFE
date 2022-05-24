import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, TextInput, View } from "react-native";
import Users from "../../components/Users";
import { GET_CLIENTS } from "../../graphql/queries";
import UsersScreenStyles from "./UsersScreenStyles";
import { Feather } from "@expo/vector-icons";

const UsersScreen = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    pollInterval: 50,
  });

  var finalData;

  if (data) {
    data.ClientList.forEach((element) => {
      if (element._id === "62250624566a6f104055cb86") {
        var elementToRemove = element;
        finalData = data.ClientList.filter((object) => {
          return object !== elementToRemove;
        });
      }
    });
  }

  return (
    <View>
      {data && (
        <>
          <View>
            <FlatList
              data={finalData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <Users usersData={item} />}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              // ListHeaderComponent={() => {
              //   return (
              //     <View style={UsersScreenStyles.root}>
              //       <View style={UsersScreenStyles.inputContainer}>
              //         <Feather
              //           name="search"
              //           size={23}
              //           color="black"
              //           style={UsersScreenStyles.icon}
              //         />
              //         <TextInput
              //           style={UsersScreenStyles.input}
              //           placeholder="Search a Friend  .. "
              //         />
              //       </View>
              //     </View>
              //   );
              // }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default UsersScreen;
