import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, TextInput, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Feather";

class DishesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            dataSource: '',
            tableId: '',
            value: ''
        };
    }
    componentDidMount = async () => {
        const menuId = this.props.route.params.menuId;
        const tableOrderId = this.props.route.params.tableId;
        const emailData = this.props.route.params.emailData;
        console.log(tableOrderId)
        console.log(menuId)
        console.log(emailData)

        this.setState({
            tableId: tableOrderId
        })

        fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
        // auto-refresh the screen
        this.props.navigation.addListener('focus', () => {
            fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        });
    }
    searchItems = text => {
        const menuId = this.props.route.params.menuId;
        let newData = this.state.dataSource.filter(item => {
            const itemData = `${item.dishName.toUpperCase()}`;
            const textData = text.toUpperCase();
        if (text.length > 0) {
            return itemData.indexOf(textData) > -1;
        }
        if (text.length == 0) {
            fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }
        });
        this.setState({
            dataSource: newData,
            value: text,
        });
    };
    render() {
        const Item = ({ dishName, dishImage, dishDescription, dishPrice }) => (
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{dishName}</Text>
                    <Text style={styles.description}>{dishDescription}</Text>
                    <Text style={styles.price}>RM {dishPrice}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: dishImage }} />
                </View>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => {
                this.setState({
                    value: ''
                })
                this.props.navigation.navigate("DishDetailsScreen",
                {
                    dishId: item.objectId, 
                    dishName: item.dishName, 
                    dishDescription: item.dishDescription,
                    dishPrice: item.dishPrice,
                    dishImage: item.dishImage, 
                    tableId: this.state.tableId
                })
            }}>
                <Item 
                    dishName={item.dishName} 
                    dishDescription={item.dishDescription} 
                    dishPrice={item.dishPrice} 
                    dishImage={item.dishImage} />
            </TouchableOpacity>
        );
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <View style={styles.searchContainer}>
                        <Icon style={styles.icon} name="search" color="black" size={10} />
                        <TextInput
                            style={styles.input}
                            placeholder="What are you craving?"
                            placeholderTextColor="black"
                            onChangeText={(text) => this.searchItems(text)}
                            value={this.state.value}
                            clearButtonMode="always"
                        />
                    </View>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    style={{top: 30}}
                />
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CartScreen", { tableId: this.state.tableId, emailData: this.props.route.params.emailData })}>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("CartScreen")}> */}
                        <View style={styles.button}>
                            <Text style={styles.text}>View Cart</Text>
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
        marginTop: StatusBar.currentHeight || 0,
        // backgroundColor: "red"
    },
    headingContainer: {
        height: 100,
        // backgroundColor: "yellow",
        justifyContent: "center",
        top: 30
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
    searchContainer: {
        height: 50,
    },
    title: {
        fontSize: 25,
    },
    price: {
        fontSize: 25,
        top: 20
    },
    description: {
        fontSize: 15,
        color: "black",
        top: 2
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
        alignSelf: "flex-start",
        left: 50,
        bottom : 10
    },
    modalButtonContainer: {
        top: 20,
        width: "75%",
        flexDirection: "row",
        // backgroundColor: "yellow",
        justifyContent: "space-between"
    },
    textContainer: {
        flexDirection: "column",
        width: "70%",
        height: 80
      },
    imageContainer: {
        flexDirection: "column",
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
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 50,
        // backgroundColor: "red",
        width: "92%",
        left: 16,
        borderRadius: 5
        // borderColor: "lightgray",
        // borderWidth: 1
    },
    icon: {
        padding: 20,
    },
    input: {
        flex: 1,
        padding: 10,
        // paddingLeft: 10,
        borderLeftColor: "lightgray",
        borderLeftWidth: 1,
        // backgroundColor: "#fff",
        // color: "#424242",
        // height: 40,
        // borderColor: "gray",
        // borderWidth: 2,
        // borderRadius: 5,
        // width: "50%",
        // left: 20,
        // marginTop: 10,
    },
});

export default DishesScreen;