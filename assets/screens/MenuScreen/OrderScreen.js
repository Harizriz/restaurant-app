import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

class OrderScreen extends Component {
  // This part is there is no order by user
  
  componentDidMount() {
    this.animation.play(0, 200);
    this.animation.pause;
  }
  state = {  }
  render() { 
    return ( 
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <LottieView
              ref={animation => {
              this.animation = animation;
              }}
              source={require('./guy-waiting-animation.json')}
              autoPlay
              style={{width: 250, alignSelf: "center"}}
          />
          <Text style={styles.mainText}>You have not placed any orders</Text>
        </View>
      </SafeAreaView>
     );
  }

  // This part is when a user has ordered their food
  // componentDidMount() {
  //   this.animation.play(0, 40);
  //   this.animation.pause;
  // }
  // state = {  }
  // render() { 
  //   return ( 
  //     <SafeAreaView style={styles.container}>
  //       <ScrollView>
  //         <View style={styles.animationContainer}>
  //           <LottieView
  //               ref={animation => {
  //               this.animation = animation;
  //               }}
  //               source={require('./cooking-animation.json')}
  //               autoPlay
  //               style={{width: 250, alignSelf: "center"}}
  //           />
  //           <Text style={styles.mainText}>Preparing your order</Text>
  //           This part below is when all orders have been delivered 
  //           It will last for one hour-ish
  //           <LottieView
  //             ref={animation => {
  //             this.animation = animation;
  //             }}
  //             source={require('./success-animation.json')}
  //             loop={false}
  //             style={{width: 150, alignSelf: "center"}}
  //           />
  //           <Text style={styles.mainText}>All orders have been delivered.</Text>
  //           <Text style={styles.mainText}>Enjoy your meal!</Text>
  //         </View>
  //         <View style={styles.contentContainer}>
  //           <View style={styles.titleContainer}>
  //             <Text style={styles.titleText}>Order Summary</Text>
  //           </View>
  //           <View style={styles.orderContainer}>
  //             <View style={styles.leftOrderContainer}>
  //               <View style={styles.numberContainer}>
  //                 <Text style={styles.number}>2</Text>
  //               </View>
  //             </View>
  //             <View style={styles.middleOrderContainer}>
  //               <Text style={styles.text}>French Fries</Text>
  //             </View>
  //             <View style={styles.rightOrderContainer}>
  //               <Icon name="check" color="green" size={15} />
  //             </View>
  //           </View>
  //           <View style={styles.orderContainer}>
  //             <View style={styles.leftOrderContainer}>
  //               <View style={styles.numberContainer}>
  //                 <Text style={styles.number}>1</Text>
  //               </View>
  //             </View>
  //             <View style={styles.middleOrderContainer}>
  //               <Text style={styles.text}>Garlic Bread</Text>
  //             </View>
  //             <View style={styles.rightOrderContainer}>
  //               <Icon name="check" color="green" size={15} />
  //             </View>
  //           </View>
  //           <View style={styles.orderContainer}>
  //             <View style={styles.leftOrderContainer}>
  //               <View style={styles.numberContainer}>
  //                 <Text style={styles.number}>4</Text>
  //               </View>
  //             </View>
  //             <View style={styles.middleOrderContainer}>
  //               <Text style={styles.text}>Stuffed Mushrooms</Text>
  //             </View>
  //             <View style={styles.rightOrderContainer}>
  //               <Icon name="check" color="green" size={15} />
  //             </View>
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    // backgroundColor: "white"
  },
  mainContainer: {
    height: "100%",
    justifyContent: "center",
    bottom: 40,
  },
  animationContainer: {
    height: 350,
    justifyContent: "center",
    bottom: 40,
  },
  contentContainer: {
    height: 500,
    backgroundColor: "white"
  },
  titleContainer: {
    height: 70,
    // backgroundColor: "pink",
  },
  orderContainer: {
    height: 50,
    flexDirection: "row",
    // backgroundColor: "blue"
  },
  leftOrderContainer: {
    height: 50,
    width: "18%",
    // backgroundColor: "orange",
    justifyContent: "center"
  },
  middleOrderContainer: {
    height: 50,
    width: "75%",
    // backgroundColor: "pink",
    justifyContent: "center"
  },
  rightOrderContainer: {
    height: 50,
    width: "10%",
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  numberContainer:{
    height: 30,
    width: 30,
    left: 20,
    backgroundColor: "lightgrey",
    alignContent: "flex-start",
    justifyContent: "center",
    // borderWidth: 1,
    borderColor: "purple"
  },
  mainText:{
    fontSize: 30,
    top: 20,
    alignSelf: "center",
    textAlign: "center"
  },
  titleText:{
    fontSize: 25,
    top: 20,
    left: 20
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  text: {
    fontSize: 20,
    color: "dimgrey"
  }
})
 
export default OrderScreen;