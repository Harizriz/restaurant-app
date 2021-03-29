import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, SafeAreaView } from "react-native";
import Button from "react-native-button";
import { TextInput } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CurrentPasswordValueHolder: '',
      NewPasswordValueHolder: '',
      ConfirmPasswordValueHolder: '',
      icon: "eye-off",
      password: true,
      isErrorCurrentPassword: false,
      isErrorNewPassword: false,
      isErrorConfirmPassword: false
    };
  }
  changeIcon() {
    this.setState(prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        password: !prevState.password
    }));
  }
  UpdatePassword = (currentPass, newPass, confirmPass) => {

    if(currentPass.trim() == "") {
      this.setState({
        CurrentPasswordValueHolder: currentPass,
        isErrorCurrentPassword: true
      })
    }
    else {
      this.setState({
        CurrentPasswordValueHolder: currentPass,
        isErrorCurrentPassword: false
      })
    }

    if(newPass.trim() == "") {
      this.setState({
        NewPasswordValueHolder: newPass,
        isErrorNewPassword: true
      })
    }
    else {
      this.setState({
        NewPasswordValueHolder: newPass,
        isErrorNewPassword: false
      })
    }

    if(confirmPass.trim() == "") {
      this.setState({
        ConfirmPasswordValueHolder: confirmPass,
        isErrorConfirmPassword: true
      })
    }
    else {
      this.setState({
        ConfirmPasswordValueHolder: confirmPass,
        isErrorConfirmPassword: false
      })
    }

    const { NewPasswordValueHolder, ConfirmPasswordValueHolder } = this.state;

    const userId = this.props.route.params.userId;
    const currentPassword = this.props.route.params.password;
    if(this.state.CurrentPasswordValueHolder == '' || this.state.NewPasswordValueHolder == '' || this.state.ConfirmPasswordValueHolder == '') {
      Alert.alert("Too bad", "Please fill in the fields!",
      { text: "Okay", onPress: () => console.log("Successful") });
    }
    else if(this.state.CurrentPasswordValueHolder != currentPassword) {
      this.setState({
        isErrorCurrentPassword: true
      })
      Alert.alert("Too bad", "Current password does not match",
      { text: "Okay", onPress: () => console.log("Successful") });
    }
    else if(this.state.NewPasswordValueHolder != this.state.ConfirmPasswordValueHolder) {
      this.setState({
        isErrorConfirmPassword: true
      })
      Alert.alert("Too bad", "Passwords do not match",
      { text: "Okay", onPress: () => console.log("Successful") });
    }
    else {
      fetch(`http://172.20.10.5:5000/api/users/${encodeURI(userId)}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            newPassword: NewPasswordValueHolder,
            confirmNewPassword: ConfirmPasswordValueHolder
        })
      })
      .then(response => response.json())
      .then(responseJson => {
          console.log(responseJson)
      })

      Alert.alert("Well done", "Password updated successfully",
      [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);

    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Change Password</Text>
        </View>
        <View style={styles.promptContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Current password  "
              mode="outlined"
              error={this.state.isErrorCurrentPassword}
              secureTextEntry={this.state.password}
              returnKeyType="next"
              onSubmitEditing={() => { this.newPasswordTextInput.focus(); }}
              style={{
                top: 20,
                height: 50
              }}
              onChangeText={CurrentPasswordValueHolder => this.setState({CurrentPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  New password  "
              mode="outlined"
              error={this.state.isErrorNewPassword}
              secureTextEntry={this.state.password}
              returnKeyType="next"
              onSubmitEditing={() => { this.confirmPasswordTextInput.focus(); }}
              ref={(input) => { this.newPasswordTextInput = input; }}
              style={{
                top: 20,
                height: 50
              }}  
              onChangeText={NewPasswordValueHolder => this.setState({NewPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />   
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Confirm new password  "
              mode="outlined"
              error={this.state.isErrorConfirmPassword}
              secureTextEntry={this.state.password}
              returnKeyType="done"
              ref={(input) => { this.confirmPasswordTextInput = input; }}
              style={{
                top: 20,
                height: 50
              }}
              onChangeText={ConfirmPasswordValueHolder => this.setState({ConfirmPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />   
          </View>
        </View>
        <View style={styles.submitContainer}>
          <Button
            style={{
              padding: 16,
              width: 150,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "purple",
              color: "white",
              overflow: "hidden",
            }}
            onPress={() => this.props.navigation.goBack()}>
            Cancel
          </Button>
          <Button
            style={{
              padding: 16,
              width: 150,
              borderRadius: 24,
              alignItems: "center",
              backgroundColor: "#007aff",
              color: "white",
              overflow: "hidden",
              left: 10,
            }}
            onPress={() => this.UpdatePassword(
              this.state.CurrentPasswordValueHolder,
              this.state.NewPasswordValueHolder,
              this.state.ConfirmPasswordValueHolder
            )}>
            Update
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
    // backgroundColor: "yellow",
  },
  promptContainer: {
    height: 250,
    alignItems: "center",
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
    // marginHorizontal: 50,
  },
  textInputContainer: {
    width: "75%",
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "yellow"
  },
  headingText: {
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
  text: {
    fontSize: 20,
    left: 50,
    top: 20,
    fontWeight: "bold",
    color: "purple",
  },
  icon: {
    left: 125,
    bottom: 13,
    alignSelf: "center",
    // backgroundColor: "yellow",
  }
});

export default ChangePasswordScreen;