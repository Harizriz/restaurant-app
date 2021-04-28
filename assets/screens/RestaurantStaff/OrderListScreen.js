import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";

class OrderListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
            tableArray: [],
            expanded: false,
            showTable: {},
            isRefresh: false
        };
    }
    componentDidMount = () => {
        fetch(`http://172.20.10.5:5000/api/orders`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
    }
    onRefresh() {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(`http://172.20.10.5:5000/api/orders`)
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
        let tableTree = {};
        for(let i=0; i<this.state.dataSource.length; i++) {
            this.state.tableArray.push(this.state.dataSource[i].tableId)
            if (tableTree[this.state.dataSource[i].tableId]){
                tableTree[this.state.dataSource[i].tableId].push(this.state.dataSource[i])
            }
            else {
                tableTree[this.state.dataSource[i].tableId] = [this.state.dataSource[i]]
            }
        }
        const preparedItem = (objectId, preparedDish) => {
            if (!preparedDish) {
                Alert.alert("Dish Served?", "", [
                    { text: "Cancel", onPress: () => console.log("cancelled!") },
                    { text: "Prepared", onPress: () => {
                        preparedDish = true;

                        fetch(`http://172.20.10.5:5000/api/orders/order/${encodeURI(objectId)}`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            objectId: objectId,
                            preparedItem: preparedDish
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
                    fetch(`http://172.20.10.5:5000/api/orders`)
                    .then(response => response.json())
                    .then(responseJson => {
                        this.setState({
                            dataSource: responseJson
                        });
                    })
                }, 3000);
            }
        }
        const Item = ({ dishName, dishQuantity, objectId, preparedDish, dishRemarks }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.quantityContainer}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number}>{dishQuantity}</Text>
                        </View>
                    </View>
                    <View style={styles.foodContainer}>
                        <View style={styles.foodNameContainer}>
                            <Text style={styles.text}>{dishName}</Text>
                        </View>
                    { dishRemarks ? 
                        <View style={styles.foodRemarksContainer}>
                            <Text style={styles.remarksText}>{dishRemarks}</Text>
                        </View>
                        :
                        null
                    }
                    </View>
                    <View style={styles.editContainer}>
                        <View style={styles.icon}>
                            <Icon 
                                name="done" 
                                color={preparedDish ? "limegreen" : "lightslategrey" }
                                size={30}
                                onPress={() => preparedItem(objectId, preparedDish)}
                            />
                        </View>
                    </View>
                </View>
            ); 
        }
        const renderItem = ({ item }) => {
            return (
                <View>
                    <Item dishName={item.dishName} 
                    dishQuantity={item.dishQuantity}
                    objectId={item.objectId}
                    preparedDish={item.preparedDish}
                    dishRemarks={item.dishRemarks}/>
                </View>
            ); 
        }
        const renderTables = ( tables ) => {
            let tableJSX = []
            let tableLength = Object.keys(tables).length
            for (let i = 0; i < tableLength; i++) {
                const tableId = Object.keys(tables)[i]
                const table = tables[tableId]  
                let tableAND = true
                for (let i=0; i<table.length; i++) {
                    tableAND = tableAND && table[i].preparedDish
                }
                if (tableAND && table[i].preparedDish) {
                    fetch(`http://172.20.10.5:5000/api/orders/waiter/${encodeURI(table[i].tableId)}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tableId: table[i].tableId,
                        })
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson)
                    })

                    // reload the screen after deleting
                    setTimeout(() => {
                        fetch(`http://172.20.10.5:5000/api/orders`)
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState({
                                dataSource: responseJson
                            });
                        })
                    }, 3000);
                }
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
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isRefresh}
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
                    <Text style={styles.headingText}>Order List</Text>
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
        borderColor: "black",
        borderWidth: 1,
        padding: 15,
        marginVertical: 1,
        marginHorizontal: 16,
        flexDirection: "row"
    },
    quantityContainer: {
        width: "15%",
        justifyContent: "center",
    },
    numberContainer: {
        height: 30,
        width: 30,
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    foodContainer: {
        height: 50,
        width: "70%",
        paddingLeft: 10,
        justifyContent: "center",
        flexDirection: "column",
    },
    foodNameContainer: {
        height: 25,
    },
    foodRemarksContainer: {
        height: 25,
    },
    editContainer: {
        height: 50,
        width: "15%",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
    },
    remarksText: {
        fontSize: 20,
    },
    number: {
        fontSize: 25,
        alignSelf: "center"
    },
});

export default OrderListScreen;