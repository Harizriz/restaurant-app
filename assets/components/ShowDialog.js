import React from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
// https://www.npmjs.com/package/react-native-popup-dialog

const showDialog = () => {
    return (
      <View style={styles.container}>
        <Button
          title="Show Dialog"
          onPress={() => {
            this.setState({ visible: true });
          }}
        />
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <DialogContent>
            <Text>TEST</Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
})

export default showDialog