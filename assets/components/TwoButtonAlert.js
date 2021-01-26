import { Alert } from "react-native"

const createTwoButtonAlert = () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
    { text: "Cancel", onPress: () => console.log("cancelled!") },
    { text: "Log out", onPress: () => console.log("logout!") },
]);

module.exports = createTwoButtonAlert;