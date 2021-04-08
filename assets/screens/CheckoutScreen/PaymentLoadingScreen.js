import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import LottieView from "lottie-react-native";

class PaymentLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };
    }
    componentDidMount() {
        const tableOrderId = this.props.route.params.tableId
        
        // Or set a specific startFrame and endFrame with:
        this.animation.play(0, 200);
        this.animation.pause;

        setTimeout(() => {
            this.props.navigation.navigate("MainMenuScreen", { params: { tableId: tableOrderId }, screen: "Order Status" } )
        }, 1000);
    }
    render() { 
        return ( 
            <SafeAreaView style={styles.container}>
                 <View style={styles.mainContainer}>
                 {/* <LottieView
                    ref={animation => {
                    this.animation = animation;
                    }}
                    source={require('./walking-burger-animation.json')}
                    autoPlay
                    style={{width: 200, alignSelf: "center"}}
                /> */}
                <Text style={styles.headingText}>Placing Order</Text>
                {/* output below if order has been placed */}
                <LottieView
                    ref={animation => {
                    this.animation = animation;
                    }}
                    source={require('./tick-animation.json')}
                    loop={false}
                    style={{width: 200, alignSelf: "center"}}
                />
                <Text style={styles.headingText}>Order Placed</Text>
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