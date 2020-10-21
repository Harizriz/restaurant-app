import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PaymentScreen extends Component {
    state = {  }
    render() { 
        return ( 
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Payment Screen</Text>
            </View>
        </View> 
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
      height: 100,
      // backgroundColor: "yellow",
    },
    headingText: {
      fontSize: 40,
      color: "purple",
      left: 50,
      top: 50,
    },
  });
 
export default PaymentScreen;