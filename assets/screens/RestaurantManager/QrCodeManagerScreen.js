import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg';
import settings from "../../../settings";

class QrCodeManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            QRCodeValueHolder: '',
            PaxValueHolder: '',
            viewQrCode: false,
            isErrorID: false,
            isErrorPax: false
        };
    }
    GetValueFunction = async (ID, Pax) => {

        // validate text input
        if(ID.trim() == "") {
            this.setState({
                QRCodeValueHolder: ID,
                isErrorID: true
            })
        }
        else {
            this.setState({
                QRCodeValueHolder: ID,
                isErrorID: false
            })
        }

        if(Pax.trim() == "") {
            this.setState({
                PaxValueHolder: Pax,
                isErrorPax: true
            })
        }
        else {
            this.setState({
                PaxValueHolder: Pax,
                isErrorPax: false
            })
        }

        const { QRCodeValueHolder, PaxValueHolder } = this.state;

        try {
          let response = await fetch(
            settings.ipAddress+'/api/tables', 
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                qrCodeValue: QRCodeValueHolder,
                paxValue: PaxValueHolder
              })
            }
          );
          let json = await response.json();
          console.log(json);

          if(!json.qrCodeValue || !json.paxValue) {
            Alert.alert("Too bad", json.msg,
            { text: "Okay", onPress: () => console.log("Successful") });
          
            return;
          }

          Alert.alert("Well done", "Table created successfully!",
          { text: "Okay"});

          this.props.navigation.goBack();
    
        } catch (error) {
          console.error(error);
        }        
    }
    render() { 
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Qr Code Screen</Text>
                </View>
                <View style={styles.promptContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="  Table Number ID  "
                            mode="outlined"
                            placeholder="Eg. 1"
                            error={this.state.isErrorID}
                            textContentType="oneTimeCode"
                            keyboardType="number-pad"
                            // next cant be applied because there is no template for this according to react-native-bot
                            // https://github.com/facebook/react-native/issues/26885
                            returnKeyType="done"
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            style={{
                                top: 20,
                                height: 50
                            }}
                            onChangeText={QRCodeValueHolder => this.setState({QRCodeValueHolder})}
                        />    
                        <TextInput
                            label="  Pax  "
                            mode="outlined"
                            placeholder="Eg. 4"
                            error={this.state.isErrorPax}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            ref={(input) => { this.secondTextInput = input; }}
                            style={{
                                top: 40,
                                height: 50
                            }}
                            onChangeText={PaxValueHolder => this.setState({PaxValueHolder})}
                        /> 
                    </View> 
                </View>
                <View style={styles.QRcontainer}>
                    {this.state.QRCodeValueHolder ? 
                    <QRCode value={this.state.QRCodeValueHolder}
                        size={300}
                        backgroundColor="none"/>
                    : null}
                </View> 
                <View style={styles.submitContainer}>
                    <TouchableHighlight onPress={() => this.GetValueFunction(
                            this.state.QRCodeValueHolder,
                            this.state.PaxValueHolder
                        )}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Create Table</Text>
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
        borderColor: "black",
        borderWidth: 2,
        marginTop: 53,
        marginBottom: 53,
        marginLeft: 55,
        marginRight: 55
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
    },
});

export default QrCodeManagerScreen;