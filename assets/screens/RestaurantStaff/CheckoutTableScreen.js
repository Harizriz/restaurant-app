import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

class CheckoutTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

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
    render() {
        const Item = ({ qrCodeValue, paxValue }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{qrCodeValue}</Text>
              <Icon name="chair-school" color="gray" size={26}/>
              <Text style={styles.content}>pax: {paxValue}</Text>
            </View>
        );
        
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => 
                Alert.alert("Checkout Table", "Are you sure you want to checkout the table?", [
                    { text: "Cancel", onPress: () => console.log("cancelled!") },
                    { text: "Confirm", onPress: () => console.log("checkout!") },
                ])}>
                <Item qrCodeValue={item.qrCodeValue} paxValue={item.paxValue}/>
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