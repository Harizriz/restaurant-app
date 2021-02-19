import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

class QrCodeManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            QRCodeValueHolder: '',
            PaxValueHolder: '',
            viewQrCode: false
        };
    }
    GetValueFunction = async () => {
        const { QRCodeValueHolder, PaxValueHolder } = this.state;

        try {
          let response = await fetch(
            'http://172.20.10.5:5000/api/tables', 
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

        // this.setState({viewQrCode: true})
        
    }
    // renderQrCodeComponent() {
    //     if(this.state.viewQrCode) {
    //         return (
    //             <View style={styles.QRcontainer}>
    //                 {this.state.QRCodeValueHolder ? 
    //                 <QRCode value={this.state.QRCodeValueHolder} 
    //                     size={300}
    //                     backgroundColor="none"/>
    //                 : null}
    //             </View>
    //         )
    //     }
    // }
    render() { 
        let uniqueURL = `http://172.20.10.5:5000/api/tables/${this.state.QRCodeValueHolder}`
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Qr Code Screen</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Table Number ID"
                        placeholderTextColor="gray"
                        style={{
                            height: 50,
                            borderColor: "gray",
                            borderWidth: 2,
                            borderRadius: 10,
                            width: "75%",
                            alignSelf: "center",
                            paddingLeft: 20,
                            marginTop: 20,
                            // top: 20,
                        }}
                        onChangeText={QRCodeValueHolder => this.setState({QRCodeValueHolder})}
                    />    
                    <TextInput
                        placeholder="Pax"
                        placeholderTextColor="gray"
                        style={{
                            height: 50,
                            borderColor: "gray",
                            borderWidth: 2,
                            borderRadius: 10,
                            width: "75%",
                            alignSelf: "center",
                            paddingLeft: 20,
                            marginTop: 20,
                            // top: 20,
                        }}
                        onChangeText={PaxValueHolder => this.setState({PaxValueHolder})}
                    /> 
                </View> 
                <View style={styles.QRcontainer}>
                    {this.state.QRCodeValueHolder ? 
                    <QRCode value={uniqueURL}
                        size={300}
                        backgroundColor="none"/>
                    : null}
                </View> 
                <View style={styles.submitContainer}>
                    <TouchableHighlight onPress={() => this.GetValueFunction()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Create Table</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {/* {this.renderQrCodeComponent()} */}
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
    inputContainer: {
        height: 150,
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
        marginTop: 30
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
        borderColor: "black",
        borderWidth: 2,
        marginTop: 45,
        marginBottom: 45,
        marginLeft: 55,
        marginRight: 55
    },
    submitContainer: {
        height: 150,
        justifyContent: "center",
        alignSelf: "center",
        bottom: 50
    }
});

export default QrCodeManagerScreen;