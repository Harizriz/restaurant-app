import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert, Image } from 'react-native';
import SearchInput from "../../components/SearchInput";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper'

class DishesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            dataSource: '',
            tableId: ''
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("DishDetailsScreen",
                {dishId: item.objectId, 
                dishName: item.dishName, 
                dishDescription: item.dishDescription,
                dishPrice: item.dishPrice,
                // dishImage: item.dishImage, 
                tableId: this.state.tableId
                })}>
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
                        <SearchInput placeholder="What are you craving for?" />
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
    }
});

export default DishesScreen;