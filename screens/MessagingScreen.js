import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { relayInit, finishEvent, generatePrivateKey, nip19 } from "nostr-tools";
import { getPublicKeyHex } from "../utils/keys.js";
import encrypt from "../utils/messages.js";

const MessagingScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const send = async () => {
    const relayInstance = relayInit("wss://relay.damus.io");
    relayInstance.on('connect', () => {
      console.log(`connected to ${relayInstance.url}`);
    });
    relayInstance.on('error', () => {
      console.log(`failed to connect to ${relayInstance.url}`);
    });

    await relayInstance.connect();

    const pk = getPublicKeyHex();
    const codedPubKey = "npub14t4uyrrgvyweuxkdhjqfsx2vnwxvedmar480r57v76ktnl7tfe8qrkd2tx";
    let theirPublicKey = nip19.decode(codedPubKey);

    let encryptedMessage = await encrypt(messageInput, theirPublicKey.data);

    let sub = relayInstance.sub([{
      kinds: [4],
      authors: [pk],
      "#p": [theirPublicKey.data],
    }]);

    sub.on('event', event => {
      console.log(event);
    });

    let newEvent = {
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      kind: 4,
      tags: [['p', theirPublicKey.data]],
      content: encryptedMessage,
    };

    const signedEvent = finishEvent(newEvent, generatePrivateKey());
    await relayInstance.publish(signedEvent);

    relayInstance.close();
    setMessageInput("");
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.messageWrapper}>
        {messages.map((message, index) => (
          <Text key={index}>{message.content}</Text>
        ))}
      </ScrollView>
      <View style={styles.messageComposeWrapper}>
        <TextInput
          style={styles.messageCompose}
          placeholder="Message"
          value={messageInput}
          onChangeText={(text) => setMessageInput(text)}
          onSubmitEditing={send}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    paddingHorizontal: 10,
  },
  messageComposeWrapper: {
    paddingHorizontal: 10,
  },
  messageCompose: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "gray",
  },
});

export default MessagingScreen;