import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Dialog, { FadeAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import NavigationButton from './NavigationButton';
import NumInput from "react-native-numeric-input";
 
class CartPageScreen extends Component {
  state = { 
    visible: false
  }

  render() { 
    return ( 
      <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.quantityContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>2</Text>
          </View>
        </View>
        <View style={styles.foodContainer}>
          <Text style={styles.text}>French Fries</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>RM20.00</Text>
        </View>
        <View style={styles.editContainer}>
            <View style={styles.icon}>
                <Icon 
                name="edit" 
                color="black" 
                size={15} 
                onPress={() => {
                    this.setState({ visible: true });
                }}
                />
                <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                  this.setState({ visible: false });
                }}
                containerStyle={{justifyContent: "flex-end", paddingBottom: 80}}
                width={1}
                height={200}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="Remove from Cart"
                      textStyle={{color: "red"}}
                      onPress={() => console.log("OK")}
                    />
                    <DialogButton
                      text="Update Cart"
                      onPress={() => console.log("CANCEL")}
                    />
                  </DialogFooter>
                }
                dialogAnimation={new FadeAnimation({
                  initialValue: 0,
                  animationDuration: 150,
                  useNativeDriver: true,
                })}
                >
                <DialogContent>
                  <Text style={styles.dialogText}>French Fries</Text>
                  <NumInput
                    containerStyle={{alignSelf: "center", marginTop: 25, marginBottom: 10}}
                    onChange={(value) => console.log(value)}
                    totalWidth={150}
                    totalHeight={40}
                    iconSize={25}
                    step={1}
                    valueType="real"
                    rounded
                    minValue={0}
                    textColor="black"
                    iconStyle={{ color: "white" }}
                    rightButtonBackgroundColor="lightblue"
                    leftButtonBackgroundColor="lightblue"
                    // https://www.npmjs.com/package/react-native-numeric-input
                  />
                </DialogContent>
                </Dialog>
            </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
      <View style={styles.quantityContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1</Text>
          </View>
        </View>
        <View style={styles.foodContainer}>
          <Text style={styles.text}>Garlic Bread</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>RM15.00</Text>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.icon}>
          <Icon 
            name="edit" 
            color="black" 
            size={15} 
            onPress={() => {
                this.setState({ visible: true });
            }}
            />
            {/* <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
                this.setState({ visible: false });
            }}
            >
              <DialogContent>
                  <Text>TEST</Text>
              </DialogContent>
            </Dialog> */}
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
      <View style={styles.quantityContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>4</Text>
          </View>
        </View>
        <View style={styles.foodContainer}>
          <Text style={styles.text}>Stuffed Mushrooms</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>RM32.00</Text>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.icon}>
            <Icon 
              name="edit" 
              color="black" 
              size={15} 
              onPress={() => {
                  this.setState({ visible: true });
              }}
            />
            {/* <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
                this.setState({ visible: false });
            }}
            >
              <DialogContent>
                  <Text>TEST</Text>
              </DialogContent>
            </Dialog> */}
          </View>
        </View>
      </View>
      <View style={styles.totalContainer}>
      <View style={styles.quantityContainer}></View>
        <View style={styles.totalText}>
          <Text style={styles.text}>Total</Text>
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.text}>RM68.00</Text>
        </View>
      </View>
      {/* <View style={styles.container}>
        <Button
          title="Show Dialog"
          onPress={() => {
            this.setState({ visible: true });
          }}
        />
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <DialogContent>
            <Text>TEST</Text>
          </DialogContent>
        </Dialog>
      </View> */}
      <View style={styles.secondaryContainer}>
        <View style={styles.buttonContainer}>
          <NavigationButton navigation={this.props.navigation}/>
        </View>
      </View>
    </SafeAreaView>
     );
  }
}
 
export default CartPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: "purple"
  },
  secondaryContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    // backgroundColor: "purple"
  },
  buttonContainer: {
    height: 50,
    justifyContent: "space-between",
    // alignSelf: "flex-start",
    backgroundColor: "red"
  },
  itemContainer: {
    height: 50,
    // backgroundColor: "yellow",
    flexDirection: "row"
  },
  quantityContainer: {
    height: 50,
    width: "15%",
    // backgroundColor: "red",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "black"
  },
  numberContainer: {
    height: 20,
    width: 20,
    // backgroundColor: "pink",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "purple"
  },
  foodContainer: {
    height: 50,
    width: "60%",
    // backgroundColor: "lightblue",
    justifyContent: "center"
  },
  priceContainer: {
    height: 50,
    width: "15%",
    // backgroundColor: "pink",
    justifyContent: "center"
  },
  editContainer: {
    height: 50,
    width: "10%",
    // backgroundColor: "lightgreen",
    justifyContent: "center"
  },
  totalContainer: {
    height: 50,
    // backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "center"
  },
  dialogContentContainer: {
    justifyContent: "center",
    // backgroundColor: "yellow"
  },
  totalText: {
    height: 50,
    width: "60%",
    // backgroundColor: "pink",
    justifyContent: "center"
  },
  totalPrice: {
    height: 50,
    width: "25%",
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  headingText: {
    fontSize: 40,
    color: "purple",
    left: 50,
    top: 50,
  },
  text: {
    fontSize: 15,
  },
  number: {
    fontSize: 15,
    alignSelf: "center"
  },
  icon: {
    alignSelf: "center"
  },
  dialogText: {
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 30
  }
});