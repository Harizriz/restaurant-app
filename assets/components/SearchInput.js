import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

// const filterList = () => {
//   return DATA.filter(
//     (listItem) => listItem.id.toLowerCase() || listItem.title.toLowerCase()
//   );
// };

const SearchInput = (props) => {
  const [value, onChangeText] = React.useState();

  return (
    <View style={styles.searchContainer}>
      <Icon style={styles.icon} name="search" color="black" size={10} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="black"
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      {/* {filterList(DATA).map((listItem, index) => (
        <MainMenuList key={index} title={listItem.title} />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 50,
    // backgroundColor: "red",
    width: "92%",
    left: 16,
    borderRadius: 5
    // borderColor: "lightgray",
    // borderWidth: 1
  },
  icon: {
    padding: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    borderLeftColor: "lightgray",
    borderLeftWidth: 1,
    // backgroundColor: "#fff",
    // color: "#424242",
    // height: 40,
    // borderColor: "gray",
    // borderWidth: 2,
    // borderRadius: 5,
    // width: "50%",
    // left: 20,
    paddingLeft: 10,
    // marginTop: 10,
  },
});

export default SearchInput;
