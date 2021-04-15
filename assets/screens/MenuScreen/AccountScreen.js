import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert, Button } from "react-native";
import ReactButton from "react-native-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from 'react-native-modal';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataSource: '',
      isModalVisible: false,
    };
  }
  componentDidMount = async () => {
    const { navigate }  = this.props.navigation;
    // navigate('MainMenuScreen', { params: { emailData: params }, screen: "Virtual Queue"});

    let params = this.props.route.params.emailData;
    fetch(`http://172.20.10.5:5000/api/users/${encodeURI(params)}`)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        dataSource: responseJson[0]
      });
    })
    .then(response => {
      navigate('MainMenuScreen', { params: {emailData: params }, screen: "Virtual Queue"});
    });
  }
  Logout = (email) => {
    fetch(`http://172.20.10.5:5000/api/user/${encodeURI(email)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
    })

    this.props.navigation.navigate("MainScreen")
  }
  render() {
    const toggleModal = () => {
      if(this.state.isModalVisible == false) {
        this.setState({
            isModalVisible: true
        })
      }
      else {
        this.setState({
            isModalVisible: false
        })
      }
    }
    return (
      <SafeAreaView style={styles.container}>
         <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalHeadingText}>Total Points Available</Text>
                  <Text style={styles.modalContentText}>98</Text>
                <View style={styles.modalButtonContainer}>
                    <Button title="Return" onPress={toggleModal} />
                </View>
            </View>
        </Modal>
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
          <View style={styles.buttonLeftContainer}>
            <ReactButton
              style={{
                textAlign: "left",
                width: "100%",
                color: "black",
              }}
              onPress={() => this.props.navigation.navigate("ChangePasswordScreen", {userId: this.state.dataSource.objectId, password: this.state.dataSource.password})}
            >
              Change Password
            </ReactButton>
          </View>
          <View style={styles.buttonRightContainer}>
            <Icon name="chevron-right" color="black" size={26} onPress={() => this.props.navigation.navigate("ChangePasswordScreen", {userId: this.state.dataSource.objectId, password: this.state.dataSource.password})}/>
            {/* <Icon name="chevron-right" color="black" size={26} onPress={() => this.props.navigation.navigate("QRDummyScreen")}/> */}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeftContainer}>
            <ReactButton
              style={{
                textAlign: "left",
                width: "100%",
                color: "black",
              }}
              onPress={toggleModal}
            >
              Manage Subscription
            </ReactButton>
          </View>
          <View style={styles.buttonRightContainer}>
            <Icon name="chevron-right" color="black" size={26} onPress={toggleModal}/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeftContainer}>
            <ReactButton
              style={{
                textAlign: "left",
                width: "100%",
                color: "black",
              }}
              onPress={
                () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
                  { text: "Cancel", onPress: () => console.log("cancelled!") },
                  { text: "Log out", onPress: () => this.Logout(this.state.dataSource.email) },
              ])
              }
            >
              Log Out
            </ReactButton>
          </View>
          <View style={styles.buttonRightContainer}>
            <Icon name="chevron-right" color="black" size={26} onPress={
              () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
                { text: "Cancel", onPress: () => console.log("cancelled!") },
                { text: "Log out", onPress: () => this.Logout(this.state.dataSource.email) },
            ])
            }/>
          </View>
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
    top: 10,
    // backgroundColor: "yellow",
  },
  buttonLeftContainer: {
    width: "90%",
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  buttonRightContainer: {
    width: "10%",
    // backgroundColor: "red",
    justifyContent: "center"
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
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 175,
    backgroundColor: "white",
    borderRadius: 24
  },
  modalHeadingText: {
    fontSize: 25,
    color: "purple",
    textAlign: "center",
    // left: 50,
    bottom : 10
  },
  modalButtonContainer: {
    top: 20,
    width: "75%",
    flexDirection: "row",
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  modalContentText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    top: 5
  }
});

export default AccountScreen;
