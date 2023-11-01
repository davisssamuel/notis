import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

 export default function Chat() {
  return (
    <Pressable style={styles.chat}>
      <Image
        style={styles.chatImage}
        src={"https://github.com/identicons/luke.png"}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.sender}>Luke Lyall</Text>
        <Text style={styles.message}>Josh won't shut up about the mockups</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  sender: {
    fontWeight: "bold",
    color: "#FFF",
  },
  message: {
    color: "#FFF",
  },
});
