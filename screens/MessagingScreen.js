import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Pressable
} from "react-native";
import { insertEventIntoDescendingList, insertEventIntoAscendingList } from "../utils/sorting.js";
import React, { useEffect, useState } from "react";
import Message from "../components/Message.js";
import { decrypt, queryMessages, send } from "../utils/messages.js";
import queryMeta, { queryMetaFromKey } from "../utils/meta.js";
import { addContact, blockContact, getContactFromStorage, getContactsFromStorage, isBlocked, unblockContact } from "../utils/contacts.js";
import { getPublicKeyHex } from "../utils/keys.js";
import { setPage } from "../utils/statePersistence.js";
// import { relayInit, finishEvent, nip19, nip04, nip44, nip10, Event} from "nostr-tools";
// import DecryptionQueue from "../utils/DecryptionQueue.js"

export default function MessagingScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [contact, setContact] = useState();
  const [metaContact, setMetaContact] = useState();
  const [blocked, setBlocked] = useState();
  const [isTextInputFocused, setIsTextInputFocused] = useState(true);

  const pubkey = route.params.pubkey


    useEffect(() => {
        const f = async () => {
            setContact(await getContactFromStorage(pubkey));
            setMetaContact({...(await queryMetaFromKey(pubkey)),nickname:""});
            setBlocked(await isBlocked(pubkey))

            queryMessages(pubkey, async (message) => {
                let storageUser = await getContactFromStorage(message.pubkey);
                let relayUser = await queryMetaFromKey(message.pubkey)
                relayUser.nickname = "";
                let decrypted = await decrypt(message.content, pubkey)
                message.content = decrypted
                if (message.pubkey == await getPublicKeyHex()) {
                    storageUser = await queryMeta();
                    storageUser.nickname = "You";
                }
                setMessages((messages) =>
                    insertEventIntoDescendingList(messages, {
                        ...message,
                        user: storageUser == null ? relayUser : storageUser
                    }
                ))
            }, (e) => {
                // eose
            })
        }
        f();
    },[])

    const sendMessage = async (self) => {
        send(messageInput, pubkey).then(() => {
            setMessageInput("");
            self.target.value = "";
            
            setIsTextInputFocused(true);
        }).catch((e) => {
            console.log("ERROR SENDING:", messageInput)
            console.error(e)
        })
    };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={styles.chatOptionsBar}>
            <Pressable style={styles.option} onPress={() => {
                if (contact != null) {
                    setPage("Contacts")
                    navigation.navigate("Contacts", {screen: "ContactInfoScreen", params: { contact: {...contact, pubkey:pubkey} }})
                }
                else {
                    setPage("Contacts")
                    addContact(pubkey ,"")
                    navigation.navigate("Contacts", {screen: "ContactInfoScreen", params: { contact: {...metaContact, pubkey:pubkey} }})
                }
            }}>
                <Text style={{color: "inherit", fontWeight:"inherit", fontSize: "inherit"}}>Edit Contact</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => {
                if (blocked) {
                    unblockContact(pubkey)
                }
                else {
                    blockContact(pubkey)
                }
            }}>
                <Text style={{color: "inherit", fontWeight:"inherit", fontSize: "inherit"}}>{blocked ? "Unblock" : "Block"}</Text>
            </Pressable>
        </View>
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
          onFocus={() => setIsTextInputFocused(true)}
          onEndEditing={() => setIsTextInputFocused(true)}
          blurOnSubmit={false}
          autoFocus={isTextInputFocused}
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
    margin:"auto",
    maxWidth: 600,
    width: "100%"
  },
  chatOptionsBar: {
    alignContent: "center",
    height: 35,
    flexDirection: "row",
    paddingHorizontal: 5,
    gap: 5,
  },
  option: {
    flex:1,
    color: "#FFF",
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
  }
});
