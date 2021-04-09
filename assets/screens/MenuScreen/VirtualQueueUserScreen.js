import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';

class VirtualQueueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaxValueHolder: '',
            isError: false
        };
    }
    Proceed = () => {
        this.props.navigation.navigate("VirtualQueueQRScreen", {pax: this.state.newPaxValueHolder})
    } 
    LeaveQueue = () => {
        Alert.alert("Leaving Queue", "Are you sure you want to leave the queue?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            // { text: "Confirm", onPress: () => this.Proceed() },
            { text: "Confirm", onPress: () => console.log("confirm!") },
        ])
    }
    render() {
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
                        <TouchableOpacity onPress={() => this.Proceed() }>
                            <View style={styles.button}>
                                <Text style={styles.text}>Proceed</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        const renderAssignedScreen = () => {
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
                        <Text style={styles.body}>111</Text>
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
                { renderAssignedScreen() }
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