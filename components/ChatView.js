import * as React from "react";
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";

export default function ChatView() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28,28,30)",
    // backgroundColor: "#E8EAED",
  },
});
