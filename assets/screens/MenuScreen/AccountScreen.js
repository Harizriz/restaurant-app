import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import InputText from "../../components/InputText";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AccountScreen = ({ navigation }) => {
  const createTwoButtonAlert = () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
    { text: "Cancel", onPress: () => console.log("cancelled!") },
    { text: "Log out", onPress: () => console.log("logout!") },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>My Account</Text>
      </View>
      <View style={styles.profileContainer}>
        <InputText placeholder="Full Name" />
        <InputText placeholder="Email" />
        <InputText placeholder="Phone Number" />
        <InputText placeholder="Date of Birth" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            paddingRight: 130,
            paddingBottom: 10,
            width: "100%",
            color: "black",
            // borderBottomWidth: 1,
          }}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          Change Password
        </Button>
        <Icon name="chevron-right" color="black" size={26} onPress={() => navigation.navigate("ChangePasswordScreen")}/>
      </View>
      <View style={styles.button2Container}>
        <Button
          style={{
            paddingRight: 210,
            paddingBottom: 10,
            width: "100%",
            color: "black",
            // borderBottomWidth: 1,
          }}
          onPress={createTwoButtonAlert}
        >
          Log Out
        </Button>
        <Icon name="chevron-right" color="black" size={26} onPress={createTwoButtonAlert}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  headingContainer: {
    height: 100,
    // backgroundColor: "yellow",
  },
  headingText: {
    fontSize: 40,
    color: "purple",
    left: 50,
    top: 50,
  },
  profileContainer: {
    height: 325,
    // backgroundColor: "yellow",
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 55,
    top: 10
  },
  button2Container: {
    height: 50,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 55,
    top: 20
  },
});

export default AccountScreen;
