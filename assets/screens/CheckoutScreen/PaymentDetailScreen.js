import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from "react-native-button";

class PaymentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() { 
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    console.log(tableOrderId)
    console.log(totalPrice)
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
              {tableOrderId}
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
              RM {totalPrice}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentLoadingScreen", 
        { tableId: tableOrderId }
          )}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Place Order</Text>
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
    },
    headingContainer: {
      height: 125,
      // backgroundColor: "yellow",
      justifyContent: "center"
    },
    headingText: {
      fontSize: 35,
      color: "purple",
      alignSelf: "center",
    },
    informationContainer: {
      flex: 1
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
      justifyContent: "flex-end",
      // backgroundColor: "pink"
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
    },
    buttonText: {
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
    }
  });
 
export default PaymentDetailScreen;