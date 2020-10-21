import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Button from "react-native-button";

const AlertButton = (props) => {
  const createTwoButtonAlert = () => Alert.alert(props.text);

  return (
    <Button
      style={{
        padding: 16,
        width: 250,
        borderRadius: 24,
        alignItems: "center",
        backgroundColor: "purple",
        color: "white",
        overflow: "hidden",
        top: 20,
      }}
      onPress={createTwoButtonAlert}
    >
      {props.buttonText}
    </Button>
  );
};

export default AlertButton;
