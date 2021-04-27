import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import LottieView from "lottie-react-native";

class PaymentLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            counter: 0
        };
    }
    componentDidMount() {
        const tableOrderId = this.props.route.params.tableId
        const totalPrice = this.props.route.params.cartTotalPrice
        const emailData = this.props.route.params.emailData

        const points = parseInt(totalPrice)

        // set a specific startFrame and endFrame
        this.animation.play;
        this.animation.reset;

        setTimeout(() => {
            this.setState({
                counter: 1
            })
        }, 1000)

        fetch(`http://172.20.10.5:5000/api/users/points/${encodeURI(emailData)}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailData,
                points: points
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
        })

        setTimeout(() => {
            this.props.navigation.navigate("MainMenuScreen", { params: { tableId: tableOrderId }, screen: "Order Status" } )
        }, 1000);
    }
    render() { 
        return ( 
            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>
                { this.state.counter == 0 ? 
                    <View>
                        <LottieView
                            ref={animation => {
                            this.animation = animation;
                            }}
                            source={require('./walking-burger-animation.json')}
                            autoPlay
                            style={{width: 200, alignSelf: "center"}}
                        />
                        <Text style={styles.headingText}>Placing Order</Text>
                    </View>
                    :
                    <View>
                        <LottieView
                            ref={animation => {
                            this.animation = animation;
                            }}
                            source={require('./tick-animation.json')}
                            autoPlay
                            loop={false}
                            style={{width: 200, alignSelf: "center"}}
                        />
                        <Text style={styles.headingText}>Order Placed</Text>
                    </View>
                }
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
    mainContainer: {
        height: "100%",
        justifyContent: "center",
        bottom: 40
    },
    headingText: {
        fontSize: 40,
        top: 10,
        alignSelf: "center"
    }
})
 
export default PaymentLoadingScreen;