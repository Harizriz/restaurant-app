import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, Alert } from "react-native";
import Button from "react-native-button";
import { TextInput } from 'react-native-paper'
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
      password: true,
      isErrorEmail: false,
      isErrorPassword: false
     };
  }
  GetDataFromApi = async (email, password) => {

    // validate email and password
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

      let approvalVariableManager = "admin"
      let filteredPasswordManager = String(json.password).includes(approvalVariableManager);

      console.log(filteredPasswordManager)

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
        console.log("Here!");
        this.props.navigation.navigate("VirtualQueueScreen");
      }
      else if(filteredPasswordStaff) {
        console.log("Staff!");
        this.props.navigation.navigate("KitchenOrderScreen");
      }
      else {
        // send user's email to AccountScreen
        this.props.navigation.navigate("FeaturedMenuScreen", {params: {emailData: this.state.EmailValueHolder}, screen: "Account" })
      }

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
              label="  Email  "
              mode="outlined"
              error={this.state.isErrorEmail}
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
              // this.GetDataFromApi(this.state.EmailValueHolder, this.state.PasswordValueHolder);
              this.props.navigation.navigate("FeaturedMenuScreen")
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
    alignItems: "center",
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    alignSelf: "center",
    // backgroundColor: "green",
  },
  textInputContainer: {
    width: "75%",
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
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
    // backgroundColor: "red",
    bottom: 20
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
    left: 125,
    bottom: 27,
    marginHorizontal: 147,
    // backgroundColor: "yellow",
  }
});

export default LoginScreen;