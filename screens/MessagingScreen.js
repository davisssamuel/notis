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
import { decrypt, queryMessages, send } from "../utils/messages.js";
import queryMeta, { queryMetaFromKey } from "../utils/meta.js";
import { getContactFromStorage, getContactsFromStorage } from "../utils/contacts.js";
import { getPublicKeyHex } from "../utils/keys.js";

export default function MessagingScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const pubkey = route.params.pubkey

    useEffect(() => {
        const f = async () => {
            queryMessages(pubkey, async (message) => {
                let user = await getContactFromStorage(message.pubkey);
                decrypt(message.content, pubkey).then( async (decrypted) => {
                    message.content = decrypted
                    if (user == null) {
                        user = await queryMeta();
                        user.nickname = "You";
                    }

                    setMessages((messages) =>
                        insertEventIntoDescendingList(messages, {
                            ...message,
                            user: user
                        }
                    ))
                })
            })
        }
        f();
    },[])

    const sendMessage = async (self) => {
        send(messageInput, pubkey).then(() => {
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
          inverted={true}
        />
        <TextInput
          style={styles.messageCompose}
          placeholder="Text message"
          onChangeText={setMessageInput}
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
    marginBottom: 40,
    marginTop: 0,
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
