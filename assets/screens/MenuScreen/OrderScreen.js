import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from 'react-native-gesture-handler';
import settings from "../../../settings";

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        dataSource: '',
        tableArray: [],
        showTable: {},
        deliveredOrders: false
    };
  }
  componentDidMount = async () => {
    // const tableOrderId = this.props.route.params.tableId
    const tableOrderId = 4

    setTimeout(() => {
      this.animation.play(0, 40);
      this.animation.pause;
    }, 1000);


    fetch(settings.ipAddress+`/api/orders/${encodeURI(tableOrderId)}`)
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
            dataSource: responseJson
        });
    })
  }
  render() { 
    // retrieve orders from a specific tableId
    let tableTree = {};
    for(let i=0; i<this.state.dataSource.length; i++) {
        this.state.tableArray.push(this.state.dataSource[i].tableId)
        if (tableTree[this.state.dataSource[i].tableId]){
            tableTree[this.state.dataSource[i].tableId].push(this.state.dataSource[i])
        }
        else {
            tableTree[this.state.dataSource[i].tableId] = [this.state.dataSource[i]]
        }
    }

    let check = ''
    let tableLength = Object.keys(tableTree).length
    for (let i = 0; i < tableLength; i++) {
      const tableId = Object.keys(tableTree)[i]
      const table = tableTree[tableId] 
      let tableAND = true
      for (let i=0; i<table.length; i++) {
          tableAND = tableAND && table[i].preparedDish
      } 
      if (tableAND && table[i].preparedDish) {
        check = true
      }
    }
    const renderEmptyAnimation = () => {
      return ( 
        <View>
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
        </View>
      );
    }
    const renderAnimation = ( check ) => {
      if (check == false) {
        return (
          <View>
            <LottieView
              ref={animation => {
              this.animation = animation;
              }}
              source={require('./cooking-animation.json')}
              autoPlay
              style={{width: 250, alignSelf: "center"}}
            />
            <Text style={styles.mainText}>Preparing your order</Text>
          </View>
        )
      }
      else {
        return (
          <View>
            <LottieView
              ref={animation => {
              this.animation = animation;
              }}
              source={require('./success-animation.json')}
              loop={false}
              style={{width: 150, alignSelf: "center", top: 10}}
            />
            <Text style={styles.mainText}>All orders have been delivered.</Text>
            <Text style={styles.mainText}>Enjoy your meal!</Text>
          </View>
        )
      }
    }
    // render flatlist of the tableId's orders
    const renderTables = ( tables ) => {
      let tableJSX = []
      let tableLength = Object.keys(tables).length
      for (let i = 0; i < tableLength; i++) {
        const tableId = Object.keys(tables)[i]
        const table = tables[tableId] 
        tableJSX.push(
          <View>
            <View>
              <FlatList
                data={table}
                renderItem={renderItem}
                keyExtractor={item => item.objectId}
              />
            </View>
          </View>
        )
      }
      return ( 
        [tableJSX]
      )
    }
    const Item = ({ dishName, dishQuantity, preparedDish }) => (
      <View style={styles.item}>
        <View style={styles.orderContainer}>
          <View style={styles.leftOrderContainer}>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{dishQuantity}</Text>
            </View>
          </View>
          <View style={styles.middleOrderContainer}>
            <Text style={styles.text}>{dishName}</Text>
          </View>
          <View style={styles.rightOrderContainer}>
            <Icon 
              name="check" 
              color={preparedDish ? "limegreen" : "lightslategrey" }
              size={30} 
              style={{ alignSelf: "center" }}/>
          </View>
        </View>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item 
        dishName={item.dishName} 
        dishQuantity={item.dishQuantity}
        preparedDish={item.preparedDish} />
    );
    return ( 
      <SafeAreaView style={styles.container}>
      { this.state.tableArray[0] == null ? renderEmptyAnimation() :
      <View>
        <View style={styles.animationContainer}>
            { renderAnimation (check) }
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Order Summary</Text>
            </View>
            <ScrollView>
              { renderTables (tableTree) }
            </ScrollView>
          </View>
      </View>
      }
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
    height: 425,
    backgroundColor: "white"
  },
  titleContainer: {
    height: 70,
    justifyContent: "center"
  },
  item: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  orderContainer: {
    height: 50,
    flexDirection: "row",
  },
  leftOrderContainer: {
    height: 50,
    width: "16%",
    justifyContent: "center"
  },
  middleOrderContainer: {
    height: 50,
    width: "68%",
    justifyContent: "center"
  },
  rightOrderContainer: {
    height: 50,
    width: "16%",
    justifyContent: "center"
  },
  numberContainer:{
    height: 30,
    width: 30,
    left: 10,
    backgroundColor: "lightgrey",
    alignContent: "flex-start",
    justifyContent: "center",
    borderColor: "purple"
  },
  mainText:{
    fontSize: 30,
    top: 40,
    alignSelf: "center",
    textAlign: "center"
  },
  titleText:{
    fontSize: 25,
    top: 5,
    left: 20,
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  text: {
    fontSize: 20,
    color: "black"
  }
})
 
export default OrderScreen;