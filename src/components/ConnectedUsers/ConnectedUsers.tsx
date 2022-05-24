import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ConnectedUsersStyles from "./ConnectedUsersStyles";

const ConnectedUsers = ({ connectedUsersData }) => {
  var is_Active = connectedUsersData.is_active;
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={ConnectedUsersStyles.container}>
        <Image
          source={{
            uri: `${connectedUsersData.image}`,
          }}
          style={ConnectedUsersStyles.image}
        />
        {is_Active ? (
          <View style={ConnectedUsersStyles.connectedbadge}></View>
        ) : (
          <View style={ConnectedUsersStyles.disconnectedbadge}></View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ConnectedUsers;
