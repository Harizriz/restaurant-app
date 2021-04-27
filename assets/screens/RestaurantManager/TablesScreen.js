import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

class TablesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
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
    // refresh the tables list
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("EditTableScreen", {tableId: item.qrCodeValue, pax: item.paxValue})}>
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
                <View style={{top: 6}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("QrCodeManagerScreen")}
                    underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Add Table</Text>
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
        alignItems: "stretch",
    },
    headingContainer: {
        height: 125,
        justifyContent: "center"
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        alignSelf: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 7,
        marginHorizontal: 7,
        width: Dimensions.get('window').width * 0.3,
        height: 101,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center'  
    },
    title: {
        fontSize: 32,
    },
    content: {
        top: 5,
        fontSize: 24,
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

export default TablesScreen;