import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import UsersStyles from "./UsersStyles";

const Users = ({ usersData }) => {
  var is_Active = usersData.is_active;
  return (
    <>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={UsersStyles.container}>
          <Image
            source={{
              uri: `${usersData.image}`,
            }}
            style={UsersStyles.image}
          />

          {/* {is_Active ? (
            <View style={UsersStyles.connectedbadge}></View>
          ) : (
            <View style={UsersStyles.disconnectedbadge}></View>
          )} */}

          <View style={UsersStyles.rightContainer}>
            <View style={UsersStyles.row}>
              <Text style={UsersStyles.name}>{usersData.username}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Users;
