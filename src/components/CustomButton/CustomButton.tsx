import React from "react";
import { Pressable, Text } from "react-native";
import CustomButtonStyles from "./CustomButtonStyles";

const CustomButton = ({
  onPress,
  text,
  type,
}: {
  onPress: any;
  text: any;
  type: any;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        CustomButtonStyles.container,
        CustomButtonStyles[`container_${type}`],
      ]}
    >
      <Text
        style={[CustomButtonStyles.text, CustomButtonStyles[`text_${type}`]]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
export default CustomButton;
