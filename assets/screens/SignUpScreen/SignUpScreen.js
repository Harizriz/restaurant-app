import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import Button from "react-native-button"; 
import Parse from "parse/react-native";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      FirstNameValueHolder: '',
      LastNameValueHolder: '',
      EmailValueHolder: '',
      PasswordValueHolder: ''
    }
  }
  GetValueFunction = () => {
    const { FirstNameValueHolder, LastNameValueHolder, EmailValueHolder, PasswordValueHolder } = this.state;
    console.log(FirstNameValueHolder)
    console.log(LastNameValueHolder)
    console.log(EmailValueHolder)
    console.log(PasswordValueHolder) 

    const JSONObj = {
      firstName: FirstNameValueHolder,
      lastName: LastNameValueHolder,
      email: EmailValueHolder,
      password: PasswordValueHolder
    };

    const JSONObjString = JSON.stringify(JSONObj);
    console.log(JSONObjString);
    
    fetch('http://172.20.10.5:5000/api/users', {
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
    });

    const Person = Parse.Object.extend("Person");
    const person = new Person();

    person.set("firstname", FirstNameValueHolder);
    person.set("lastname", LastNameValueHolder);
    person.set("email", EmailValueHolder);
    person.set("password", PasswordValueHolder);

    try {
        let result = person.save()
        alert('New object created with objectId: ' + result.id);
    }
    catch(error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }
  }
  render() { 
    return ( 
      <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Sign Up</Text>
      </View>
      <View style={styles.promptContainer}>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          width: "75%",
          left: 50,
          paddingLeft: 20,
          marginTop: 20,
          top: 20,
        }}
        onChangeText={FirstNameValueHolder => this.setState({FirstNameValueHolder})}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          width: "75%",
          left: 50,
          paddingLeft: 20,
          marginTop: 20,
          top: 20,
        }}
        onChangeText={LastNameValueHolder => this.setState({LastNameValueHolder})}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          width: "75%",
          left: 50,
          paddingLeft: 20,
          marginTop: 20,
          top: 20,
        }}
        onChangeText={EmailValueHolder => this.setState({EmailValueHolder})}
      />        
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          width: "75%",
          left: 50,
          paddingLeft: 20,
          marginTop: 20,
          top: 20,
        }}
        onChangeText={PasswordValueHolder => this.setState({PasswordValueHolder})}
      />      
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
            this.props.navigation.navigate("LoginScreen");
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
});

export default SignUpScreen;