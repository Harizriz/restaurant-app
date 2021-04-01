import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import Button from 'react-native-button'

class EditTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isDisabled: true,
            oldPaxValueHolder: '',
            newPaxValueHolder: '',
            firstButtonText: "Delete",
            secondButtonText: "Edit"
        };
    }
    componentDidMount = () => {
        const pax = this.props.route.params.pax;
        this.setState({
            newPaxValueHolder: pax
        })
    }
    EditAndUpdatePaxValue = () => {
        const { newPaxValueHolder } = this.state;

        this.setState({
            isDisabled: false,
            firstButtonText: "Cancel",
            secondButtonText: "Update"
        })
        if (this.state.secondButtonText == "Update") {
            this.setState({
                isDisabled: true,
                firstButtonText: "Delete",
                secondButtonText: "Edit"
            })
            const tableId = this.props.route.params.tableId;
            fetch(`http://172.20.10.5:5000/api/tables/${encodeURI(tableId)}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableId: tableId,
                    newPaxValue: newPaxValueHolder
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
            })

            Alert.alert("Well done", "Table updated successfully!",
            { text: "Okay" });

        }
    }
    DeleteTable = async () => {
        const tableId = this.props.route.params.tableId;
        Alert.alert("Delete Table", "Are you sure you want to delete the table permanently?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Delete", onPress: () => {
                fetch(`http://172.20.10.5:5000/api/tables/${encodeURI(tableId)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tableId: tableId
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                }),
                this.props.navigation.goBack();
                }
            },
        ])
    }
    render() {
        const tableId = this.props.route.params.tableId;
        const pax = this.props.route.params.pax;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Edit Table</Text>
                </View>
                <View style={styles.promptContainer}>
                    <View style={styles.inputContainer}>
                        {/* https://callstack.github.io/react-native-paper/text-input.html */}
                        <TextInput
                            label="  Table Number ID  "
                            mode="outlined"
                            placeholder="Eg. 1"
                            value={tableId}
                            disabled="true"
                            style={{
                                top: 20,
                            }}
                        />
                        <TextInput
                            label="  Pax  "
                            mode="outlined"
                            keyboardType="number-pad"
                            placeholder="Eg. 4"
                            defaultValue={pax}
                            disabled={this.state.isDisabled}
                            style={{
                                top: 40
                            }}
                            onChangeText={newPaxValueHolder => this.setState({newPaxValueHolder})}
                        />
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <Button
                        style={{
                        padding: 16,
                        width: 150,
                        borderRadius: 24,
                        alignItems: "center",
                        backgroundColor: "purple",
                        color: "white",
                        overflow: "hidden",
                        top: 30,
                        right: 10
                        }}
                        onPress={() => {
                            this.state.firstButtonText == "Delete" ?
                            this.DeleteTable() :
                            this.setState({ firstButtonText: "Delete", secondButtonText: "Edit", isDisabled: true })
                        }}
                    >
                        {this.state.firstButtonText}
                    </Button>
                    <Button
                        style={{
                        padding: 16,
                        width: 150,
                        borderRadius: 24,
                        alignItems: "center",
                        backgroundColor: "purple",
                        color: "white",
                        overflow: "hidden",
                        top: 30,
                        left: 10,
                        }}
                        onPress={() => {
                            this.EditAndUpdatePaxValue();
                        }}
                    >
                        {this.state.secondButtonText}
                    </Button>
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
    promptContainer: {
        height: 200,
        alignItems: "center"
    },
    inputContainer: {
        width: "75%",
    },
    submitContainer: {
        height: 100,
        flexDirection: "row",
        alignSelf: "center",
    },
});

export default EditTableScreen;