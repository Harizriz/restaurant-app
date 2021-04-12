import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';

class VirtualQueueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaxValueHolder: '',
            isError: false,
            currentQueueNumber: '',
            counter: 1
        };
    } 
    componentDidUpdate = () => {
        console.log("test")
        // try {
            if(this.state.counter == 2 && this.state.currentQueueNumber != this.props.route.params.queueNumber) {
                console.log(this.props.route.params.queueNumber)
                this.setState({
                    currentQueueNumber: this.props.route.params.queueNumber
                })
            }
        // }
        // catch (error) {
            
        // }
    }
    // componentDidMount = () => {
    //     setTimeout(() => {
    //         try {
    //             if(this.state.counter == 2) {
    //                 console.log(this.props.route.params.queueNumber)
    //                 this.setState({
    //                     currentQueueNumber: this.props.route.params.queueNumber
    //                 })
    //             }
    //         }
    //         // else {
    //         //     console.log("nope")
    //         // }
    //         catch (error) {
                
    //         }
    //     }, 1000);
    // }
    Proceed = (pax) => {
        if(pax == '' || pax == 0) {
            this.setState({
                isError: true
            })
        }
        else{
            this.setState({
                isError: false
            })
            this.props.navigation.navigate("VirtualQueueQRScreen", {pax: pax})
            this.setState({ counter: this.state.counter + 1 });
        }
    } 
    LeaveQueue = () => {
        Alert.alert("Leaving Queue", "Are you sure you want to leave the queue?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            // { text: "Confirm", onPress: () => this.Proceed() },
            { text: "Confirm", onPress: () => console.log("confirm!") },
        ])
    }
    render() {
        console.log("counter", this.state.counter)
        console.log(this.props.route.name)
        console.log(this.props)

        const renderMainScreen = () => {
            return(
                <View>
                    <View style={styles.secondContainer}>
                        <Text style={styles.title}>People in Line</Text>
                        <Text style={styles.body}>9</Text>
                    </View>
                    <View style={styles.paxContainer}>
                        <Text style={styles.title}>Pax</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="  Pax  "
                                mode="outlined"
                                keyboardType="number-pad"
                                placeholder="Eg. 4"
                                // defaultValue={pax}
                                // disabled={this.state.isDisabled}
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
                        <Text style={styles.body}>9</Text>
                    </View>
                    <View style={styles.paxContainer}>
                        <Text style={styles.title}>Current Queue Number</Text>
                        <Text style={styles.body}>109</Text>
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
        // backgroundColor: "yellow",
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