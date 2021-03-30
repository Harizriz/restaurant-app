import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from "react-native";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataSource: ''
    };
  }
  componentDidMount = async () => {
    const { navigate }  = this.props.navigation;
    let params = this.props.route.params.emailData;
    fetch(`http://172.20.10.5:5000/api/users/${encodeURI(params)}`)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        dataSource: responseJson[0]
      });
    })
    .then(response => {
      navigate('MainMenuScreen', {screen: "Menu"});
    });
  }
  render() {
    // console.log(this.state.dataSource);
    // console.log(this.state.dataSource.firstname);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>My Account</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.primaryText}>First Name</Text>
          <Text style={styles.secondaryText}>{this.state.dataSource.firstname}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.primaryText}>Last Name</Text>
          <Text style={styles.secondaryText}>{this.state.dataSource.lastname}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.primaryText}>Email</Text>
          <Text style={styles.secondaryText}>{this.state.dataSource.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{
              paddingRight: 142,
              paddingBottom: 10,
              width: "100%",
              color: "black",
              // borderBottomWidth: 1,
            }}
            onPress={() => this.props.navigation.navigate("ChangePasswordScreen", {userId: this.state.dataSource.objectId, password: this.state.dataSource.password})}
          >
            Change Password
          </Button>
          <Icon name="chevron-right" color="black" size={26} onPress={() => this.props.navigation.navigate("ChangePasswordScreen", {userId: this.state.dataSource.objectId, password: this.state.dataSource.password})}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{
              paddingRight: 210,
              paddingBottom: 10,
              width: "100%",
              color: "black",
              // borderBottomWidth: 1,
            }}
            onPress={
              () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
                { text: "Cancel", onPress: () => console.log("cancelled!") },
                { text: "Log out", onPress: () => this.props.navigation.navigate("MainScreen") },
            ])
            }
          >
            Log Out
          </Button>
          <Icon name="chevron-right" color="black" size={26} onPress={
            () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
              { text: "Cancel", onPress: () => console.log("cancelled!") },
              { text: "Log out", onPress: () => this.props.navigation.navigate("MainScreen") },
          ])
          }/>
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
    height: 125,
    // backgroundColor: "yellow",
  },
  headingText: {
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
  profileContainer: {
    height: 70,
    // backgroundColor: "yellow",
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 55,
    top: 20,
    // backgroundColor: "yellow",
  },
  primaryText: {
    fontSize: 20,
    color: "purple",
    left: 50,
    fontWeight: "bold"
  },
  secondaryText: {
    fontSize: 20,
    color: "black",
    left: 50,
    top: 5
  }
});

export default AccountScreen;
