import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, SafeAreaView, TextInput } from "react-native";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CurrentPasswordValueHolder: '',
      NewPasswordPasswordValueHolder: '',
      ConfirmPasswordValueHolder: '',
      icon: "eye-off",
      password: true
     };
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
          <Text style={styles.headingText}>Change Password</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.text}>Current password</Text>
          <View style={styles.textInputContainer}>
            <TextInput
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
                left: 8
              }}
              onChangeText={CurrentPasswordValueHolder => this.setState({CurrentPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />
          </View>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.text}>New password</Text>
          <View style={styles.textInputContainer}>
            <TextInput
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
                left: 8
              }}
              onChangeText={NewPasswordPasswordValueHolder => this.setState({NewPasswordPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />   
          </View>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.text}>Confirm New password</Text>
          <View style={styles.textInputContainer}>
            <TextInput
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
                left: 8
              }}
              onChangeText={ConfirmPasswordValueHolder => this.setState({ConfirmPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />   
          </View>
        </View>
        <View style={styles.submitContainer}>
        <Button
          style={{
              fontSize: 15,
              padding: 16,
              width: 200,
              borderRadius: 5,
              alignItems: "center",
              backgroundColor: "#007aff",
              color: "white",
              overflow: "hidden",
              top: 30,
          }}
          onPress={() => Alert.alert("Password changed successfully!")}>
          Update password
        </Button>
        {/* <Button
          style={{
              fontSize: 15,
              padding: 16,
              width: 100,
              borderRadius: 5,
              alignItems: "center",
              backgroundColor: "grey",
              color: "white",
              overflow: "hidden",
              top: 30,
              left: 50
          }}
          onPress={() => this.props.navigation.goBack()}>
          Cancel
        </Button> */}
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
    height: 125,
    top: 5
    // backgroundColor: "red",
  },
  submitContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    // alignContent: "center",
    // backgroundColor: "green",
    // marginHorizontal: 50,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    right: 30,
    top: 10,
    // backgroundColor: "yellow",
  }
});

export default ChangePasswordScreen;