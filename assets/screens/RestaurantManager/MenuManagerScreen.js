import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";

class MenuManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            menuNameValueHolder: '',
            dishNameValueHolder: '',
            dataSource: '',
            isRefresh: false
        };
    }
    componentDidMount = async () => {
        fetch(`http://172.20.10.5:5000/api/menus`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson
            });
        })
        // auto-refresh the screen
        this.props.navigation.addListener('focus', () => {
            fetch(`http://172.20.10.5:5000/api/menus`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                dataSource: responseJson
                });
            })
        });
    }
    onRefresh() {
        this.setState({
            isRefresh: true
        }, () => { 
            fetch(`http://172.20.10.5:5000/api/menus`)
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
    AddMenu = async () => {
        const { menuNameValueHolder, dishNameValueHolder } = this.state;

        try {
            let response = await fetch(
              'http://172.20.10.5:5000/api/menus', 
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  menuName: menuNameValueHolder,
                  dishName: dishNameValueHolder
                })
              }
            );
            let json = await response.json();
            console.log(json);

            this.setState({
                isModalVisible: false
            })

            // reload the screen *hack*
            fetch(`http://172.20.10.5:5000/api/menus`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            }) 

        } catch (error) {
            console.error(error);
        }

    }
    // delete menu
    // might consider updating the "name" of the menu
    deleteMenu = (menuId) => {
        Alert.alert("Delete Menu", "Are you sure you want to delete the menu permanently?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Delete", onPress: () => {
                fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        menuId: menuId
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                });

                fetch(`http://172.20.10.5:5000/api/menus/dishes/${encodeURI(menuId)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        menuId: menuId
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
            fetch(`http://172.20.10.5:5000/api/menus`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    dataSource: responseJson
                });
            })
        }, 2000) 
    }
    render() {
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
        const Item = ({ menuName, objectId }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{menuName}</Text>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DishesManagerScreen", {menuName: item.menuName, menuId: item.objectId})}
                    onLongPress={() => this.deleteMenu(item.objectId)}>
                    <Item menuName={item.menuName} /> 
                </TouchableOpacity>
            </View>
        );
        return (
            <SafeAreaView style={styles.container}>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeadingText}>Add Menu</Text>
                            <TextInput
                                label="  Menu Name  "
                                mode="outlined"
                                style={{
                                    width: "75%"
                                }}
                                onChangeText={menuNameValueHolder => this.setState({menuNameValueHolder})}
                            />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancel" onPress={toggleModal} />
                            <Button title="Create Menu" onPress={this.AddMenu} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Menu</Text>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefresh}
                />
                <View style={{top: 6}}>
                    <TouchableOpacity onPress={toggleModal}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Add Menu</Text>
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
        height: 125,
        // backgroundColor: "yellow",
        justifyContent: "center"
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        alignSelf: "center"
    },
    item: {
        borderColor: "black",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        // backgroundColor: "yellow"
    },
    searchContainer: {
        height: 50,
    },
    title: {
        fontSize: 25,
        width: "80%"
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
    editContainer: {
        height: 25,
        width: "20%",
        // backgroundColor: "lightgreen",
        justifyContent: "center"
    },
    icon: {
        alignSelf: "center",
    }
});

export default MenuManagerScreen;