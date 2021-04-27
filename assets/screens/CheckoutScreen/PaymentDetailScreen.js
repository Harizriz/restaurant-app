import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';

class PaymentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isTextInputVisible: false,
      couponValueHolder: '',
      PointsValueHolder: '',
      dataSource: '',
      dataSourceUserInfo: '',
      isError: false,
      isErrorPoints: false,
      isPointsSuccess: false
    }
  }
  componentDidMount = () => {
    const emailData = this.props.route.params.emailData

    fetch(`http://172.20.10.5:5000/api/users/${encodeURI(emailData)}`)
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
          dataSourceUserInfo: responseJson[0]
        });
    });
  }
  validateCoupon = (couponName) => {
    if (couponName == "") {
      this.setState({
        isError: true
      })
    }
    else {
      fetch(`http://172.20.10.5:5000/api/coupons/customer/${encodeURI(couponName)}`)
      .then(response => response.json())
      .then(responseJson => {
          this.setState({
              dataSource: responseJson[0]
          });
      });
    }

    setTimeout(() => {
      if (this.state.dataSource) {
        if(couponName == this.state.dataSource.couponName) {
          this.setState({
            isModalVisible: false
          })
        }
        else {
          alert("Invalid Coupon")
          this.setState({
            isError: true
          })
        }
      }
      else {
        alert("Invalid Coupon")
        this.setState({
          isError: true
        })
      }
    }, 1000)
  }
  validatePoints = (points) => {
    const emailData = this.props.route.params.emailData

    if (points == "") {
      this.setState({
        isErrorPoints: true
      })
    }
    else {
      if (this.state.dataSourceUserInfo.subpoint < points) {
        alert("Insufficient points")
        this.setState({
          isErrorPoints: true
        })
      }
      else {
        const newPoints = this.state.dataSourceUserInfo.subpoint - points
        
        fetch(`http://172.20.10.5:5000/api/users/points/redeem/${encodeURI(emailData)}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailData,
                points: newPoints
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
        })
      }

      this.setState({
        isTextInputVisible: false,
        isErrorPoints: false,
        isPointsSuccess: true
      })
    }
  }
  render() {     
    const totalPrice = this.props.route.params.cartTotalPrice
    const tableOrderId = this.props.route.params.tableId
    const emailData = this.props.route.params.emailData
    console.log(tableOrderId)
    console.log(totalPrice)

    let totalDiscount = 0;
    let totalRedeemPoints = 0;
    let finalTotalAfterPoints = 0;
    let finalTotal = 0;
    if (this.state.dataSource) {
      totalDiscount = (totalPrice * this.state.dataSource.percentage/100).toFixed(2)
    }
    totalRedeemPoints = (this.state.PointsValueHolder/100).toFixed(2)
    if (this.state.PointsValueHolder == "") {
      finalTotalAfterPoints = parseFloat(0).toFixed(2)
    }
    else {
      finalTotalAfterPoints = (totalPrice - totalRedeemPoints - totalDiscount).toFixed(2) 
    }
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

    const toggleTextInput = () => {
      if(this.state.isTextInputVisible == false) {
          this.setState({
              isTextInputVisible: true,
              isErrorPoints: false
          })
      }
      else {
          this.setState({
              isTextInputVisible: false
          })
      }
    }

    const renderContent = () => {
      if (this.state.isPointsSuccess) {
        return (
          <Text style={styles.textInfo} onPress={toggleTextInput}>
            {this.state.PointsValueHolder}
          </Text>
        )
      }
      else {
        return (
          <Text style={styles.link} onPress={toggleTextInput}>
            Any points to redeem?
          </Text>
        )
      }
    }

    const renderFinalTotalContent = () => {
      if (finalTotalAfterPoints < 0) {
        return (
          <Text style={styles.textInfo}>
            RM 0.00
          </Text>
        )
      }
      else {
        return (
          <Text style={styles.textInfo}>
            RM {finalTotalAfterPoints}
          </Text>
        )
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

    if (this.state.PointsValueHolder == "") {
      finalPrice = finalTotal
      console.log("Send 1", finalPrice)
    }
    else {
      finalPrice = finalTotalAfterPoints
      console.log("Send 2", finalPrice)
    }

    console.log("FinalPrice", finalPrice)

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
                  Any coupon?
                </Text>
              }
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.textTitle}>
                Redeem Points
              </Text>
            </View>
            <View style={styles.rightContainer}>
              { this.state.isTextInputVisible ? 
                <Modal isVisible={this.state.isTextInputVisible}>
                  <View style={styles.modalSecondContainer}>
                    <Text style={styles.modalSecondHeadingText}>Redeem Points</Text>
                    <Text style={styles.modalContentText}>Available Points: {this.state.dataSourceUserInfo.subpoint}</Text>
                    <TextInput
                      label="  Points  "
                      mode="outlined"
                      error={this.state.isErrorPoints}
                      returnKeyType="done"
                      keyboardType="numeric"
                      style={{
                        width: "75%"
                      }}
                      onChangeText={PointsValueHolder => this.setState({PointsValueHolder})}
                    />
                    <View style={styles.modalButtonContainer}>
                      <Button title="Cancel" onPress={toggleTextInput} />
                      <Button title="Redeem Points" onPress={() => this.validatePoints(this.state.PointsValueHolder)} />
                    </View>
                  </View>
                </Modal>
                :
                renderContent()
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
          { this.state.isPointsSuccess ? 
            <View style={styles.infoContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.textTitle}>
                  Total After Redeem Points
                </Text>
              </View>
              <View style={styles.rightContainer}>
                { renderFinalTotalContent() }
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
      fontSize: 16,
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
    modalSecondContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 220,
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
    modalSecondHeadingText: {
      fontSize: 25,
      color: "purple",
      alignSelf: "flex-start",
      left: 50,
      bottom : 20
    },
    modalContentText: {
      fontSize: 15,
      color: "black",
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
    textInput: {
      width: "60%",
      left: 50,
      justifyContent: "flex-end",
      // backgroundColor: "yellow"
    },
  });
 
export default PaymentDetailScreen;