import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import jsonData from "./data/chats.json";
import NDK from '@nostr-dev-kit/ndk';

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
