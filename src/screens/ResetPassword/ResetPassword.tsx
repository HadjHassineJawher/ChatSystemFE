import React from "react";
import {
  Text,
  View,
  Image,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ResetPasswordStyles from "./ResetPasswordStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/mutations";

const RestPassword = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pwd = watch("newPassword");

  const [resetpassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: (data: any) => {
      Alert.alert("Password Reset", `${data.ResetPassword}`);
      navigation.navigate("SignIn");
    },
    onError: () => {
      console.log(error);
      navigation.navigate("ResetPassword");
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <>
        <View style={[{ backgroundColor: "#FFFFF" }, ResetPasswordStyles.root]}>
          <Text style={ResetPasswordStyles.loadingText}>
            Confirming Your Request.
          </Text>
          <Text style={ResetPasswordStyles.loadingsmallText}>
            Stay for a while.
          </Text>
          <ActivityIndicator size="large" color="#3A59F9" />
        </View>
      </>
    );
  }

  const onSubmitPressed = (data: any) => {
    delete data.confirm_password;

    resetpassword({
      variables: {
        code: data.code,
        newPassword: data.newPassword,
      },
    });
  };

  const onBackPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={ResetPasswordStyles.root}>
      <Image
        source={require("../../../assets/NewPassword.png")}
        style={[ResetPasswordStyles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <Text style={ResetPasswordStyles.title}>Reset Password </Text>
      <CustomInput
        placeholder="Confirmation Code"
        name="code"
        control={control}
        rules={{
          required: "Confirmation code is required",
          minLength: {
            value: 6,
            message: "Confirmation Code should be minimum 6 digits long",
          },
        }}
        secureTextEntry={false}
      />
      <CustomInput
        placeholder="New Password"
        secureTextEntry
        name="newPassword"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be minimum 8 characheters long",
          },
        }}
      />
      <CustomInput
        placeholder="Confirm New Password"
        name="confirm_password"
        control={control}
        secureTextEntry={true}
        rules={{
          required: "Confirm Password is required",
          minLength: {
            value: 8,
            message: "Confirm Password should be minimum 8 characheters long",
          },
          validate: (value: any) => value === pwd || "Password do not match",
        }}
      />

      <CustomButton
        text="Submit"
        onPress={handleSubmit(onSubmitPressed)}
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

export default RestPassword;
