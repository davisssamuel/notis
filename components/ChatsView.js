import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ChatsView() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Chats */}
      <ScrollView style={styles.chatsWrapper}>
        {/* <Text style={styles.sectionTitle}>Chats</Text> */}

        {/* <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#FFF"
          keyboardAppearance="dark"
        /> */}

        <View style={styles.chats}>
          {/* this is where chats will go */}
          <Pressable style={styles.chat}>
            <Image
              style={styles.chatImage}
              src={"https://github.com/identicons/luke.png"}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.sender}>Luke Lyall</Text>
              <Text style={styles.message}>
                Josh won't shut up about the mockups
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28,28,30)",
    // backgroundColor: "#FFF",
  },
  chatsWrapper: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  searchBar: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgb(58,58,60)",
    color: "#FFF",
    borderRadius: 10,
  },
  chat: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  message: {
    fontSize: 14,
    color: "#FFF",
  },
});
