import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import settings from "../../../settings";

class MainMenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: '',
            tableId: '',
            value: ''
        };
    }
    componentDidMount = async () => {
        // auto-refresh the screen to listen from the previous screen
        this.props.navigation.addListener('focus', () => {
            fetch(settings.ipAddress+`/api/menus`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            }) 
            const tableId = this.props.route.params.tableId;

            this.setState({
                tableId: tableId,
            })
        });
    }
    // search functionality
    searchItems = text => {
        let newData = this.state.dataSource.filter(item => {
            const itemData = `${item.menuName.toUpperCase()}`;
            const textData = text.toUpperCase();
        if (text.length > 0) {
            return itemData.indexOf(textData) > -1;
        }
        if (text.length == 0) {
            fetch(settings.ipAddress+`/api/menus`)
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
        const Item = ({ menuName }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{menuName}</Text>
            </View>
        );
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => {
                this.setState({
                    value: ''
                })
                this.props.navigation.navigate("DishesScreen", 
                {
                    tableId: this.state.tableId, 
                    menuId: item.objectId, 
                    emailData: this.props.route.params.emailData
                })
            }}>
                <Item menuName={item.menuName} />
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
                />
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CartScreen", {screenName: "MainMenuScreen", tableId: this.state.tableId, emailData: this.props.route.params.emailData})}>
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
    },
    headingContainer: {
        height: 100,
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
        width: "92%",
        left: 16,
        borderRadius: 5
    },
    icon: {
        padding: 20,
    },
    input: {
        flex: 1,
        padding: 10,
        borderLeftColor: "lightgray",
        borderLeftWidth: 1
    },
});

export default MainMenuScreen;