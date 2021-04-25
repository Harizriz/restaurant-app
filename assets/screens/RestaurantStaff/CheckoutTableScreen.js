import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

class CheckoutTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isRefresh: false
        };
    }
    componentDidMount = async () => {
        fetch(`http://172.20.10.5:5000/api/tables`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
            dataSource: responseJson
            });
        })
        // auto-refresh the screen
        this.props.navigation.addListener('focus', () => {
            fetch(`http://172.20.10.5:5000/api/tables`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                dataSource: responseJson
                });
            })
        });
    }
    onRefresh() {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(`http://172.20.10.5:5000/api/tables`)
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
    render() {
        const Item = ({ qrCodeValue, paxValue, occupant }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{qrCodeValue}</Text>
              <Icon name="chair-school" color={occupant ? "limegreen" : "gray"} size={26}/>
              <Text style={styles.content}>pax: {paxValue}</Text>
            </View>
        );
        
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => 
                Alert.alert("Checkout Table", "Are you sure you want to checkout the table?", [
                    { text: "Cancel", onPress: () => console.log("cancelled!") },
                    { text: "Confirm", onPress: () => 
                        fetch(`http://172.20.10.5:5000/api/tables/checkout/${encodeURI(item.qrCodeValue)}`, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                tableId: item.qrCodeValue,
                                occupyStatus: false
                            })
                        })
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log(responseJson)
                        })
                        .then(setTimeout(() => {
                            fetch(`http://172.20.10.5:5000/api/tables`)
                            .then(response => response.json())
                            .then(responseJson => {
                                this.setState({
                                    dataSource: responseJson
                                });
                            })
                        }, 2000))
                    },
                ])}>
                <Item 
                    qrCodeValue={item.qrCodeValue}
                    paxValue={item.paxValue}
                    occupant={item.occupant} />
            </TouchableOpacity>
        );
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Tables</Text>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    numColumns={3}
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
        // backgroundColor: "yellow",
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        // padding: 20,
        marginVertical: 7,
        marginHorizontal: 7,
        width: Dimensions.get('window').width * 0.3,
        height: 107,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center'  
    },
    title: {
        fontSize: 32,
        // backgroundColor: "yellow"
    },
    content: {
        top: 5,
        fontSize: 24,
        // backgroundColor: "lightblue"
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        color: "white"
    }
});

export default CheckoutTableScreen;