import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, Button, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NumInput from "react-native-numeric-input";
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CartPageScreen extends Component {
    state = { 
        isModalVisible: false,
        setModalVisible: false,
        dataSource: '',
        newQuantityValueHolder: 0,
        itemId: '',
        itemName: '',
        totalPrice: '',
        tableId: ''
    }
    componentDidMount = async () => {
        if(this.props.route.params.screenName == "QrCodeScreen") {
            console.log("This is from QRCodeScreen")
            const { navigate }  = this.props.navigation;
            let tableOrderId = this.props.route.params.tableId;
            console.log(tableOrderId)
            this.setState({
                tableId: tableOrderId
            })
            console.log(this.state.tableId)
            fetch(`http://172.20.10.5:5000/api/orders`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
            .then(response => {
                navigate('MainMenuScreen', {screen: "Menu", params: {tableId: tableOrderId}});
            });
        }
        else {
            console.log("This is not from QRCodeScreen")
            fetch(`http://172.20.10.5:5000/api/orders`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            });
            let tableOrderId = this.props.route.params.tableId;
            console.log("Cart " + tableOrderId)
        }
    }   
    // delete an item from order
    deleteItem = (id) => {
        const dishId = id

        fetch(`http://172.20.10.5:5000/api/orders/${encodeURI(dishId)}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dishId: dishId,
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
        })

        this.setState({
            isModalVisible: false
        })

        setTimeout(() => {
            fetch(`http://172.20.10.5:5000/api/orders`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 1000) 
    }
    // when updating, need to get the tableNumber
    updateValue = (id) => {
        const { newQuantityValueHolder } = this.state;
        const dishId = id

        // remove item from cart if input is 0
        if(newQuantityValueHolder == 0) {
            fetch(`http://172.20.10.5:5000/api/orders/${encodeURI(dishId)}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dishId: dishId,
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
            })

            this.setState({
                isModalVisible: false
            })

            setTimeout(() => {
                fetch(`http://172.20.10.5:5000/api/orders`)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        dataSource: responseJson
                    });
                })
            }, 1000) 

        }
        else {
            fetch(`http://172.20.10.5:5000/api/orders/${encodeURI(dishId)}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dishId: dishId,
                    newItemQuantityValue: newQuantityValueHolder
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
            })

            this.setState({
                isModalVisible: false
            })

            setTimeout(() => {
                fetch(`http://172.20.10.5:5000/api/orders`)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        dataSource: responseJson
                    });
                })
            }, 1500) 

        }

    }
    render() {
        let tableOrderId = this.props.route.params.tableId;
        console.log("Cart render " + tableOrderId)
        // calculate total price for cart
        let totalPrice = 0;
        // put an if statement here if the tableId is the same from the 
        // scanned QR code then can loop to find the orders with the same and current tableId
        for(let i = 0; i < this.state.dataSource.length; i++) {
            totalPrice += this.state.dataSource[i].dishQuantity * this.state.dataSource[i].dishPrice
        }
        totalPrice = totalPrice.toFixed(2)

        // let tableOrderId = this.props.route.params.tableId;
        // console.log(tableOrderId)

        const toggleModal = () => {
            if(this.state.isModalVisible == false) {
                this.setState({
                    isModalVisible: true
                })
            }
            else {
                this.setState({
                    isModalVisible: false
                })
            }
        }
        const Item = ({ dishName, dishQuantity, dishPrice, dishRemarks, objectId }) => (
            <View style={styles.item}>
                <View style={styles.itemContainer}>
                    <View style={styles.quantityContainer}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number}>{dishQuantity}</Text>
                        </View>
                    </View>
                    <View style={styles.foodContainer}>
                        <Text style={styles.text}>{dishName}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.text}>RM {dishPrice = (dishPrice * dishQuantity).toFixed(2)}</Text>
                    </View>
                    <View style={styles.editContainer}>
                        <View style={styles.icon}>
                            <Icon 
                                name="edit" 
                                color="black" 
                                size={20} 
                                style={{right: 7}}
                                onPress={() => {
                                    this.setState({ newQuantityValueHolder: dishQuantity, 
                                        itemId: objectId,
                                        itemName: dishName }, 
                                        toggleModal);
                                }}
                            />
                            <DeleteIcon 
                                name="delete-outline" 
                                color="black" 
                                size={20}
                                style={{left: 10}}
                                onPress={() => this.deleteItem(objectId)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        ); 
        const renderItem = ({ item }) => (
            <Item 
                dishName={item.dishName} 
                dishQuantity={item.dishQuantity} 
                dishPrice={item.dishPrice} 
                dishRemarks={item.dishRemarks} 
                objectId={item.objectId} 
            />
        );
        return ( 
        <SafeAreaView style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Cart</Text>
            </View>
            <Modal 
                isVisible={this.state.isModalVisible}
                animationOutTiming={1}
                onBackdropPress={() => toggleModal()}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeadingText}>{this.state.itemName}</Text>
                    <NumInput
                        value={this.state.newQuantityValueHolder}
                        containerStyle={{alignSelf: "center", marginTop: 25, marginBottom: 10}}
                        onChange={newQuantityValueHolder => this.setState({newQuantityValueHolder})}
                        totalWidth={150}
                        totalHeight={40}
                        iconSize={25}
                        step={1}
                        valueType="real"
                        rounded
                        minValue={0}
                        textColor="black"
                        iconStyle={{ color: "white" }}
                        rightButtonBackgroundColor="lightblue"
                        leftButtonBackgroundColor="lightblue"
                        // https://www.npmjs.com/package/react-native-numeric-input
                    />
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.leftButtonContainer}>
                            <Button title="Cancel" onPress={toggleModal}/>                        
                        </View>
                        <View style={styles.rightButtonContainer}>
                            <Button title="Update" onPress={() => this.updateValue(this.state.itemId)}/>                        
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={this.state.dataSource}
                renderItem={renderItem}
                keyExtractor={(item) => item.objectId}
                extraData={this.state}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>RM {totalPrice}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentScreen", 
                    {cartTotalPrice: totalPrice,
                    tableId: tableOrderId}
                    )}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
     );
  }
}
 
