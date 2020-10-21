import React from "react";
import { TextInput } from "react-native";

const PromptTextInput = (props) => {
  const [value, onChangeText] = React.useState();

  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor="black"
      style={{
        height: 50,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 25,
        width: "75%",
        left: 50,
        paddingLeft: 20,
        marginTop: 20,
        top: 20,
      }}
      onChangeText={(text) => onChangeText(text)}
      value={value}
    />
  );
};

export default PromptTextInput;
