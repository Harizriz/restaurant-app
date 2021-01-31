import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, TextInput, Alert } from "react-native";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      EmailValueHolder: '',
      PasswordValueHolder: '',
      isLoading: true,
      dataSource: null,
      icon: "eye-off",
      password: true
     };
  }
  GetDataFromApi = async () => {
    const { EmailValueHolder, PasswordValueHolder } = this.state;

    try {
      let response = await fetch(
        'http://172.20.10.5:5000/api/users/login', 
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: EmailValueHolder,
            password: PasswordValueHolder
          })
        }
      );
      let json = await response.json();
      console.log(json);

      if(!json.email || !json.password) {
        Alert.alert("Too bad", json.msg,
        { text: "Okay", onPress: () => console.log("Successful") });
      
        return;
      }
      
      Alert.alert("Well done", "Login successfully!",
        { text: "Okay", onPress: this.props.navigation.navigate("FeaturedMenuScreen")
      });

    } catch (error) {
      console.error(error);
    }
    
  }
  changeIcon() {
    this.setState(prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        password: !prevState.password
    }));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Sign In</Text>
        </View>
        <View style={styles.promptContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={{
                height: 50,
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 10,
                width: "75%",
                paddingLeft: 20,
                marginTop: 20,
                top: 20,
              }}
              onChangeText={EmailValueHolder => this.setState({EmailValueHolder})}
            />      
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={this.state.password}
              style={{
                height: 50,
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 10,
                width: "75%",
                paddingLeft: 20,
                marginTop: 20,
                // top: 20,
                left: 8
              }}
              onChangeText={PasswordValueHolder => this.setState({PasswordValueHolder})}
            />     
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} /> 
          </View>
          <Text
            style={styles.link}
            onPress={() => this.props.navigation.navigate("ResetPasswordScreen")}
          >
            Forgot Password?
          </Text>
        </View>
        <View style={styles.submitContainer}>
          <Button
            style={{
              padding: 16,
              width: 250,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "purple",
              color: "white",
              overflow: "hidden",
              top: 30,
            }}
            onPress={() => {
              this.GetDataFromApi();
            }}
          >
            Sign In
          </Button>
        </View>
        <View style={styles.or}>
          <Text>OR</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            style={{
              padding: 16,
              width: 250,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "#3b5998",
              color: "white",
              overflow: "hidden",
            }}
            onPress={() => this.props.navigation.navigate("")}
          >
            Login with Facebook
          </Button>
          {/* <Text
            style={styles.loginLink}
            onPress={() => this.props.navigation.navigate("LoginPhoneNumberScreen")}
          >
            Login with phone number
          </Text> */}
        </View>
      </SafeAreaView>
    );
  }
}

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
  promptContainer: {
    height: 200,
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow",
    // borderWidth: 1,
  },
  headingText: {
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
  link: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    right: 50,
    color: "blue",
  },
  loginLink: {
    alignSelf: "center",
    color: "blue",
    paddingTop: 30,
  },
  or: {
    height: 50,
    alignSelf: "center",
    // backgroundColor: "orange",
    paddingTop: 10,
  },
  bottomContainer: {
    height: 200,
    alignSelf: "center",
    // backgroundColor: "pink",
  },
  icon: {
    right: 30,
    top: 10,
    // backgroundColor: "yellow",
  }
});

export default LoginScreen;