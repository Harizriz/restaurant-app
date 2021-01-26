import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Octicons"
import PlusIcon from "react-native-vector-icons/Feather"
import Button from "react-native-button"

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { }
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
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => console.log("Chose")}>
            <Text style={styles.cardInformationText}>
              Visa Ending in 4242
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => console.log("Add")}>
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
            marginBottom: 10
          }}
          >
            Proceed
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
    iconContainer: {
      height: "30%",
      // backgroundColor: "yellow",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "black"
    },
    cardsContainer: {
      height: "20%",
      // backgroundColor: "orange",
      marginTop: 10
    },
    cardContainer: {
      height: 50,
      // backgroundColor: "pink",
      justifyContent: "center"
    },
    buttonContainer: {
      height: "50%",
      justifyContent: "flex-end"
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
  });
 
export default PaymentScreen;