import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

import ForgotPasswordStyles from "./ForgotPasswordStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { RESET_CODE } from "../../graphql/mutations";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const E_MAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [resetCode, { loading, error }] = useMutation(RESET_CODE, {
    onCompleted: (data: any) => {
      Alert.alert("Reset Code", `${data.ResetCode} check you Email.`);
      navigation.navigate("ResetPassword");
    },
    onError: () => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <>
        <View
          style={[{ backgroundColor: "#FFFFF" }, ForgotPasswordStyles.root]}
        >
          <Text style={ForgotPasswordStyles.loadingText}>
            Sending your reset Code.
          </Text>
          <Text style={ForgotPasswordStyles.loadingsmallText}>
            Stay for a while.
          </Text>
          <ActivityIndicator size="large" color="#3A59F9" />
        </View>
      </>
    );
  }

  const onSendPressed = (data: any) => {
    // console.log(data.email);
    resetCode({
      variables: {
        email: data.email,
      },
    });
  };

  const onBackPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={ForgotPasswordStyles.root}>
      <Image
        source={require("../../../assets/ForgotPassword.png")}
        style={[ForgotPasswordStyles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <Text style={ForgotPasswordStyles.title}>Forgot Password ! </Text>
      <CustomInput
        placeholder="E-mail Adress"
        name="email"
        control={control}
        secureTextEntry={false}
        rules={{
          required: "E-mail Adress is required",
          pattern: { value: E_MAIL_REGEX, message: "E-mail is invalid " },
        }}
      />
      <CustomButton
        text="Send"
        onPress={handleSubmit(onSendPressed)}
        type="PRIMARY"
      />
      <CustomButton
        text="Back to Sign In "
        onPress={onBackPressed}
        type="TERTIARY"
      />
    </View>
  );
};
export default ForgotPassword;
