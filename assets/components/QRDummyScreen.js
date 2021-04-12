import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg';

class QRDummyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }
    render() { 
        let navigateScreen = 'aqFl0LxbRN'
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Qr Code Screen</Text>
                </View>
                <View style={styles.QRcontainer}>
                    <QRCode value={navigateScreen}
                        size={300}
                        backgroundColor="none"/>
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
        height: 100,
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    inputContainer: {
        width: "75%",
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        // marginHorizontal: 100,
        // paddingBottom: 25,
        // borderRadius: 24,
        // backgroundColor: "yellow"
    },
    button: {
        alignItems: "center",
        backgroundColor: "purple",
        padding: 15,
        borderRadius: 24,
        width: 250,
    },
    text: {
        fontSize: 20,
        color: "white"
    },
    QRcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        // borderColor: "black",
        // borderWidth: 2,
        // marginTop: 53,
        // marginBottom: 53,
        // marginLeft: 55,
        // marginRight: 55
    },
    submitContainer: {
        height: 150,
        justifyContent: "center",
        alignSelf: "center",
        bottom: 60
    },
    promptContainer: {
        height: 160,
        alignItems: "center",
        // backgroundColor: "red"
    },
});

export default QRDummyScreen;