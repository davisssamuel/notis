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
  const [contactData, setContactData] = useState();
  const [metaContactData, setMetaContactData] = useState();
  const [blocked, setBlocked] = useState();
  const [isTextInputFocused, setIsTextInputFocused] = useState(true);
  let myMeta = null;
  let contact = null;
  let metaContact = null;
  let myPK = null;

  const pubkey = route.params.pubkey

    useEffect(() => {
        setMessages([])
        
        const f = async () => {
            myMeta = await queryMeta()
            contact = await getContactFromStorage(pubkey)
            setContactData(contact)
            metaContact = {...(await queryMetaFromKey(pubkey)),nickname:""};
            setMetaContactData(metaContact)
            setBlocked(await isBlocked(pubkey))
            myPK = await getPublicKeyHex()

            queryMessages(pubkey, await getPublicKeyHex(), async (message) => {
                message.content = await decrypt(message.content, pubkey)
                let user = message.pubkey == myPK ? {...myMeta, nickname: "You"} : (contact == null ? metaContact : contact)
                setMessages((messages) =>
                    insertEventIntoDescendingList(messages, {
                        ...message,
                        user: user,
                        myPubkey: myPK
                    }
                ))
            }, (e) => {
                // eose
            })
        }
        f();
    },[route])

    const sendMessage = async (self) => {
        send(messageInput, pubkey).then(() => {
            setMessageInput("");
            self.target.value = "";
            
            setIsTextInputFocused(true);
        }).catch((e) => {
            console.error(e)
        })
    };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={styles.chatOptionsBar}>
            <Pressable style={styles.option} onPress={() => {
                if (contactData != null) {
                    setPage("Contacts")
                    navigation.goBack()
                    navigation.navigate("Contacts", {screen: "ContactInfoScreen", params: { contact: {...contactData, pubkey:pubkey} }})
                }
                else {
                    setPage("Contacts")
                    addContact(pubkey ,"")
                    navigation.goBack()
                    navigation.navigate("Contacts", {screen: "ContactInfoScreen", params: { contact: {...metaContactData, pubkey:pubkey} }})
                }
            }}>
                <Text style={{color: "inherit", fontWeight:"inherit", fontSize: "inherit"}}>Edit Contact</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => {
                if (blocked) {
                    setBlocked(false)
                    unblockContact(pubkey)
                    //navigation.navigate("ChatsScreen")
                }
                else {
                    setBlocked(true)
                    blockContact(pubkey)
                    //navigation.navigate("ChatsScreen")
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
