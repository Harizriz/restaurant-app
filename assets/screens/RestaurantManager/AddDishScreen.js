import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import ImgToBase64 from 'react-native-image-base64';

class AddDishScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            DishNameValueHolder: '',
            DishPriceValueHolder: '',
            DishDescriptionValueHolder: '',
            menuId: this.props.route.params.menuId,
            imageUri: null,
        };
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({
                imageUri: result.uri
            })
        }

        // console.log(this.state.imageUri)

        // ImgToBase64.getBase64String(this.state.imageUri)
        //     .then(base64String => console.log(base64String))
        //     .catch(err => console.log(err));
 
    };
    AddDish = async () => {

        // convert string to float with two decimals
        let val = this.state.DishPriceValueHolder
        let converted = parseFloat(val)
        let dec = converted.toFixed(2)
        this.state.DishPriceValueHolder = dec

        this.setState({
            imageUri: this.state.imageUri,
        })

        const { DishNameValueHolder, DishPriceValueHolder, DishDescriptionValueHolder, imageUri, menuId } = this.state;

        try {
            let response = await fetch(
              'http://172.20.10.5:5000/api/menus/dishes', 
              {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    menuId: menuId,
                    dishName: DishNameValueHolder,
                    dishPrice: DishPriceValueHolder,
                    dishDescription: DishDescriptionValueHolder,
                    dishImage: imageUri,
                })
              }
            );
            let json = await response.json();
            console.log(json); 

            this.props.navigation.goBack();

            Alert.alert("", json.msg,
            { text: "Okay", onPress: () => console.log("Successful") });

        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Create New Dish</Text>
                </View>
                <View style={styles.promptContainer}>
                    <View style={styles.inputContainer}>
                        {/* https://callstack.github.io/react-native-paper/text-input.html */}
                        <TextInput
                            label="  Name  "
                            mode="outlined"
                            textContentType="oneTimeCode"
                            returnKeyType="next"
                            onSubmitEditing={() => { this.priceTextInput.focus(); }}
                            onChangeText={DishNameValueHolder => this.setState({DishNameValueHolder})}
                        />
                        <TextInput
                            label="  Price  "
                            mode="outlined"
                            value={this.state.DishPriceValueHolder}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.descTextInput.focus(); }}
                            ref={(input) => { this.priceTextInput = input; }}
                            style={{
                                top: 20
                            }}
                            onChangeText={DishPriceValueHolder => this.setState({DishPriceValueHolder})}
                        />
                        <TextInput
                            label="  Description  "
                            mode="outlined"
                            defaultValue="Optional"
                            clearTextOnFocus={true}
                            returnKeyType="done"
                            ref={(input) => { this.descTextInput = input; }}
                            style={{
                                top: 40
                            }}
                            onChangeText={DishDescriptionValueHolder => this.setState({DishDescriptionValueHolder})}
                        />
                    </View>
                </View>
                <View style={styles.uploadContainer}>
                    { this.state.imageUri && <Image source={{ uri: this.state.imageUri }} style={{ width: 250, height: 250 }} />}
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={() => this.pickImage()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Upload Image</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.AddDish()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Create Dish</Text>
                        </View>
                    </TouchableOpacity>
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
        // backgroundColor: "yellow",
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    promptContainer: {
        height: 250,
        alignItems: "center",
        // backgroundColor: "red"
    },
    inputContainer: {
        width: "75%",
    },
    uploadContainer: {
        height: 252,
        width: 252,
        borderWidth: 1,
        borderColor: "black",
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignSelf: "center",
    },
    text: {
        top: 70,
        fontSize: 15,
        left: 20,
        color: "purple",
    },
    button: {
        alignItems: "center",
        backgroundColor: "purple",
        padding: 15,
        borderRadius: 24,
        width: 250,
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    submitContainer: {
        height: 150,
        justifyContent: "space-around",
        alignSelf: "center",
        top: 10
        // backgroundColor: "lightblue"
    },
});

export default AddDishScreen;