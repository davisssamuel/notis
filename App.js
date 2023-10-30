import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import { View, Text, TextInput } from "react-native";
// import { TextInput } from "react-native";

// import index from "react-native-ui-lib/src/style/index";
// import View from "react-native-ui-lib/view";
// import Text from "react-native-ui-lib/text";
// import TextField from "react-native-ui-lib/textField";

// import React, {Component} from 'react';
// import {View, TextField, Text} from 'react-native-ui-lib';


// import MyScreen from "./MyScreen.js"
import jsonData from "./data/chats.json";

// creates list of chats in RN
let chats = jsonData.map((jsonData) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#eee",
        // debug border
        borderColor: "red",
        borderWidth: 1,
      }}
      key={jsonData.id}
    >
      <Text> {jsonData.name} </Text>
      <Text> {jsonData.lastMessage} </Text>
    </View>
  );
});

export default function App() {
  return (
    <View style={styles.container}>
      {/* <TextField preset={index} placeholder={"Search"} /> */}
      <ScrollView>{chats}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
  },
});
