import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert, Image } from 'react-native';
import SearchInput from "../../components/SearchInput";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper'

class DishesManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            dataSource: ''
        };
    }
    componentDidMount = async () => {
        const menuId = this.props.route.params.menuId;
        fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
        setTimeout(() => {
            // auto-refresh the screen
            fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 1000)  
    }
    render() {
        const menuId = this.props.route.params.menuId;
        const menuName = this.props.route.params.menuName;
        // console.log(menuId)
        // console.log(menuName)
        console.log(this.state.dataSource[2]);

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
            <TouchableOpacity onPress={() => console.log("Here!")}>
                <Item 
                    dishName={item.dishName} 
                    dishDescription={item.dishDescription} 
                    dishPrice={item.dishPrice} 
                    dishImage={item.dishImage} />
            </TouchableOpacity>
        );
        return (
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.headingContainer}>
                    <View style={styles.searchContainer}>
                        <SearchInput placeholder="What are you craving for?" />
                    </View>
                </View> */}
                {/* if there's no data in database, just put an empty flatlist */}
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                />
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddDishScreen", {menuId: menuId})}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Add Dish</Text>
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
        justifyContent: "center"
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
});

export default DishesManagerScreen;