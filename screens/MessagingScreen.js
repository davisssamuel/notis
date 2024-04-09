import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import { relayInit, finishEvent, nip19, nip04, nip44, nip10, Event} from "nostr-tools";
import { insertEventIntoDescendingList, insertEventIntoAscendingList } from "../utils/sorting.js";
import React, { useEffect, useState } from "react";
import Message from "../components/Message.js";
import DecryptionQueue from "../utils/DecryptionQueue.js"
import { send } from "../utils/messages.js";

export default function MessagingScreen(...props) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  /*const sk = await getPrivateKeyHex();
  const pk = await getPublicKeyHex();
  const codedPubKey = "npub1uqj8jgd5uch8srmwxzvj5u6wzl0fc2vuzd8euwgj7rllhz6aagdslf3lxy";
  let theirPublicKey = "e0247921b4e62e780f6e30992a734e17de9c299c134f9e3912f0fffb8b5dea1b";*/

    useEffect(() => {
        //console.log(props)
    },[])

    const sendMessage = async (self) => {
        send(messageInput, "<PUBKEY>").then(() => {
            setMessageInput("");
            self.target.value = ""
        }).catch((e) => {
            console.log("ERROR SENDING:", messageInput)
            console.error(e)
        })
    };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            return <Message message={item}/>;
          }}
          keyExtractor={(item) => item.id}
          style={styles.messageWrapper}
          contentInsetAdjustmentBehavior="automatic"
        />
        <TextInput
          style={styles.messageCompose}
          placeholder="Text message"
          onChangeText={(text) => setMessageInput(text)}
          onSubmitEditing={sendMessage}
          placeholderTextColor="#888"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    paddingHorizontal: 10,
    marginTop: "auto",
    borderBottomWidth:45
  },
  messageCompose: {
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 5,
    borderStyle: "dashed",
    borderWidth: 3,
    borderBottomWidth: 1,
    borderColor: "gray",
    backgroundColor:"#222222",
    height: 40,
    fontSize: 20,
    color: "white",
    position: "absolute",
    left:0,
    right:0,
    bottom:0
  },
  keyboardAvoidingView: {
    flex:1,
  }
});
