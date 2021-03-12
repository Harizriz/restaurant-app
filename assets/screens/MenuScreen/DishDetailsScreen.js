import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView } from "react-native";
import Button from "react-native-button";
import NumInput from "react-native-numeric-input";

class DishDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };
    }
    render() {
        const dishId = this.props.route.params.dishId;
        const dishName = this.props.route.params.dishName;
        const dishDescription = this.props.route.params.dishDescription;
        const dishPrice = this.props.route.params.dishPrice;

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
                    <Text style={styles.price}>{dishPrice}</Text>
                </View>
                <View style={styles.remarksContainer}>
                    <Text style={styles.remarksTitle}>Additional Information</Text>
                    <TextInput
                    placeholder="E.g. Less sugar"
                    placeholderTextColor="black"
                    style={{
                        height: 50,
                        borderColor: "gray",
                        borderWidth: 2,
                        borderRadius: 5,
                        width: "90%",
                        left: 20,
                        paddingLeft: 20,
                        marginTop: 20,
                        top: 10,
                    }}
                    // onChangeText={(text) => onChangeText(text)}
                    // value={value}
                    />
                </View>
                <View style={styles.numberInputContainer}>
                    <NumInput
                        style={styles.numberInput}
                        onChange={(value) => console.log(value)}
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
                    onPress={() => navigation.navigate("CartPageScreen")}
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
    },
    remarksTitle: {
        fontSize: 20,
        color: "black",
        width: "90%",
        top: 20,
        alignSelf: "center",
    },
});

export default DishDetailsScreen;