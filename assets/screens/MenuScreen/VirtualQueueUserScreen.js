import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import settings from "../../../settings";

class VirtualQueueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaxValueHolder: '',
            isError: false,
            currentQueueNumber: '',
            counter: 1,
            dataSource: '',
            dataSourceLogin: '',
            peopleInLine: '',
            email: this.props.route.params.emailData,
            initialQueueNumber: '',
            queueNumber: '',
            changeRender: false
        };
    } 
    componentDidUpdate = () => {
        try {
            if(this.state.counter == 2 && this.state.currentQueueNumber != this.props.route.params.queueNumber) {
                this.setState({
                    currentQueueNumber: this.props.route.params.queueNumber
                })
            }
            if(this.state.changeRender && this.state.currentQueueNumber == this.props.route.params.queueNumber) {
                this.setState({
                    currentQueueNumber: null
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    componentDidMount = () => {
        this.props.navigation.navigate("MainMenuScreen", { params: { emailData: this.props.route.params.emailData }, screen: "Menu" })

        setTimeout(() => {
            fetch(settings.ipAddress+`/api/virtualQueue/list`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 2000)

        this.props.navigation.addListener('focus', () => {
            fetch(settings.ipAddress+`/api/virtualQueue/list`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        });
    }
    Proceed = async (pax) => {
        if(pax == '' || pax == 0) {
            this.setState({
                isError: true
            })
        }
        else {
            this.setState({
                isError: false
            })

            await fetch(settings.ipAddress+`/api/user/lastuser`)
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                dataSourceLogin: responseJson[0]
              });
            })

            // if there is no user logged into the virtual queue
            // create a new one
            if (this.state.dataSourceLogin == null) {
                try {
                    let response = await fetch(
                    settings.ipAddress+'/api/user', 
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            counter: 101
                        })
                    }
                    );
                    let json = await response.json();

                    this.setState({
                        initialQueueNumber: json.counter
                    })
                }
                catch (error) {

                }
                this.props.navigation.navigate("VirtualQueueQRScreen", {pax: pax, queueNumber: this.state.initialQueueNumber})
                this.setState({ counter: this.state.counter + 1 });
            }
            else {
                try {
                    let response = await fetch(
                        settings.ipAddress+'/api/user', 
                        {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: this.state.email,
                                counter: this.state.dataSourceLogin.counter + 1
                            })
                        }
                    );
                    let json = await response.json();
                    
                    this.setState({
                        queueNumber: json.counter
                    })

                }
                catch (error) {

                }
                this.props.navigation.navigate("VirtualQueueQRScreen", {pax: pax, queueNumber: this.state.queueNumber})
                this.setState({ counter: this.state.counter + 1 });
            }
        }
    } 
    LeaveQueue = () => {
        let queueNumber = this.state.currentQueueNumber
        Alert.alert("Leaving Queue", "Are you sure you want to leave the queue?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Confirm", onPress: () => {
                fetch(settings.ipAddress+`/api/virtualQueue/${encodeURI(queueNumber)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        queueNumber: queueNumber
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                })

                fetch(settings.ipAddress+`/api/user/${encodeURI(queueNumber)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        queueNumber: queueNumber
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                })           
                
                this.setState({
                    changeRender: true,
                    currentQueueNumber: null
                })

                setTimeout(() => {
                    fetch(settings.ipAddress+`/api/virtualQueue/list`)
                    .then(response => response.json())
                    .then(responseJson => {
                        this.setState({
                            dataSource: responseJson
                        });
                    })
                }, 1000)

                } 
            },
        ])   
    }
    render() {     
        const renderMainScreen = () => {
            return(
                <View>
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>People in Line</Text>
                        <Text style={styles.body}>{this.state.dataSource.length}</Text>
                    </View>
                    <View style={styles.paxContainer}>
                        <Text style={styles.title}>Pax</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="  Pax  "
                                mode="outlined"
                                keyboardType="number-pad"
                                placeholder="Eg. 4"
                                returnKeyType="done"
                                error={this.state.isError}
                                style={{
                                    top: 10
                                }}
                                onChangeText={newPaxValueHolder => this.setState({newPaxValueHolder})}
                            />
                        </View>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity onPress={() => this.Proceed(this.state.newPaxValueHolder) }>
                            <View style={styles.button}>
                                <Text style={styles.text}>Proceed</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        const renderAssignedScreen = (queueNumber) => {
            return (
                <View>
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>People in Line</Text>
                        <Text style={styles.body}>{this.state.dataSource.length}</Text>
                    </View>
                    <View style={styles.paxContainer}>
                        <Text style={styles.title}>Current Queue Number</Text>
                        <Text style={styles.body}>100</Text>
                    </View>
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>Queue Number</Text>
                        <Text style={styles.body}>{queueNumber}</Text>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity onPress={() => this.LeaveQueue() }>
                            <View style={styles.button}>
                                <Text style={styles.text}>Leave Queue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Virtual Queue Screen</Text>
                </View>
                { this.state.currentQueueNumber ? 
                    renderAssignedScreen(this.state.currentQueueNumber) : 
                    renderMainScreen() 
                }
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
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    secondContainer: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        bottom: 10,
        fontWeight: "bold"
    },
    body: {
        fontSize: 25,
        top: 10
    },
    paxContainer: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "50%",
    },
    submitContainer: {
        height: 150,
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        alignSelf: "center",
        color: "white"
    },
    button: {
        backgroundColor: "purple",
        padding: 20,
        borderRadius: 30,
        width: "75%",
        alignSelf: "center",
        marginBottom: 20,
    }
});

export default VirtualQueueScreen;