import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper'

class AddNewCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            CardNumberValueHolder: '',
            ExpDateValueHolder: '',
            CVVValueHolder: ''
        };
    }
    AddNewCard = () => {
        console.log("Added new card!")
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Add New Card</Text>
                </View>
                <View style={styles.mainPromptContainer}>
                    <View style={styles.mainInputContainer}>
                        {/* https://callstack.github.io/react-native-paper/text-input.html */}
                        <TextInput
                            label="  Card Number  "
                            mode="outlined"
                            textContentType="oneTimeCode"
                            returnKeyType="next"
                            onSubmitEditing={() => { this.dateTextInput.focus(); }}
                            onChangeText={CardNumberValueHolder => this.setState({CardNumberValueHolder})}
                        />
                    </View>
                </View>
                <View style={styles.secondPromptContainer}>
                    <View style={styles.secondInputContainer}>
                        <TextInput
                            label="  Expiration Date  "
                            mode="outlined"
                            keyboardType="number-pad"
                            defaultValue="MM/YY"
                            value={this.state.DishPriceValueHolder}
                            returnKeyType="done"
                            onSubmitEditing={() => { this.CVVTextInput.focus(); }}
                            ref={(input) => { this.dateTextInput = input; }}
                            style={{
                                top: 20,
                                width: "45%"
                            }}
                            onChangeText={ExpDateValueHolder => this.setState({ExpDateValueHolder})}
                        />
                        <TextInput
                            label="  CVV/CVN  "
                            mode="outlined"
                            keyboardType="number-pad"
                            defaultValue="CVC"
                            clearTextOnFocus={true}
                            returnKeyType="done"
                            ref={(input) => { this.CVVTextInput = input; }}
                            style={{
                                top: 20,
                                width: "45%"
                            }}
                            onChangeText={CVVValueHolder => this.setState({CVVValueHolder})}
                        />
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={() => this.AddNewCard()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add Card</Text>
                        </View>
                    </TouchableOpacity>
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
    mainPromptContainer: {
        height: 65,
        alignItems: "center",
        // backgroundColor: "blue"
    },
    mainInputContainer: {
        width: "75%",
    },
    secondPromptContainer: {
        height: 70,
        alignItems: "center",
        // backgroundColor: "red"
    },
    secondInputContainer: {
        width: "75%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        alignItems: "center",
        backgroundColor: "purple",
        padding: 20,
        borderRadius: 30,
        width: 250,
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    submitContainer: {
        height: 150,
        justifyContent: "space-around",
        alignSelf: "center",
        top: 10
    },
});

export default AddNewCardScreen;