import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

class VirtualQueueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        // const Item = ({ menuName }) => (
        //     <View style={styles.item}>
        //         <Text style={styles.title}>{menuName}</Text>
        //     </View>
        // );
          
        // const renderItem = ({ item }) => (
        //     <TouchableOpacity onPress={() => this.props.navigation.navigate("DishesScreen", {tableId: this.state.tableId, menuId: item.objectId})}>
        //         <Item menuName={item.menuName} />
        //     </TouchableOpacity>
        // );

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Virtual Queue Screen</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.title}>People in Line</Text>
                    <Text style={styles.body}>9</Text>
                </View>
                {/* insert flatlist here */}
                {/* <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                /> */}
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
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    secondContainer: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        bottom: 10,
        fontWeight: "bold"
    },
    body: {
        fontSize: 25,
        top: 10
    },
});

export default VirtualQueueScreen;