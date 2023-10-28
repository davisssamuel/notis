import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib"; // this line breaks things... 
import { TextInput } from "react-native";
import jsonData from "./data/chats.json";

// creates list of chats in RN
let chats = jsonData.map((jsonData) => {
  return (
    <View
      style={{
        // flex: 1,
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
      <TextInput
        style={{
          backgroundColor: "#eee",
        }}
        defaultValue="Search"
      />

      {/* <MaskedInput
        ref={inputRef}
        renderMaskedText={
          <Text text80 grey60>
            {value}$
          </Text>
        }
      /> */}
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
    borderColor: "red",
    borderWidth: 1,
  },
});
