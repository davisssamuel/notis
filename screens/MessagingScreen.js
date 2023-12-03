import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { relayInit, finishEvent, nip19 } from "nostr-tools";
import React, { useState } from "react";
import crypto from '../utils/crypto.js'
import * as secp from '@noble/secp256k1'
import { Buffer } from "buffer"
import { getPrivateKeyHex, getPublicKeyHex } from "../utils/keys.js"

export default function MessagingScreen() {
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
    const codedPubKey = "npub16xth77fwr2ddavn0mmr6znsumwvqe6y0ne3tznnh4w6frhjp67jqwj8vm3";
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
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <ScrollView style={styles.messageWrapper}></ScrollView>
        <TextInput
          style={styles.messageCompose}
          placeholder="Message"
          onChangeText={(text) => setMessageInput(text)}
          onSubmitEditing={send}
          // placeholderTextColor="#000"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    paddingHorizontal: 10,
  },
  messageCompose: {
    padding: 10,
    borderRadius: 100,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: "gray",
  },
  keyboardAvoidingView: {
    flex:1,
    justifyContent: "space-between",
  }
});