export default CartPageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // backgroundColor: "purple"
    },
    headingContainer: {
        height: 125,
        // backgroundColor: "yellow",
        justifyContent: "center"
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        alignSelf: "center"
    },
    itemContainer: {
        height: 50,
        // backgroundColor: "yellow",
        flexDirection: "row"
    },
    quantityContainer: {
        height: 50,
        width: "15%",
        // backgroundColor: "red",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: "black"
    },
    numberContainer: {
        height: 20,
        width: 20,
        // backgroundColor: "pink",
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    foodContainer: {
        height: 50,
        width: "40%",
        // backgroundColor: "lightblue",
        justifyContent: "center"
    },
    priceContainer: {
        height: 50,
        width: "20%",
        // backgroundColor: "pink",
        justifyContent: "center"
    },
    editContainer: {
        height: 50,
        width: "25%",
        // backgroundColor: "lightgreen",
        // justifyContent: "center"
        justifyContent: "center",
    },
    totalContainer: {
        height: 70,
        // backgroundColor: "lightblue",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    dialogContentContainer: {
        justifyContent: "center",
        // backgroundColor: "yellow"
    },
    text: {
        fontSize: 17,
    },
    number: {
        fontSize: 17,
        alignSelf: "center"
    },
    icon: {
        flexDirection: "row",
        alignSelf: "center",
    },
    dialogText: {
        fontSize: 20,
        alignSelf: "center",
        paddingTop: 30
    },
    item: {
        borderColor: "black",
        borderWidth: 1,
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        // backgroundColor: "yellow"
    },
    buttonText: {
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
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        backgroundColor: "white",
        borderRadius: 24
    },
    modalHeadingText: {
        fontSize: 25,
        color: "purple",
        alignSelf: "center",
    },
    modalButtonContainer: {
        top: 20,
        width: "100%",
        flexDirection: "row",
        // backgroundColor: "yellow",
        justifyContent: "space-around",
    },
    leftButtonContainer: {
        width: "50%",
    },
    rightButtonContainer: {
        width: "50%",
    },
    buttonText: {
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