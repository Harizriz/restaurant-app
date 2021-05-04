import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";
import settings from "../../../settings";

class KitchenOrderScreen extends Component {
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
        fetch(settings.ipAddress+`/api/orders/kitchen/kit`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
    }
    // refresh kitchen order list
    onRefresh() {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(settings.ipAddress+`/api/orders/kitchen/kit`)
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
        const preparedItem = (objectId) => {
            Alert.alert("Dish Prepared?", "", [
                { text: "Cancel", onPress: () => console.log("cancelled!") },
                { text: "Prepared", onPress: () => {
                    fetch(settings.ipAddress+`/api/orders/order/${encodeURI(objectId)}`, {
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
                fetch(settings.ipAddress+`/api/orders/kitchen/kit`)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        dataSource: responseJson
                    });
                })
            }, 3000);
        }
        const Item = ({ dishName, dishQuantity, objectId, dishRemarks }) => (
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
                            color="lightslategrey"
                            size={30}
                            onPress={() => preparedItem(objectId)}
                        />
                    </View>
                </View>
            </View>
        );
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
            let i = 0
            let tableLength = Object.keys(tables).length
            for (i = 0; i < tableLength; i++) {
                const tableId = Object.keys(tables)[i]
                const table = tables[tableId]
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
        flex: 1
    },
    remarksText: {
        fontSize: 20,
    },
    number: {
        fontSize: 25,
        alignSelf: "center"
    },
});

export default KitchenOrderScreen;