import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from "react-native-button";

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
          <View style={styles.leftContainer}>
            <Text style={styles.textTitle}>
              Payment
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textInfo}>
              4242
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.textTitle}>
              Table No
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textInfo}>
              10
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.textTitle}>
              Total
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textInfo}>
              RM68.00
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentDetailScreen")}>
          <Button
          style={{
            padding: 16,
            width: "100%",
            alignSelf: "center",
            backgroundColor: "purple",
            color: "white",
            overflow: "hidden",
          }}
          >
            Place Order
          </Button>
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
    },
    headingContainer: {
      height: "12%",
      // backgroundColor: "yellow",
    },
    informationContainer: {
      height: "18%",
      // backgroundColor: "orange"
    },  
    infoContainer: {
      height: 50,
      backgroundColor: "white",
      flexDirection: "row"
    },
    leftContainer: {
      width: "50%",
      justifyContent: "center",
      // backgroundColor: "blue"
    },
    rightContainer: {
      width: "50%",
      justifyContent: "center",
      // backgroundColor: "red"
    },
    buttonContainer: {
      height: "70%",
      justifyContent: "flex-end",
      // backgroundColor: "pink"
    },
    headingText: {
      fontSize: 40,
      color: "purple",
      left: 30,
      top: 30,
    },
    textTitle: {
      fontSize: 18,
      left: 30,
      color: "purple",
      alignSelf: "flex-start",
    },
    textInfo: {
      fontSize: 18,
      right: 30,
      color: "black",
      alignSelf: "flex-end",
    }
  });
 
export default PaymentDetailScreen;