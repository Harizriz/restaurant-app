import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Alert, Item } from "react-native";
import Button from "react-native-button"; 
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      FirstNameValueHolder: '',
      LastNameValueHolder: '',
      EmailValueHolder: '',
      PasswordValueHolder: '',
      icon: "eye-off",
      password: true
    }
  }
  GetValueFunction = async () => {
    const { FirstNameValueHolder, LastNameValueHolder, EmailValueHolder, PasswordValueHolder } = this.state;

    try {
      let response = await fetch(
        'http://172.20.10.5:5000/api/users', 
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: FirstNameValueHolder,
            lastName: LastNameValueHolder,
            email: EmailValueHolder,
            password: PasswordValueHolder
          })
        }
      );
      let json = await response.json();
      console.log(json);

      if(!json.firstName || !json.lastName || !json.email || !json.password) {
        Alert.alert("Too bad", json.msg,
        { text: "Okay", onPress: () => console.log("Successful") });
      
        return;
      }
      
      Alert.alert("Well done", "User created successfully!",
        { text: "Okay", onPress: this.props.navigation.navigate("LoginScreen")
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
        <Text style={styles.headingText}>Sign Up</Text>
      </View>
      <View style={styles.promptContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
          placeholder="First Name"
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
          onChangeText={FirstNameValueHolder => this.setState({FirstNameValueHolder})}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Last Name"
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
            onChangeText={LastNameValueHolder => this.setState({LastNameValueHolder})}
          />
        </View>
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
            top: 20,
            left: 8
          }}
          onChangeText={PasswordValueHolder => this.setState({PasswordValueHolder})}
          />
          <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />
        </View>
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
            top: 50,
          }}
          onPress={() => {
            this.GetValueFunction();
          }}
        >
          Sign Up
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
          onPress={() => this.props.navigation.navigate("SignUpPhoneNumberScreen")}
        >
          Sign up with phone number
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
  pictureContainer: {
    height: 125,
    // backgroundColor: "orange",
  },
  promptContainer: {
    height: 300,
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    // backgroundColor: "green",
    alignSelf: "center",
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1
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
    top: 75,
    right: 50,
    color: "blue",
  },
  loginLink: {
    alignSelf: "center",
    color: "blue",
    paddingTop: 30,
  },
  or: {
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: "orange",
  },
  bottomContainer: {
    height: 200,
    alignSelf: "center",
    // backgroundColor: "pink",
  },
  icon: {
    right: 30,
    top: 30,
    // backgroundColor: "yellow",
  }
});

export default SignUpScreen;