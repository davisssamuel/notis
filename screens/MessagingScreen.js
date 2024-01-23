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
import crypto from '../utils/crypto.js'
import * as secp from '@noble/secp256k1'
import { Buffer } from "buffer"
import { getPrivateKeyHex, getPublicKeyHex } from "../utils/keys.js"
import Message from "../components/Message.js";
import DecryptionQueue from "../utils/DecryptionQueue.js"

export default function MessagingScreen() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  DecryptionQueue.setDecryptFn(nip04.decrypt)

  const sk = getPrivateKeyHex();
  const pk = getPublicKeyHex();
  const codedPubKey = "npub1uqj8jgd5uch8srmwxzvj5u6wzl0fc2vuzd8euwgj7rllhz6aagdslf3lxy";
  let theirPublicKey = "e0247921b4e62e780f6e30992a734e17de9c299c134f9e3912f0fffb8b5dea1b";

  const relayInstance = relayInit("wss://relay1.nostrchat.io");
  relayInstance.on('connect', () => {
    console.log(`connected to ${relayInstance.url}`);
  });
  relayInstance.on('error', () => {
    console.log(`failed to connect to ${relayInstance.url}`);
  });

  useEffect(() => {

    relayInstance.connect().then(() => {
      let sub = relayInstance.sub([{
        kinds: [4],
        authors: [pk],
        "#p": [theirPublicKey],
      },
      {
        kinds: [4],
        authors: [theirPublicKey],
        "#p": [pk],
      }]);

      const onEvent = async (event) => {
        nip04.decrypt(getPrivateKeyHex(), theirPublicKey, event.content).then((e) => {
          setMessages((messages) =>
            insertEventIntoAscendingList(messages, {
              ...event,
              content: e
            }))
        })
        /*
        DecryptionQueue.add(event.content, theirPublicKey, (err, msg) => {
          if (err) {
            return console.log(err);
          }
  
          const decryptedEvent = {
            ...event,
            content: msg,
          }

          console.log(msg)

          setMessages((messages) =>
            insertEventIntoDescendingList(messages, decryptedEvent)
          );
        });*/
      };
    
      sub.on('event', onEvent);

      return () => {
        sub.unsub();
        sub.off("event", onEvent);
        DecryptionQueue.clear();
      };
    })
  },[])

  const send = async (self) => {
    self.target.value = ""
    relayInstance.connect().then(() => {

      let sharedPoint = secp.getSharedSecret(sk, '02' + theirPublicKey);
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
      //console.log(ivBase64);

      let newEvent = {
        pubkey: pk,
        created_at: Math.floor(Date.now() / 1000),
        kind: 4,
        tags: [['p', theirPublicKey]],
        content: encryptedMessage + '?iv=' + ivBase64,
      };

      //console.log("signing")
      const signedEvent = finishEvent(newEvent, sk);
      relayInstance.publish(signedEvent).catch((e) => {
        console.log(e)
      })
      //console.log("published")

      setMessageInput("");
      self.target.value = ""
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
          onSubmitEditing={send}
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
