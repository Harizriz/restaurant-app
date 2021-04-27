import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

class EditDishScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newDishNameValueHolder: '',
            newDishPriceValueHolder: '',
            newDishDescriptionValueHolder: '',
            newImageUri: '',
            dishId: this.props.route.params.dishId,
            imageUri: null,
        };
    }
    componentDidMount = () => {
        const dishName = this.props.route.params.dishName
        const dishPrice = this.props.route.params.dishPrice
        const dishDescription = this.props.route.params.dishDescription
        // const dishImage = this.props.route.params.dishImage
        this.setState({
            newDishNameValueHolder: dishName,
            newDishPriceValueHolder: dishPrice,
            newDishDescriptionValueHolder: dishDescription
            // newImageUri: dishImage
        })
    }
    changeImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [4, 3],
        //   quality: 1,
        // });
    
        // console.log(result);
    
        // if (!result.cancelled) {
        //     this.setState({
        //         imageUri: result.uri
        //     })
        // }

        // console.log(this.state.imageUri)

        // ImgToBase64.getBase64String(this.state.imageUri)
        //     .then(base64String => console.log(base64String))
        //     .catch(err => console.log(err));
 
    };
    EditDish = async () => {

        // convert string to float with two decimals
        let val = this.state.newDishPriceValueHolder
        let converted = parseFloat(val)
        let dec = converted.toFixed(2)
        this.state.newDishPriceValueHolder = dec

        // this.setState({
        //     imageUri: this.state.imageUri,
        // })

        const { newDishNameValueHolder, newDishPriceValueHolder, newDishDescriptionValueHolder, newimageUri, dishId } = this.state;

        fetch(`http://172.20.10.5:5000/api/menus/dish/${encodeURI(dishId)}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dishId: dishId,
                newDishName: newDishNameValueHolder,
                newDishPrice: newDishPriceValueHolder,
                newDishDescription: newDishDescriptionValueHolder,
                newimageUri: newimageUri
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
        })

        Alert.alert("Well done", "Dish updated successfully!",
        { text: "Okay" });

        this.props.navigation.goBack();

    }
    render() {
        const dishName = this.props.route.params.dishName
        const dishPrice = this.props.route.params.dishPrice
        const dishDescription = this.props.route.params.dishDescription
        // const dishImage = this.props.route.params.dishImage
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Edit Dish</Text>
                </View>
                <View style={styles.promptContainer}>
                    <View style={styles.inputContainer}>
                        {/* https://callstack.github.io/react-native-paper/text-input.html */}
                        <TextInput
                            label="  Name  "
                            mode="outlined"
                            defaultValue={dishName}
                            textContentType="oneTimeCode"
                            returnKeyType="next"
                            onSubmitEditing={() => { this.priceTextInput.focus(); }}
                            onChangeText={newDishNameValueHolder => this.setState({newDishNameValueHolder})}
                        />
                        <TextInput
                            label="  Price  "
                            mode="outlined"
                            defaultValue={dishPrice}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            onSubmitEditing={() => { this.descTextInput.focus(); }}
                            ref={(input) => { this.priceTextInput = input; }}
                            style={{
                                top: 20
                            }}
                            onChangeText={newDishPriceValueHolder => this.setState({newDishPriceValueHolder})}
                        />
                        <TextInput
                            label="  Description  "
                            mode="outlined"
                            defaultValue={dishDescription}
                            clearTextOnFocus={true}
                            returnKeyType="done"
                            ref={(input) => { this.descTextInput = input; }}
                            style={{
                                top: 40
                            }}
                            onChangeText={newDishDescriptionValueHolder => this.setState({newDishDescriptionValueHolder})}
                        />
                    </View>
                </View>
                <View style={styles.uploadContainer}>
                    { this.state.imageUri && <Image source={{ uri: this.state.imageUri }} style={{ width: 250, height: 250 }} />}
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={() => this.changeImage()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Upload New Image</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.EditDish()}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Update Dish</Text>
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

export default EditDishScreen;