import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, Text, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';

class CouponScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible: false,
            setModalVisible: false,
            couponNameValueHolder: '',
            PercentageValueHolder: '',
            dataSource: '',
            isRefresh: false
        };
    }
    componentDidMount = async () => {
        fetch(`http://172.20.10.5:5000/api/coupons`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
            dataSource: responseJson
            });
        })
        // auto-refresh the screen
        this.props.navigation.addListener('focus', () => {
            fetch(`http://172.20.10.5:5000/api/coupons`)
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
            fetch(`http://172.20.10.5:5000/api/coupons`)
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
    AddNewCoupon = async () => {
        const { couponNameValueHolder, PercentageValueHolder } = this.state;

        try {
            let response = await fetch(
              'http://172.20.10.5:5000/api/coupons', 
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  couponName: couponNameValueHolder,
                  percentage: PercentageValueHolder
                })
              }
            );
            let json = await response.json();
            console.log(json);

            this.setState({
                isModalVisible: false
            })

            // reload the screen
            setTimeout(() => {
                fetch(`http://172.20.10.5:5000/api/coupons`)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        dataSource: responseJson
                    });
                })
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }
    // delete coupon from Coupon object
    deleteCoupon = (couponName) => {
        Alert.alert("Delete Coupon", "Are you sure you want to delete the coupon permanently?", [
            { text: "Cancel", onPress: () => console.log("cancelled!") },
            { text: "Delete", onPress: () => {
                fetch(`http://172.20.10.5:5000/api/coupons/${encodeURI(couponName)}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        couponName: couponName
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                });
            }
            },
        ])

        // reload the screen
        setTimeout(() => {
            fetch(`http://172.20.10.5:5000/api/coupons`)
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
        const Item = ({ couponName, percentage }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{couponName}</Text>
                <Text style={styles.per}>{percentage}%</Text>
            </View>
        );
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    onLongPress={() => this.deleteCoupon(item.couponName)}>
                    <Item couponName={item.couponName} percentage={item.percentage} /> 
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
    },
    title: {
        fontSize: 25,
        width: "80%"
    },
    per: {
        fontSize: 25,
        width: "20%",
        textAlign: "right",
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
        justifyContent: "space-between"
    },
    editContainer: {
        height: 25,
        width: "20%",
        justifyContent: "center"
    },
    icon: {
        alignSelf: "center",
    }
});

export default CouponScreen;