import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import UserProfileScreenStyles from "./UserProfileScreenStyles";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let data = route.params?.CurrentUser;

  navigation.setOptions({
    title: data.username,
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={{
              uri: `${data.image}`,
            }}
            style={{
              width: 180,
              height: 180,
              borderRadius: 100,
              alignSelf: "center",
              margin: 25,
            }}
          />
        </View>
        <View>
          <View>
            <Text style={UserProfileScreenStyles.Text}>{data.username}</Text>
            <Text style={UserProfileScreenStyles.smallText}>{data.email} </Text>
          </View>

          <View>
            <CustomButton
              text="Account Information .. ?!"
              type="PRIMARY"
              onPress={() => {
                console.warn("For Acount Information.");
              }}
            />
            <CustomButton
              text="Sign Out"
              type="TERTIARY"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default UserProfileScreen;
