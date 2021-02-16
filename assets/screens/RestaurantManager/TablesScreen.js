import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Dimensions, Button } from 'react-native';

import DATA from "../../components/DummyData";
import { TouchableHighlight } from 'react-native-gesture-handler';

const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
);

const renderItem = ({ item }) => (
    <Item title={item.id} />
);

class TablesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Tables Screen</Text>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                />
                <View>
                    <TouchableHighlight onPress={() => console.log("Added!")}
                    underlayColor="none">
                        <View style={styles.button}>
                            <Text style={styles.text}>Add Table</Text>
                        </View>
                    </TouchableHighlight>
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
    },
    headingText: {
        fontSize: 35,
        color: "purple",
        top: 50,
        alignSelf: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 7,
        width: Dimensions.get('window').width * 0.3,
        height: 100,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center'  
    },
    title: {
        fontSize: 32,
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        color: "white"
    },
    button: {
        backgroundColor: "purple",
        padding: 15,
    }
});

export default TablesScreen;