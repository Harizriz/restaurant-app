import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Alert } from "react-native";
import Button from "react-native-button";
import NumInput from "react-native-numeric-input";
import { TextInput } from 'react-native-paper'

class DishDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            remarksValueHolder: '',
            dishQuantityHolder: '',
            preparedItem: false
        };
    }
    AddCart = async () => {
        const dishName = this.props.route.params.dishName;
        const dishPrice = this.props.route.params.dishPrice;
        const tableId = this.props.route.params.tableId;
        console.log("Detail Added " + tableId)

        if (tableId == null) {
            Alert.alert("Error", "You have not scan a table QR code", [
                { text: "Okay", onPress: () => this.props.navigation.navigate("MainMenuScreen", { screen: "Menu" })},
            ])
        }
        else {
            const { remarksValueHolder, dishQuantityHolder, preparedItem } = this.state;
        
            // post to Order
            try {
                let response = await fetch(
                'http://172.20.10.5:5000/api/orders', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dishName: dishName,
                        dishPrice: dishPrice,
                        dishQuantity: dishQuantityHolder,
                        dishRemarks: remarksValueHolder,
                        tableId: tableId,
                        preparedItem: preparedItem
                    })
                }
                );
                let json = await response.json();
                console.log(json); 

                Alert.alert(json.msg, "",
                { text: "Okay", onPress: () => console.log("Successful") });

            } catch (error) {
                console.error(error);
            }

            // post to Kitchen Order
            try {
                let response = await fetch(
                'http://172.20.10.5:5000/api/orders/kitchen', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dishName: dishName,
                        dishPrice: dishPrice,
                        dishQuantity: dishQuantityHolder,
                        dishRemarks: remarksValueHolder,
                        tableId: tableId,
                        preparedItem: preparedItem
                    })
                }
                );
                let json = await response.json();
                console.log(json); 

            } catch (error) {
                console.error(error);
            }

            this.props.navigation.goBack();

        }

    }
    render() {
        const dishId = this.props.route.params.dishId;
        const dishName = this.props.route.params.dishName;
        const dishDescription = this.props.route.params.dishDescription;
        const dishPrice = this.props.route.params.dishPrice;
        const tableId = this.props.route.params.tableId;
        console.log("Detail " + tableId)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{dishName}</Text>
                </View>
                {/* this is an image example */}
                <View style={styles.imageContainer}>
                    <Image
                    style={styles.image}
                    source={require("../../garlic_bread.png")}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                    {dishDescription}
                    </Text>
                    <Text style={styles.price}>RM {dishPrice}</Text>
                </View>
                <View style={styles.remarksContainer}>
                    <TextInput
                        label="  Additional Information  "
                        mode="outlined"
                        style={{
                        }}
                        onChangeText={remarksValueHolder => this.setState({remarksValueHolder})}
                    />
                </View>
                <View style={styles.numberInputContainer}>
                    <NumInput
                        style={styles.numberInput}
                        onChange={(dishQuantityHolder) => this.setState({dishQuantityHolder})}
                        totalWidth={150}
                        totalHeight={40}
                        iconSize={25}
                        step={1}
                        valueType="real"
                        rounded
                        minValue={0}
                        textColor="black"
                        iconStyle={{ color: "white" }}
                        rightButtonBackgroundColor="purple"
                        leftButtonBackgroundColor="purple"
                        // https://www.npmjs.com/package/react-native-numeric-input
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                    style={{
                        padding: 16,
                        width: 250,
                        borderRadius: 24,
                        alignSelf: "center",
                        backgroundColor: "purple",
                        color: "white",
                        overflow: "hidden",
                    }}
                    onPress={() => this.AddCart()}
                    >
                    Add to cart
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
        alignItems: "stretch",
    },
    titleContainer: {
        height: 100,
    },
    title: {
        fontSize: 35,
        color: "purple",
        top: 40,
        alignSelf: "center"
    },
    imageContainer: {
        height: 220,
        justifyContent: "center",
    },
    image: {
        height: 200,
        width: "90%",
        borderColor: "black",
        borderWidth: 1,
        alignSelf: "center",
    },
    descriptionContainer: {
        height: 100,
    },
    description: {
        fontSize: 15,
        color: "black",
        width: "90%",
        top: 20,
        alignSelf: "center",
    },
    price: {
        fontSize: 30,
        color: "black",
        width: "90%",
        top: 35,
        alignSelf: "center",
    },
    numberInputContainer: {
        height: 140,
        top: 30,
        alignItems: "center",
    },
    buttonContainer: {
        height: 100,
    },
    remarksContainer: {
        height: 110,
        marginHorizontal: "6%",
        justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "yellow"
    },
});

export default DishDetailsScreen;