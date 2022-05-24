import { useLazyQuery } from "@apollo/client";
import React from "react";
import {
  Text,
  Image,
  useWindowDimensions,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { USER_LOGIN } from "../../graphql/queries";
import { useForm } from "react-hook-form";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SignInStyles from "./SignInStyles";
import { storeToken, storeUserId } from "../../auth/storage";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const E_MAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [LoginUser, { data, loading, error }] = useLazyQuery(USER_LOGIN, {
    onCompleted: () => {
      try {
        storeToken("accessToken", data.ClientLogin.token);
        storeUserId("userId", data.ClientLogin.userId);
        navigation.navigate("Home", {
          id: data.ClientLogin.userId,
        });
      } catch (err) {
        console.log(err);
      }
    },
    onError: () => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <>
        <View style={[{ backgroundColor: "#FFFFF" }, SignInStyles.root]}>
          <Text style={SignInStyles.loadingText}>Checking your Data.</Text>
          <Text style={SignInStyles.loadingsmallText}>Stay for a while.</Text>
          <ActivityIndicator size="large" color="#3A59F9" />
        </View>
      </>
    );
  }

  const onSignInPressed = (data: any) => {
    try {
      LoginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onCreateOnePressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={SignInStyles.root}>
      <Image
        source={require("../../../assets/Messages.png")}
        style={[SignInStyles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <Text style={SignInStyles.title}> Welcome Back ! </Text>
      <Text style={SignInStyles.subtitle}> Sign in to Continue. </Text>

      <CustomInput
        placeholder=" E-mail Adress"
        name="email"
        secureTextEntry={false}
        rules={{
          required: "E-mail Adress is required",
          pattern: {
            value: E_MAIL_REGEX,
            message: "E-mail Adress is invalid ",
          },
        }}
        control={control}
      />
      <CustomInput
        placeholder="Password"
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be minimum 8 characheters long",
          },
        }}
        secureTextEntry
      />
      <CustomButton
        text="Sign In"
        onPress={handleSubmit(onSignInPressed)}
        type="PRIMARY"
      />

      <CustomButton
        text="Forgot Password ?!"
        type="TERTIARY"
        onPress={onForgotPasswordPressed}
      />
      <Pressable onPress={onCreateOnePressed}>
        <Text style={SignInStyles.createone}>
          Don't have Account .. ?!
          <Text style={SignInStyles.registertext}> Create One.</Text>
        </Text>
      </Pressable>
    </View>
  );
};
export default SignInScreen;
