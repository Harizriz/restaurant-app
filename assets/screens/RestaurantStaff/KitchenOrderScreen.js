import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";

class KitchenOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
            tableArray: [],
            expanded: false,
            showTable: {}
        };
    }
    componentDidMount = () => {
        fetch(`http://172.20.10.5:5000/api/orders/kitchen/kit`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
    }
    render() {
        let tableTree = {};
        for(let i=0; i<this.state.dataSource.length; i++) {
            // console.log(this.state.dataSource[i].tableId)
            this.state.tableArray.push(this.state.dataSource[i].tableId)
             // console.log(this.state.tableArray)
            if (tableTree[this.state.dataSource[i].tableId]){
                tableTree[this.state.dataSource[i].tableId].push(this.state.dataSource[i])
            }
            else {
                tableTree[this.state.dataSource[i].tableId] = [this.state.dataSource[i]]
            }

        }
        const preparedItem = (objectId) => {

            Alert.alert("Dish Prepared?", "", [
                { text: "Cancel", onPress: () => console.log("cancelled!") },
                { text: "Prepared", onPress: () => {
                    fetch(`http://172.20.10.5:5000/api/orders/order/${encodeURI(objectId)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        objectId: objectId,
                    })
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson)
                    })
                }
            },
            ]);

            // reload the screen after updating
            setTimeout(() => {
                fetch(`http://172.20.10.5:5000/api/orders/kitchen/kit`)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        dataSource: responseJson
                    });
                })
            }, 3000);

        }
        const Item = ({ dishName, dishQuantity, objectId, preparedDish }) => (
            <View style={styles.itemContainer}>
                <View style={styles.quantityContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.number}>{dishQuantity}</Text>
                    </View>
                </View>
                <View style={styles.foodContainer}>
                    <Text style={styles.text}>{dishName}</Text>
                </View>
                <View style={styles.editContainer}>
                    <View style={styles.icon}>
                        <Icon 
                            name="done" 
                            color="lightslategrey"
                            size={30}
                            onPress={() => preparedItem(objectId)}
                        />
                    </View>
                </View>
            </View>
        );
        const renderItem = ({ item }) => {
            // console.log('item', item)
            return (
                <View>
                    <Item dishName={item.dishName} 
                    dishQuantity={item.dishQuantity}
                    objectId={item.objectId}
                    preparedDish={item.preparedDish}/>
                </View>
        ); }
        const renderTables = ( tables ) => {
            let tableJSX = []
            let i = 0
            let tableLength = Object.keys(tables).length
            for (i = 0; i < tableLength; i++) {
                const tableId = Object.keys(tables)[i]
                // console.log(tableId)
                const table = tables[tableId]
                // console.log(table)
                tableJSX.push(
                    <View>
                        <TouchableOpacity onPress={() => {
                            let tableList = this.state.showTable
                            tableList[tableId] = !tableList[tableId]
                            this.setState({showTable: tableList})
                            }}>
                            <View style={styles.item}>
                                <Text style={styles.title}>Table {tableId}</Text>     
                            </View>
                        </TouchableOpacity>
                        { this.state.showTable[tableId] ? 
                        <View>
                            <FlatList
                                data={table}
                                renderItem={renderItem}
                                keyExtractor={item => item.objectId}
                            />
                        </View>
                        : null }
                    </View>
                )
            }
            return ( 
                <ScrollView>
                    {tableJSX}
                </ScrollView>
                )
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Kitchen Order Screen</Text>
                </View>
                { renderTables (tableTree) }
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
        borderColor: "black",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 25,
    },
    itemContainer: {
        // height: 50,
        // backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 16,
        flexDirection: "row"
    },
    quantityContainer: {
        // height: 50,
        width: "15%",
        // backgroundColor: "red",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: "black"
    },
    numberContainer: {
        height: 30,
        width: 30,
        // backgroundColor: "pink",
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    foodContainer: {
        height: 50,
        width: "70%",
        paddingLeft: 10,
        // backgroundColor: "lightblue",
        justifyContent: "center"
    },
    editContainer: {
        height: 50,
        width: "15%",
        // backgroundColor: "lightgreen",
        // justifyContent: "center"
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
    },
    number: {
        fontSize: 25,
        alignSelf: "center"
    },
});

export default KitchenOrderScreen;