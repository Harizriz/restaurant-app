import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';

class PaymentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      couponValueHolder: '',
      dataSource: '',
      isError: false
    }
  }
  validateCoupon = (couponName) => {
    fetch(`http://172.20.10.5:5000/api/coupons/customer/${encodeURI(couponName)}`)
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
            dataSource: responseJson[0]
        });
    });

    if(this.state.dataSource) {
      this.setState({
        isModalVisible: false
      })
    }
    else {
      this.setState({
        isError: true
      })
    }

    console.log(this.state.dataSource)
  }
  render() { 
    console.log(this.state.dataSource.percentage)
    
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    const emailData = this.props.route.params.emailData
    console.log(tableOrderId)
    console.log(totalPrice)

    let totalDiscount = 0;
    let finalTotal = 0;
    totalDiscount = (totalPrice * this.state.dataSource.percentage/100).toFixed(2)
    finalTotal = (totalPrice - totalDiscount).toFixed(2)

    const toggleModal = () => {
      if(this.state.isModalVisible == false) {
          this.setState({
              isModalVisible: true,
              isError: false
          })
      }
      else {
          this.setState({
              isModalVisible: false
          })
      }
    }

    let finalPrice = 0;
    if (this.state.dataSource) {
      finalPrice = finalTotal
      console.log("Send 1", finalPrice)
    }
    else {
      finalPrice = totalPrice
      console.log("Send 2", finalPrice)
    }

    return ( 
    <SafeAreaView style={styles.container}>
      <Modal isVisible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeadingText}>Coupon</Text>
            <TextInput
                label="  Coupon Code  "
                mode="outlined"
                error={this.state.isError}
                style={{
                    width: "75%"
                }}
                onChangeText={couponValueHolder => this.setState({couponValueHolder})}
            />
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={toggleModal} />
            <Button title="Insert Coupon" onPress={() => this.validateCoupon(this.state.couponValueHolder)} />
          </View>
        </View>
      </Modal>
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
              Discount
            </Text>
          </View>
          <View style={styles.rightContainer}>
            { this.state.dataSource ? 
              <Text style={styles.textInfo} onPress={toggleModal}>
                {this.state.dataSource.couponName}
              </Text>
            :
              <Text style={styles.link} onPress={toggleModal}>
                Any Coupon?
              </Text>
            }
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
        { this.state.dataSource ? 
          <View style={styles.infoContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.textTitle}>
                Total After Discount
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.textInfo}>
                RM {finalTotal}
              </Text>
            </View>
          </View>
        :
          null
        }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentScreen", 
        { tableId: tableOrderId,
          cartTotalPrice: finalPrice,
          emailData: emailData
        }
          )}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Proceed</Text>
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
    link: {
      fontSize: 18,
      right: 30,
      color: "black",
      alignSelf: "flex-end",
      color: "purple"
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
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 200,
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
      top: 20,
      width: "75%",
      flexDirection: "row",
      // backgroundColor: "yellow",
      justifyContent: "space-between"
    },
  });
 
export default PaymentDetailScreen;