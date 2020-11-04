import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

class PaymentDetailScreen extends Component {
    state = {  }
    render() { 
        return ( 
        <SafeAreaView style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Checkout</Text>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.textTitle}>
                Payment
              </Text>
              <Text style={styles.textInfo}>
                4242
              </Text>
            </View>
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
      height: 100,
      // backgroundColor: "yellow",
    },
    informationContainer: {
      height: 200,
      backgroundColor: "pink"
    },  
    infoContainer: {
      height: 50,
      backgroundColor: "white",
      justifyContent: "center"
    },
    headingText: {
      fontSize: 40,
      color: "purple",
      left: 30,
      top: 30,
    },
    textTitle: {
      fontSize: 15,
      color: "purple",
      alignSelf: "flex-start"
    },
    textInfo: {
      fontSize: 15,
      color: "black",
      alignSelf: "flex-end"
    }
  });
 
export default PaymentDetailScreen;