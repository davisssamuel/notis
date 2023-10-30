import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = () => {

  return (
    <View> 
      <Text>This is a chat</Text>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});

export default Chat;