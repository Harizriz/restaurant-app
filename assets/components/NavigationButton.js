import React from 'react';

import ImButton from "react-native-button";

const NavigationButton = ({ navigation }) => {
    return (
        <ImButton
          style={{
            padding: 16,
            width: "100%",
            // borderRadius: 24,
            alignSelf: "center",
            backgroundColor: "purple",
            color: "white",
            overflow: "hidden",
          }}
          onPress={() => navigation.navigate("PaymentScreen")}
        >
          Checkout
        </ImButton>
    );
}

export default NavigationButton;