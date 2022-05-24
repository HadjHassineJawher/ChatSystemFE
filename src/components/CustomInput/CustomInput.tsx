import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import CustumInputStyles from "./CustumInputStyles";

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
}: {
  control: any;
  rules: any;
  name: any;
  placeholder: any;
  secureTextEntry: any;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <>
            <View
              style={[
                CustumInputStyles.container,
                { borderColor: error ? "red" : "#e8e8e8" },
              ]}
            >
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={CustumInputStyles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
            <View>
              {error && (
                <Text
                  style={{
                    color: "red",
                    alignSelf: "stretch",
                  }}
                >
                  {error.message || "Error"}
                </Text>
              )}
            </View>
          </>
        );
      }}
    />
  );
};
export default CustomInput;
