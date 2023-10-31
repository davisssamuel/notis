import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = () => {

  return (
    <View style={styles.messageWrapper}>
      <Text>firstName lastName</Text>
      <Text>lastMessage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    padding: 10,
    marginVertical: 4,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});

export default Message;
