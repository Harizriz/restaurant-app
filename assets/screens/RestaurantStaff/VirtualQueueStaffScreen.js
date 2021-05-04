import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import settings from "../../../settings";

class VirtualQueueStaffScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
            isRefresh: false
        };
    }
    componentDidMount = () => {
        fetch(settings.ipAddress+`/api/virtualQueue/list`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
    }
    // refresh virtual queue list
    onRefresh() {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(settings.ipAddress+`/api/virtualQueue/list`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        });

        setTimeout(() => {
            this.setState({ isRefresh: false })
        }, 1000)
    }
    removeCustomer = (queueNumber) => {
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
    }
    render() {
        const Item = ({ virtualQueueNumber, pax }) => (
            <View style={styles.item}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{virtualQueueNumber}</Text>
                    <Text style={styles.pax}>{pax} pax</Text>
                </View>
            </View>
        );
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => 
                Alert.alert("Notify Customer?", "", [
                    { text: "Cancel", onPress: () => console.log("cancelled!") },
                    { text: "Notify", onPress: () => this.removeCustomer(item.virtualQueueNumber) },
                ])}>
                <Item 
                    virtualQueueNumber={item.virtualQueueNumber} 
                    pax={item.pax} 
                />
            </TouchableOpacity>
        );
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Virtual Queue Screen</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.titleText}>People in Line</Text>
                    <Text style={styles.body}>{this.state.dataSource.length}</Text>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefresh}
                />
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
    titleText: {
        fontSize: 30,
        bottom: 10,
        fontWeight: "bold"
    },
    body: {
        fontSize: 25,
        top: 10
    },
    item: {
        borderColor: "black",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
    },
    itemContainer: {
        flexDirection: "row"
    },
    title: {
        fontSize: 25,
        width: "80%"
    },
    pax: {
        fontSize: 25,
        width: "20%",
        right: 5,
        textAlign: "right"
    }
});

export default VirtualQueueStaffScreen;