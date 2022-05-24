import {
  Text,
  Image,
  useWindowDimensions,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SignUpStyles from "./SignUpStyles";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import DatePicker from "react-native-datepicker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { MonthDateYearField } from "react-native-datefield";
// import DateField from "react-native-datefield";
const SignUpScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Date of Bith");

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const { height } = useWindowDimensions();
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation();

  const E_MAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const pwd = watch("password");

  const [createNewClient, { loading, error }] = useMutation(CREATE_CLIENT, {
    onCompleted: () => {
      navigation.navigate("SignIn");
      Alert.alert(
        "Account Created successfully",
        "You can log in now .. Happy Chatting "
      );
    },
    onError: () => {
      console.log("Error : " + error);
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <>
        <View style={[{ backgroundColor: "#FFFFF" }, SignUpStyles.root]}>
          <Text style={SignUpStyles.loadingText}>Confirming your request.</Text>
          <Text style={SignUpStyles.loadingsmallText}>Stay for a while.</Text>
          <ActivityIndicator size="large" color="#3A59F9" />
        </View>
      </>
    );
  }

  const onSignUpPressed = (data: any) => {
    delete data.confirm_password;
    // console.log(data);
    createNewClient({
      variables: {
        username: data.username,
        age: data.dateofbirth,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image:
          "https://lh3.googleusercontent.com/8A6e4q3NRmesIlzsOCScc4GCyXdw4UznSlGIZViwS4tc7H28DN-VXwAv7PeC4N-eaKIhQiUvzggZY73nD-jpqYot3g",
      },
    });
  };

  const onBackPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <>
      <TouchableOpacity>
        <View style={SignUpStyles.backarrowContainer}>
          <Pressable onPress={onBackPressed}>
            <Ionicons
              style={SignUpStyles.backArrow}
              name="arrow-back"
              size={25}
              color="#3A59F9"
            />
          </Pressable>
        </View>
      </TouchableOpacity>
      <View style={SignUpStyles.root}>
        <Image
          source={require("../../../assets/info.png")}
          style={[SignUpStyles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={SignUpStyles.title}> Glad to have you here ! </Text>
        <Text style={SignUpStyles.subtitle}>
          Create account to start chatting .
        </Text>
        <CustomInput
          placeholder="Full Name"
          secureTextEntry={false}
          control={control}
          name="username"
          rules={{
            required: "Full Name is required",
            minLength: {
              value: 3,
              message: "User Name should be at least 3 characters long ",
            },
            maxLength: {
              value: 24,
              message: "User Name should be max 24 characters long ",
            },
          }}
        />
        <CustomInput
          placeholder="E-mail Adress"
          control={control}
          secureTextEntry={false}
          name="email"
          rules={{
            required: "E-mail Adress is required",
            pattern: { value: E_MAIL_REGEX, message: "E-mail is invalid " },
          }}
        />
        <CustomInput
          placeholder="Date of Birth"
          control={control}
          name="dateofbirth"
          rules={{
            required: "Date of Birth is required",
            minLength: {
              value: 8,
              message: "Date of Birth format as DD/MM/YYYY",
            },
            maxLength: {
              value: 10,
              message: "Date of Birth formatas DD/MM/YYYY",
            },
          }}
          secureTextEntry={false}
        />
        <Controller
          control={control}
          rules={{
            required: "Phone Number is required",
          }}
          name="phone"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <>
                <View>
                  <PhoneInput
                    ref={phoneInput}
                    defaultCode="TN"
                    layout="first"
                    placeholder="Phone Number"
                    value={value}
                    onChangeFormattedText={(text) => {
                      onChange(text);
                    }}
                    onChangeText={onChange}
                    containerStyle={{
                      backgroundColor: "white",
                      width: "100%",
                      borderColor: error ? "red" : "#e8e8e8",
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      marginVertical: 5,
                    }}
                    textContainerStyle={{
                      backgroundColor: "white",
                      height: 41,
                      margin: 0.5,
                    }}
                    codeTextStyle={{
                      fontSize: 15,
                      backgroundColor: "white",
                      alignContent: "center",
                      height: 20.5,
                    }}
                    textInputStyle={{
                      height: 35,
                      fontSize: 15,
                      backgroundColor: "white",
                      width: "100%",
                    }}
                  />
                </View>

                <View>
                  {error && (
                    <Text style={{ color: "red", alignSelf: "stretch" }}>
                      {error.message || "Error"}
                    </Text>
                  )}
                </View>
              </>
            );
          }}
        />
        <CustomInput
          control={control}
          placeholder="Password"
          name="password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long ",
            },
          }}
        />
        <CustomInput
          placeholder="Confirm Password"
          control={control}
          name="confirm_password"
          secureTextEntry
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
          text="Register"
          onPress={handleSubmit(onSignUpPressed)}
          type="PRIMARY"
        />
        <Text style={SignUpStyles.smallNormaltext}>
          By registring, you confirm that you accept our{" "}
          <Text
            style={SignUpStyles.smalltext}
            onPress={() => {
              console.warn("Terms of Use Pressed");
            }}
          >
            Terms of Use{" "}
          </Text>
          and{" "}
          <Text
            style={SignUpStyles.smalltext}
            onPress={() => {
              console.warn("Privacy Polic Pressed");
            }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </>
  );
};
export default SignUpScreen;

{
  /* <Controller
          control={control}
          rules={{
            required: "Date of Birth is required",
          }}
          name="Dateofbirth"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <MonthDateYearField
                  styleInput={[
                    SignUpStyles.inputBorder,
                    { borderColor: error ? "red" : "#e8e8e8" },
                  ]}
                  labelDate="Date"
                  labelMonth="Month"
                  labelYear="Year"
                  value={value}
                  onChangeText={onChange}
                />

                <View>
                  {error && (
                    <Text style={{ color: "red", alignSelf: "stretch" }}>
                      {error.message || "Error"}
                    </Text>
                  )}
                </View>
              </>
            );
          }}
        /> */
}
