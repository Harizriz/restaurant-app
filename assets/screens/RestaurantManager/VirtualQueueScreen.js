import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '4 Pax',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '2 Pax',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '10 Pax',
    },
    {
        id: '4',
        title: '6 Pax',
    },
    {
        id: '5',
        title: '4 Pax',
    },
    {
        id: '6',
        title: '8 Pax',
    },
    {
        id: '7',
        title: '2 Pax',
    },
    {
        id: '8',
        title: '3 Pax',
    },
    {
        id: '9',
        title: '1 Pax',
    },
];

class VirtualQueueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        const Item = ({ title }) => (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
          
        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Virtual Queue Screen</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.titleText}>People in Line</Text>
                    <Text style={styles.body}>9</Text>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                />
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
    titleText: {
        fontSize: 30,
        bottom: 10,
        fontWeight: "bold"
    },
    body: {
        fontSize: 25,
        top: 10
    },
    item: {
        borderColor: "black",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        // backgroundColor: "yellow"
    },
    title: {
        fontSize: 25,
        width: "80%"
    },
});

export default VirtualQueueScreen;