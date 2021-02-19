import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class TablesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource: ''
        };
    }
    componentDidMount = async () => {
        fetch(`http://172.20.10.5:5000/api/tables`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
            dataSource: responseJson
            });
        })
        // auto-refresh the screen
        this.props.navigation.addListener('focus', () => {
            fetch(`http://172.20.10.5:5000/api/tables`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                dataSource: responseJson
                });
            })
        });
    }
    
    render() {
        const Item = ({ qrCodeValue, paxValue }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{qrCodeValue}</Text>
              <Text style={styles.content}>{paxValue}</Text>
            </View>
        );
        
        const renderItem = ({ item }) => (
            <Item qrCodeValue={item.qrCodeValue} paxValue={item.paxValue}/>
        );
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.objectId}
                    numColumns={3}
                />
                <View>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("QrCodeManagerScreen")}
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
    content: {
        fontSize: 24
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