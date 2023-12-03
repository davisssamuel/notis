import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { relayInit, finishEvent, generatePrivateKey, nip19 } from "nostr-tools";
import { getPrivateKeyHex, getPublicKeyHex } from "../utils/keys.js";
// import encrypt from "../utils/messages.js";
import crypto from '../utils/crypto.js'
import * as secp from '@noble/secp256k1'
import { Buffer } from "buffer"
// import { nip04 } from "nostr-tools";

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

    const sk = getPrivateKeyHex();
    const pk = getPublicKeyHex();
    const codedPubKey = "npub18e7wwjt0524mz78l23k7pudcsqu5dppztscdrkyycp65mwkx9rnsema6lh";
    let theirPublicKey = nip19.decode(codedPubKey);

    //let encryptedMessage = await encrypt(messageInput, theirPublicKey.data);
    //let encryptedMessage = await nip04.encrypt(sk, theirPublicKey.data, messageInput, );

    let sharedPoint = secp.getSharedSecret(sk, '02' + theirPublicKey.data);
    let sharedX = sharedPoint.slice(1, 33);

    let iv = crypto.randomFillSync(new Uint8Array(16))
    var cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(sharedX),
      iv
    )
    let encryptedMessage = cipher.update(messageInput, 'utf8', 'base64')
    encryptedMessage += cipher.final('base64')
    let ivBase64 = Buffer.from(iv.buffer).toString('base64')
    console.log(ivBase64);

    let sub = relayInstance.sub([{
      kinds: [4],
      authors: [pk],
      "#p": [theirPublicKey.data],
    },
    {
      kinds: [4],
      authors: [theirPublicKey.data],
      "#p": [pk],
    }]);

    sub.on('event', event => {
      console.log(event);
    });

    let newEvent = {
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      kind: 4,
      tags: [['p', theirPublicKey.data]],
      content: encryptedMessage + '?iv=' + ivBase64,
    };

    console.log("signing")
    const signedEvent = finishEvent(newEvent, sk);
    await relayInstance.publish(signedEvent);
    console.log("published")

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