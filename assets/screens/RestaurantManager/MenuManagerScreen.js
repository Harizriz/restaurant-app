import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert } from 'react-native';
import SearchInput from "../../components/SearchInput";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper'

class MenuManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            menuNameValueHolder: '',
            dishNameValueHolder: '',
            dataSource: ''
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
        const Item = ({ menuName }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{menuName}</Text>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("DishesManagerScreen", {menuName: item.menuName, menuId: item.objectId})}>
                <Item menuName={item.menuName} />
            </TouchableOpacity>
        );
        return (
            <SafeAreaView style={styles.container}>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeadingText}>Create New Menu</Text>
                            <TextInput
                                label="  Menu Name  "
                                mode="outlined"
                                style={{
                                    width: "75%"
                                }}
                                onChangeText={menuNameValueHolder => this.setState({menuNameValueHolder})}
                            />
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.leftButtonContainer}>
                                <Button title="Cancel" onPress={toggleModal}/>                        
                            </View>
                            <View style={styles.rightButtonContainer}>
                                <Button title="Create Menu" onPress={this.AddMenu}/>                        
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.headingContainer}>
                    <View style={styles.searchContainer}>
                        <SearchInput placeholder="What are you craving for?" />
                    </View>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
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
        width: "100%",
        flexDirection: "row",
        // backgroundColor: "yellow",
        justifyContent: "space-around",
    },
    leftButtonContainer: {
        width: "50%",
    },
    rightButtonContainer: {
        width: "50%",
    },
});

export default MenuManagerScreen;