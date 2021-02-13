import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class AccountManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>My Account</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={
                        () => Alert.alert("Logging Out", "Are you sure you want to log out?", [
                            { text: "Cancel", onPress: () => console.log("cancelled!") },
                            { text: "Log out", onPress: () => this.props.navigation.navigate("MainScreen") },
                        ])}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Log Out</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    headingContainer: {
        height: 125,
    },
        headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 100,
        paddingBottom: 25,
        borderRadius: 24
    },
    button: {
        alignItems: "center",
        backgroundColor: "purple",
        padding: 15,
        borderRadius: 24
    },
    text: {
        fontSize: 20,
        color: "white"
    }
});

export default AccountManagerScreen;