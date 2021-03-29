import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Alert } from "react-native";
import Button from "react-native-button"; 
import { TextInput } from 'react-native-paper'
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
      password: true,
      isErrorEmail: false,
      isErrorPassword: false,
      isErrorFirstName: false,
      isErrorLastName: false
    }
  }
  GetValueFunction = async (email, password, firstName, lastName) => {

    // check for inputs in inputtext
    if(email == "" || password == "" || firstName == "" || lastName == "") {
      Alert.alert("Please fill all the fields!", "",
      { text: "Okay", onPress: () => console.log("Successful") });
    }

    // validate password
    if(password.trim() == "") {
      this.setState({
        PasswordValueHolder: password,
        isErrorPassword: true
      })
    }
    else {
      this.setState({
        PasswordValueHolder: password,
        isErrorPassword: false
      })
    }

    // validate first name
    if(firstName.trim() == "") {
      this.setState({
        FirstNameValueHolder: firstName,
        isErrorFirstName: true
      })
    }
    else {
      this.setState({
        FirstNameValueHolder: firstName,
        isErrorFirstName: false
      })
    }

    // validate last name
    if(lastName.trim() == "") {
      this.setState({
        LastNameValueHolder: lastName,
        isErrorLastName: true
      })
    }
    else {
      this.setState({
        LastNameValueHolder: lastName,
        isErrorLastName: false
      })
    }

    // validate email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    if(reg.test(email) === false) {
      this.setState({ 
        EmailValueHolder: email, 
        isErrorEmail: true
      })
    }
    else {
      this.setState({ 
        EmailValueHolder: email,
        isErrorEmail: false
      })

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
              label="  First Name  "
              mode="outlined"
              error={this.state.isErrorFirstName}
              returnKeyType="next"
              onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
              style={{
                top: 20,
                height: 50
              }}
              onChangeText={FirstNameValueHolder => this.setState({FirstNameValueHolder})}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Last Name  "
              mode="outlined"
              error={this.state.isErrorLastName}
              returnKeyType="next"
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
              ref={(input) => { this.lastNameTextInput = input; }}
              style={{
                  top: 20,
                  height: 50
              }}
              onChangeText={LastNameValueHolder => this.setState({LastNameValueHolder})}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Email  "
              mode="outlined"
              textContentType="oneTimeCode"
              error={this.state.isErrorEmail}
              returnKeyType="next"
              onSubmitEditing={() => { this.passwordTextInput.focus(); }}
              ref={(input) => { this.emailTextInput = input; }}
              style={{
                top: 20,
                height: 50
              }}
            onChangeText={EmailValueHolder => this.setState({EmailValueHolder})}
            />       
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Password  "
              mode="outlined"
              error={this.state.isErrorPassword}
              returnKeyType="done"
              ref={(input) => { this.passwordTextInput = input; }}
              secureTextEntry={this.state.password}
              textContentType="oneTimeCode"
              style={{
                top: 20,
                height: 50
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
              this.GetValueFunction(
                this.state.EmailValueHolder,
                this.state.PasswordValueHolder,
                this.state.FirstNameValueHolder,
                this.state.LastNameValueHolder  
              );
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
    alignItems: "center",
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    // backgroundColor: "green",
    alignSelf: "center",
  },
  textInputContainer: {
    width: "75%",
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
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
    left: 125,
    bottom: 13,
    marginHorizontal: 147,
    // backgroundColor: "yellow",
  }
});

export default SignUpScreen;