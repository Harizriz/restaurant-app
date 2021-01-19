import React from "react";
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import Button from "react-native-button";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
        <Text style={styles.title}>Welcome to Dine In</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <Button
            style={{
              padding: 16,
              width: 250,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "purple",
              color: "white",
              bottom: 20,
              overflow: "hidden",
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Login
          </Button>
          <Button
            style={{
              padding: 16,
              width: 250,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "purple",
              color: "white",
              overflow: "hidden",
            }}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            Sign Up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  buttonContainer: {
    top: 40,
  },
  buttonStyle: {
    height: 90,
    width: 90,
    backgroundColor: "black",
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  textButton: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    top: 10,
  },
});

export default MainScreen;
