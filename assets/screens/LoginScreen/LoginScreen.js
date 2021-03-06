import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, Alert } from "react-native";
import Button from "react-native-button";
import { TextInput } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import settings from "../../../settings";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      EmailValueHolder: '',
      PasswordValueHolder: '',
      isLoading: true,
      dataSource: null,
      icon: "eye-off",
      password: true,
      isErrorEmail: false,
      isErrorPassword: false,
     };
  }
  GetDataFromApi = async (email, password) => {

    // validate user's email and password
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
    }

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

    const { EmailValueHolder, PasswordValueHolder } = this.state;

    try {
      let response = await fetch(
        settings.ipAddress+'/api/users/login', 
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

      let approvalVariableManager = "admin"
      let filteredPasswordManager = String(json.password).includes(approvalVariableManager);

      let approvalVariableStaff = "staff"
      let filteredPasswordStaff = String(json.password).includes(approvalVariableStaff);

      // check for TextInput
      if(!json.email || !json.password) {
        this.setState({
          isErrorEmail: true,
          isErrorPassword: true
        })
        Alert.alert("Too bad", json.msg,
        { text: "Okay", onPress: () => console.log("Successful") });

        return;
      }

      if(filteredPasswordManager) {
        this.props.navigation.navigate("VirtualQueueScreen");
      }
      else if(filteredPasswordStaff) {
        this.props.navigation.navigate("KitchenOrderScreen");
      }
      else {
        this.props.navigation.navigate("MainMenuScreen", {params: {emailData: this.state.EmailValueHolder}, screen: "Account" })
      }

    } catch (error) {
      console.error(error);
    }
  }
  // make the password secret
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
              label="  Email  "
              mode="outlined"
              error={this.state.isErrorEmail}
              returnKeyType="next"
              onSubmitEditing={() => { this.passwordTextInput.focus(); }}
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
              secureTextEntry={this.state.password}
              error={this.state.isErrorPassword}
              returnKeyType="done"
              ref={(input) => { this.passwordTextInput = input; }}
              style={{
                top: 5,
                height: 50
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
              this.GetDataFromApi(this.state.EmailValueHolder, this.state.PasswordValueHolder);
            }}
          >
            Sign In
          </Button>
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
  },
  promptContainer: {
    height: 200,
    alignItems: "center",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
  },
  textInputContainer: {
    width: "75%",
    flex: 1,
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
    bottom: 20
  },
  icon: {
    left: 125,
    bottom: 27,
    marginHorizontal: 147,
  }
});

export default LoginScreen;