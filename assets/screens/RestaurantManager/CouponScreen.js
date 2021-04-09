import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert } from 'react-native';
import SearchInput from "../../components/SearchInput";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'HELLO30',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'JOY70',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'WOAH20',
    },
];

class CouponScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            couponNameValueHolder: '',
            PercentageValueHolder: '',
            dataSource: ''
        };
    }
    componentDidMount = async () => {
        
    }
    AddNewCoupon = async () => {
        console.log("Add New Coupon")
    }
    
    deleteCoupon = (couponId) => {
        Alert.alert("Delete Coupon", "Are you sure you want to delete the coupon permanently?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Delete", onPress: () => console.log("Delete")
            // { text: "Delete", onPress: () => {
            //     fetch(`http://172.20.10.5:5000/api/menus/${encodeURI(menuId)}`, {
            //         method: 'DELETE',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             menuId: menuId
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(responseJson => {
            //         console.log(responseJson)
            //     });

            //     fetch(`http://172.20.10.5:5000/api/menus/dishes/${encodeURI(menuId)}`, {
            //         method: 'DELETE',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             menuId: menuId
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(responseJson => {
            //         console.log(responseJson)
            //     });

            //     }
            },
        ])
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
        const Item = ({ title }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    onLongPress={() => this.deleteCoupon()}>
                    <Item title={item.title} /> 
                </TouchableOpacity>
            </View>
        );
        return (
            <SafeAreaView style={styles.container}>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeadingText}>Add New Coupon</Text>
                            <TextInput
                                label="  Coupon Name  "
                                mode="outlined"
                                textContentType="oneTimeCode"
                                returnKeyType="next"
                                onSubmitEditing={() => { this.percentageTextInput.focus(); }}
                                style={{
                                    width: "75%"
                                }}
                                onChangeText={couponNameValueHolder => this.setState({couponNameValueHolder})}
                            />
                            <TextInput
                                label="  Percentage  "
                                mode="outlined"
                                keyboardType="number-pad"
                                returnKeyType="done"
                                ref={(input) => { this.percentageTextInput = input; }}
                                style={{
                                    top: 10,
                                    width: "75%"
                                }}
                                onChangeText={PercentageValueHolder => this.setState({PercentageValueHolder})}
                            />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancel" onPress={toggleModal} />
                            <Button title="Create Coupon" onPress={this.AddNewCoupon} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Coupons</Text>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                />
                <View style={{top: 6}}>
                    <TouchableOpacity onPress={toggleModal}
                        underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Add Coupon</Text>
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
        height: 125,
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
        height: 275,
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
        top: 25,
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

export default CouponScreen;