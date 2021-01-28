import { Alert } from "react-native"

const SignUpAlert = () => Alert.alert("User already exist!",
    { text: "Okay", onPress: () => console.log("Successful") });

module.exports = SignUpAlert;