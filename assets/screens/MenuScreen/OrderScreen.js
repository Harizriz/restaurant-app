import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  /* This part is there is no order by user */

  // componentDidMount = async () => {
  //   this.animation.play(0, 200);
  //   this.animation.pause;
  // }
  // render() { 
  //   return ( 
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.mainContainer}>
  //         <LottieView
  //             ref={animation => {
  //             this.animation = animation;
  //             }}
  //             source={require('./guy-waiting-animation.json')}
  //             autoPlay
  //             style={{width: 250, alignSelf: "center"}}
  //         />
  //         <Text style={styles.mainText}>You have not placed any orders</Text>
  //       </View>
  //     </SafeAreaView>
  //    );
  // }

  /* This part is when a user has ordered their food */
  componentDidMount = async () => {
    const tableOrderId = this.props.route.params.tableId
    // const tableOrderId = 3

    setTimeout(() => {
      this.animation.play(0, 40);
      this.animation.pause;
    }, 1000);


    fetch(`http://172.20.10.5:5000/api/orders/${encodeURI(tableOrderId)}`)
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
            dataSource: responseJson
        });
    })
  }
  render() { 

    let tableTree = {};
    for(let i=0; i<this.state.dataSource.length; i++) {
        // console.log(this.state.dataSource[i].tableId)
        this.state.tableArray.push(this.state.dataSource[i].tableId)
        //  console.log(tableTree[this.state.dataSource[i].tableId])
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

    const renderTables = ( tables ) => {
      let tableJSX = []
      let check = ''
      let tableLength = Object.keys(tables).length
      for (let i = 0; i < tableLength; i++) {
        const tableId = Object.keys(tables)[i]
        const table = tables[tableId] 
        // let tableAND = true
        // for (let i=0; i<table.length; i++) {
        //     tableAND = tableAND && table[i].preparedDish
        // } 
        // if (tableAND && table[i].preparedDish) {
        //   check = true
        //   console.log("all checked")
        // }
        // else {
        //   check = false
        //   console.log("not checked")
        // }
        tableJSX.push(
          <View>
            {/* { this.state.showTable[tableId] ?  */}
            <View>
              <FlatList
                data={table}
                renderItem={renderItem}
                keyExtractor={item => item.objectId}
              />
            </View>
            {/* : null } */}
          </View>
        )
      }
      return ( 
          // <ScrollView>
              [tableJSX]
          // </ScrollView>
          )
    }

    console.log(check)

    return ( 
      <SafeAreaView style={styles.container}>
        <View style={styles.animationContainer}>
          {/* { check == false ? 
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
            </View> :
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
          } */}
          { renderAnimation (check) }
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Order Summary</Text>
          </View>
          { renderTables (tableTree) }
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
    // backgroundColor: "blue"
  },
  leftOrderContainer: {
    height: 50,
    width: "16%",
    // backgroundColor: "orange",
    justifyContent: "center"
  },
  middleOrderContainer: {
    height: 50,
    width: "68%",
    // backgroundColor: "pink",
    justifyContent: "center"
  },
  rightOrderContainer: {
    height: 50,
    width: "16%",
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  numberContainer:{
    height: 30,
    width: 30,
    left: 10,
    backgroundColor: "lightgrey",
    alignContent: "flex-start",
    justifyContent: "center",
    // borderWidth: 1,
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