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
          {/* <Text style={styles.text}>Current password</Text> */}
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Current password  "
              mode="outlined"
              secureTextEntry={this.state.password}
              style={{
                top: 20,
                height: 50
              }}
              onChangeText={CurrentPasswordValueHolder => this.setState({CurrentPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />
          </View>
          {/* <Text style={styles.text}>New password</Text> */}
          <View style={styles.textInputContainer}>
            <TextInput
              label="  New password  "
              mode="outlined"
              secureTextEntry={this.state.password}
              style={{
                top: 20,
                height: 50
              }}  
              onChangeText={NewPasswordPasswordValueHolder => this.setState({NewPasswordPasswordValueHolder})}
            />   
            <Icon name={this.state.icon} size={17} style={styles.icon} onPress={() => this.changeIcon()} />   
          </View>
          {/* <Text style={styles.text}>Confirm New password</Text> */}
          <View style={styles.textInputContainer}>
            <TextInput
              label="  Confirm new password  "
              mode="outlined"
              secureTextEntry={this.state.password}
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
            onPress={() => Alert.alert("Password changed successfully!")}>
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
    marginHorizontal: 147,
    // backgroundColor: "yellow",
  }
});

export default ChangePasswordScreen;