import * as React from "react";
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import jsonData from "../data/chats.json";

// creates list of chats elements
let chats = jsonData.map((jsonData) => {
  return (
    <View
      style={{
        // flex: 1,
        width: "100%",
        padding: 10,
        marginVertical: 4,
        backgroundColor: "rgb(44,44,46)",
        borderRadius: 10,
      }}
      key={jsonData.id}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#FFF",
        }}
      >
        {" "}
        {jsonData.name}{" "}
      </Text>

      <Text
        style={{
          color: "#FFF",
        }}
      >
        {" "}
        {jsonData.lastMessage}{" "}
      </Text>
    </View>
  );
});

export default function ChatsList() {
  return (
    <View style={styles.container}>
      {/* Chats */}
      <ScrollView style={styles.chatsWrapper}>
        <Text style={styles.sectionTitle}>Chats</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#FFF"
          keyboardAppearance="dark"
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
    backgroundColor: "rgb(28,28,30)",
    // backgroundColor: "#E8EAED",
  },
  chatsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  searchBar: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgb(58,58,60)",
    color: "#FFF",
    borderRadius: 10,
  },
  chats: {},
});