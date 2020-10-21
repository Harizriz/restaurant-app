import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import DummyData from "../../components/AppetizerDummyData";

const Item = ({ title, description, image }) => (
  <View style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={image} />
    </View>
  </View>
);

const AppetizerScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("ItemScreen")}>
      <Item
        title={item.title}
        description={item.description}
        image={item.image}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "flex-start",
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textContainer: {
    flexDirection: "column",
    width: "70%",
  },
  imageContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    width: "75%",
  },
  description: {
    fontSize: 10,
    color: "black",
    width: "75%",
  },
  image: {
    alignSelf: "flex-end",
    width: 100,
    height: 100,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default AppetizerScreen;
