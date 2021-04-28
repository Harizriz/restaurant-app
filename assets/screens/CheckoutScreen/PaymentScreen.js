import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Octicons";
import { TextInput } from 'react-native-paper';

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CardNumberValueHolder: '',
      ExpDateValueHolder: '',
      CVVValueHolder: '',
      isErrorCardNumber: false,
      isErrorExpDate: false,
      isErrorCVV: false,
    }
  }
  // validate card number
  validateInput = (cardNumber, expDate, cvvValue) => {
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    const emailData = this.props.route.params.emailData

    // check for inputs in InputText
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
        <View style={styles.mainPromptContainer}>
          <View style={styles.mainInputContainer}>
            {/* https://callstack.github.io/react-native-paper/text-input.html */}
            <TextInput
                label="  Card Number  "
                mode="outlined"
                error={this.state.isErrorCardNumber}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                returnKeyType="done"
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
                keyboardType="numbers-and-punctuation"
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
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "black"
    },
    cardsContainer: {
      flex: 1,
      marginTop: 10
    },
    cardContainer: {
      height: 50,
      justifyContent: "center"
    },
    buttonContainer: {
      justifyContent: "flex-end",
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
      top: 20
    },
    mainInputContainer: {
      width: "75%",
    },
    secondPromptContainer: {
      height: 70,
      alignItems: "center",
      top: 20
    },
    secondInputContainer: {
      width: "75%",
      flexDirection: "row",
      justifyContent: "space-between"
    },
  });
 
export default PaymentScreen;