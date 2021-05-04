import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import settings from "../../../settings";

class DishesManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
            isRefresh: false
        };
    }
    componentDidMount = async () => {
        const menuId = this.props.route.params.menuId;
        fetch(settings.ipAddress+`/api/menus/${encodeURI(menuId)}`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
        // auto-refresh the screen if using navigation.goBack()
        this.props.navigation.addListener('focus', () => {
            fetch(settings.ipAddress+`/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        });

        setTimeout(() => {
            fetch(settings.ipAddress+`/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 2000) 
    }
    // refresh the menu list
    onRefresh(menuId) {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(settings.ipAddress+`/api/menus/${encodeURI(menuId)}`)
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
    deleteDish = (dishId) => {
        const menuId = this.props.route.params.menuId;

        Alert.alert("Delete Dish", "Are you sure you want to delete the dish permanently?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Delete", onPress: () => {
                fetch(settings.ipAddress+`/api/menus/dish/${encodeURI(dishId)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dishId: dishId
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                });
                }
            },
        ])

        setTimeout(() => {
            fetch(settings.ipAddress+`/api/menus/${encodeURI(menuId)}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 2000) 
    }
    render() {
        const menuId = this.props.route.params.menuId;
        const menuName = this.props.route.params.menuName;

        const Item = ({ dishName, dishDescription, dishPrice }) => (
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{dishName}</Text>
                    <Text style={styles.description}>{dishDescription}</Text>
                    <Text style={styles.price}>RM {dishPrice}</Text>
                </View>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("EditDishScreen", {
                dishName: item.dishName,
                dishDescription: item.dishDescription,
                dishPrice: item.dishPrice,
                dishImage: item.dishImage,
                dishId: item.objectId
            })}
                onLongPress={() => this.deleteDish(item.objectId)}>
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
                    <Text style={styles.headingText}>{menuName}</Text>
                </View>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    onRefresh={() => this.onRefresh(menuId)}
                    refreshing={this.state.isRefresh}
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
    },
    flatlist: {
        marginTop: 50
    },
    headingContainer: {
        height: 100,
        justifyContent: "center"
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 30,
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
        justifyContent: "space-between"
    },
    textContainer: {
        flexDirection: "column",
        width: "100%",
        height: 80
      },
    imageContainer: {
        flexDirection: "column",
    },
});

export default DishesManagerScreen;