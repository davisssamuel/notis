// import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import jsonData from "./data/chats.json";
// import NDK from '@nostr-dev-kit/ndk';

// creates list of chats in RN
let chats = jsonData.map((jsonData) => {
  return (
    <View
      style={{
        // flex: 1,
        width: "100%",
        padding: 10,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: "#FFF",
        borderRadius: 10,
      }}
      key={jsonData.id}
    >
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {" "}
        {jsonData.name}{" "}
      </Text>

      <Text> {jsonData.lastMessage} </Text>
    </View>
  );
});

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* Chats */}
      <ScrollView style={styles.chatsWrapper}>
        <Text style={styles.sectionTitle}>Chats</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#000"
        />

        <View style={styles.chats}>
          {/* this is where chats will go */}
          {chats}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  chatsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFF",
    borderRadius: 100,
  },
  chats: {},
});
