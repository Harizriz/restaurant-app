import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Octicons";
import { TextInput } from 'react-native-paper';
import PlusIcon from "react-native-vector-icons/Feather"
import Button from "react-native-button"

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CardNumberValueHolder: '',
      ExpDateValueHolder: '',
      CVVValueHolder: '',
      isErrorCardNumber: false,
      isErrorExpDate: false,
      isErrorCVV: false
    }
  }
  validateInput = (cardNumber, expDate, cvvValue) => {
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    const emailData = this.props.route.params.emailData

    // check for inputs in inputtext
    if(cardNumber == "" || expDate == "" || cvvValue == "") {
      Alert.alert("Please fill all the fields!", "",
      { text: "Okay", onPress: () => console.log("Successful") });
    }

    // validate cardNumber
    if(cardNumber.trim() == "") {
      this.setState({
        CardNumberValueHolder: cardNumber,
        isErrorCardNumber: true
      })
    }
    else {
      this.setState({
        CardNumberValueHolder: cardNumber,
        isErrorCardNumber: false
      })
    }

    // validate expDate
    if(expDate.trim() == "") {
      this.setState({
        ExpDateValueHolder: expDate,
        isErrorExpDate: true
      })
    }
    else {
      this.setState({
        ExpDateValueHolder: expDate,
        isErrorExpDate: false
      })
    }

    // validate cvvValue
    if(cvvValue.trim() == "") {
      this.setState({
        CVVValueHolder: cvvValue,
        isErrorCVV: true
      })
    }
    else {
      this.setState({
        CVVValueHolder: cvvValue,
        isErrorCVV: false
      })
    }

    if (!this.state.CardNumberValueHolder || !this.state.ExpDateValueHolder || !this.state.CVVValueHolder) {
      console.log("nope")
    }
    else {
      this.props.navigation.navigate("PaymentLoadingScreen",
        { cartTotalPrice: totalPrice,
          tableId: tableOrderId,
          emailData: emailData
        }
      )
    }
  } 
  render() { 
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    const emailData = this.props.route.params.emailData
    console.log(tableOrderId)
    console.log(totalPrice)
    return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon 
          name="credit-card" 
          color="black" 
          size={200}
          style={{alignSelf: "center"}}
        />
      </View>
      <View style={styles.cardsContainer}>
        {/* <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => console.log("Chose")}>
            <Text style={styles.cardInformationText}>
              Visa Ending in 4242
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("AddNewCardScreen")}>
            <Text style={styles.cardInformationText}>
              <PlusIcon 
                name="plus" 
                color="black" 
                size={15}
                style={{paddingLeft: 20}}
              />
              &nbsp; &nbsp; Add new card
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.mainPromptContainer}>
          <View style={styles.mainInputContainer}>
            {/* https://callstack.github.io/react-native-paper/text-input.html */}
            <TextInput
                label="  Card Number  "
                mode="outlined"
                error={this.state.isErrorCardNumber}
                textContentType="oneTimeCode"
                returnKeyType="next"
                onSubmitEditing={() => { this.dateTextInput.focus(); }}
                onChangeText={CardNumberValueHolder => this.setState({CardNumberValueHolder})}
            />
          </View>
        </View>
        <View style={styles.secondPromptContainer}>
          <View style={styles.secondInputContainer}>
            <TextInput
                label="  Expiration Date  "
                mode="outlined"
                keyboardType="number-pad"
                error={this.state.isErrorExpDate}
                defaultValue="MM/YY"
                returnKeyType="done"
                clearTextOnFocus={true}
                onSubmitEditing={() => { this.CVVTextInput.focus(); }}
                ref={(input) => { this.dateTextInput = input; }}
                style={{
                    top: 20,
                    width: "45%"
                }}
                onChangeText={ExpDateValueHolder => this.setState({ExpDateValueHolder})}
            />
            <TextInput
                label="  CVV/CVN  "
                mode="outlined"
                keyboardType="number-pad"
                error={this.state.isErrorCVV}
                defaultValue="CVC"
                clearTextOnFocus={true}
                returnKeyType="done"
                ref={(input) => { this.CVVTextInput = input; }}
                style={{
                    top: 20,
                    width: "45%"
                }}
                onChangeText={CVVValueHolder => this.setState({CVVValueHolder})}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.validateInput(this.state.CardNumberValueHolder, this.state.ExpDateValueHolder, this.state.CVVValueHolder)}>
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
    iconContainer: {
      height: "30%",
      // backgroundColor: "yellow",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "black"
    },
    cardsContainer: {
      flex: 1,
      // backgroundColor: "orange",
      marginTop: 10
    },
    cardContainer: {
      height: 50,
      // backgroundColor: "pink",
      justifyContent: "center"
    },
    buttonContainer: {
      justifyContent: "flex-end",
      // backgroundColor: "yellow"
    },
    headingText: {
      fontSize: 40,
      color: "purple",
      left: 50,
      top: 50,
    },
    cardInformationText: {
      fontSize: 18,
      paddingLeft: 20,
      // alignSelf: "center"
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
    },
    mainPromptContainer: {
      height: 65,
      alignItems: "center",
      // backgroundColor: "blue"
      top: 20
    },
    mainInputContainer: {
      width: "75%",
    },
    secondPromptContainer: {
      height: 70,
      alignItems: "center",
      // backgroundColor: "red",
      top: 20
    },
    secondInputContainer: {
      width: "75%",
      flexDirection: "row",
      justifyContent: "space-between"
    },
  });
 
export default PaymentScreen;