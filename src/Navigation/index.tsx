import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import HomeScreen from "../screens/HomeScreen";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";

import ConversationScreen from "../screens/ConversationScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UsersScreen from "../screens/UsersScreen";
import { constructor, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CLIENT_BY_ID } from "../graphql/queries";

const MyTheme = {
  colors: {
    background: "rgb(253, 254, 254)",
  },
};

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{
            headerShown: true,
            headerTitle: ConversationHeader,
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerBackVisible: false,
            headerTitle: HomeHeader,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerBackVisible: true,
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="People"
          component={UsersScreen}
          options={{
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerBackVisible: true,
            headerTintColor: "#000000",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeHeader = (props) => {
  const [userId, setUserId] = useState("62250624566a6f104055cb86");

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

  const { data: userData } = useQuery(CLIENT_BY_ID, {
    // onCompleted: () => {
    //   setUserId(userData.ClientbyID._id);
    // },
    variables: { id: userId },
    pollInterval: 50,
  });

  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center",
        width: width - 15,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("UserProfile", {
            CurrentUser: userData.ClientbyID,
          });
        }}
      >
        {userData && userData.ClientbyID.image ? (
          <Image
            source={{
              uri: `${userData.ClientbyID.image}`,
            }}
            style={{ width: 35, height: 35, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={{
              uri: `${"data:image/jpeg;base64,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"}`,
            }}
            style={{ width: 35, height: 35, borderRadius: 50 }}
          />
        )}
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Chat System
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("People");
        }}
      >
        <Feather
          style={{ marginHorizontal: 15 }}
          name="users"
          size={23}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const ConversationHeader = (props) => {
  var chatGroupIMG = [];
  var names = [];
  if (props.children[1].length == 2) {
    chatGroupIMG.push(props.children[1][0]);
    chatGroupIMG.push(props.children[1][1]);
    names.push(props.children[0][0]);
    names.push(props.children[0][1]);
  } else {
    chatGroupIMG.push(props.children[1][0]);
  }

  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width - 65,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.warn("This is for more details.");
        }}
      >
        {props.children && chatGroupIMG ? (
          <>
            <Image
              source={{
                uri: `${chatGroupIMG[0]}`,
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            />
            <Image
              source={{
                uri: `${chatGroupIMG[1]}`,
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                borderWidth: 1,
                borderColor: "white",
                left: 23,
                top: 5,
              }}
            />
          </>
        ) : (
          <Image
            source={{
              uri: `${chatGroupIMG[0]}`,
            }}
            style={{ width: 35, height: 35, borderRadius: 50 }}
          />
        )}
      </TouchableOpacity>
      {props.children && !names ? (
        <Text
          style={{
            flex: 1,
            marginLeft: 15,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {names + " "}
        </Text>
      ) : (
        <Text
          style={{
            flex: 1,
            marginLeft: 15,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {props.children[0] + " "}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.warn("This is for more details.");
        }}
      >
        <Feather
          style={{ marginHorizontal: 22 }}
          name="more-horizontal"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};
export default Navigation;
