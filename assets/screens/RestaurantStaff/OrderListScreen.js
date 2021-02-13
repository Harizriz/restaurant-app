import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

class OrderListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Order List Screen</Text>
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
    headingContainer: {
        height: 125,
        // backgroundColor: "yellow",
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
});

export default OrderListScreen;