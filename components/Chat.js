import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { minidenticonSvg } from 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.0/minidenticons.min.js'

const Chat = () => {

  return (
    <View> 
      <Text>firstName lastName</Text>
      <Text>lastMessage</Text>
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