import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
// import { View, Text, TextInput } from "react-native";
// import { TextInput } from "react-native";
import index from "react-native-ui-lib/src/style/index";
import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";
import TextField from "react-native-ui-lib/textField";
import jsonData from "./data/chats.json";

// creates list of chats in RN
let chats = jsonData.map((jsonData) => {
  return (
    <View
      // style={{
      //   // flex: 1,
      //   width: "100%",
      //   backgroundColor: "#eee",
      //   // debug border
      //   borderColor: "red",
      //   borderWidth: 1,
      // }}
      style={index}
      key={jsonData.id}
    >
      <Text blue30> {jsonData.name} </Text>
      <Text> {jsonData.lastMessage} </Text>
    </View>
  );
});

export default function App() {
  return (
    <View style={index}>
      <TextField placeholder={"Search"} />
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

    // debug border
    // borderColor: "red",
    borderWidth: 1,
  },
});
