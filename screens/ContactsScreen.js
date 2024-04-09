import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, View, Text, Modal, TextInput } from "react-native";
import Contact from "../components/Contact"

import { addContact, getContactsFromStorage, saveContactsToStorage } from "../utils/contacts";
import { getPublicKeyHex } from "../utils/keys";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { setPage } from "../utils/statePersistence";
import queryContacts from "../utils/contacts";
import { queryMetaFromKey } from "../utils/meta";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState(null)

  const [isModalVisible, setModalVisible] = useState(false);
  const [publicKey, setPublicKey ] = useState('');
  const [nickname, setNickname ] = useState('');

  useEffect(() => {
        async function f() {
            queryContacts(async (c) => {
                let allContacts = []
                for(let contact of c.tags) {
                    let key = contact[1]
                    let nickname = contact[3]
                    allContacts.push({
                        ...(await queryMetaFromKey(key)),
                        nickname: nickname,
                        pubkey: key,
                    })
                }
                allContacts.sort((a, b) => (a.nickname == "" ? (a.name == "" ? "" : a.name[0]) : a.nickname[0]) - (b.nickname == "" ? (b.name == "" ? "" : b.name[0]) : b.nickname[0]));
                saveContactsToStorage(allContacts)
                setContacts(allContacts)
            })
        }
        f()
  }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const newContact = () => {
        if (publicKey.length === 64) {
            addContact(publicKey, nickname).then(() => {
                setPublicKey("")
                setNickname("")
            })
            toggleModal();
        } else {
            console.log('Public key needs to be 64 characters');
        }
      };


      return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.blankList}>{contacts === null ? "Nothing to see here..." : null}</Text>
          <FlatList
            data={contacts}
            renderItem={({ item }) => {
              return <Contact contact={item}/>;
            }}
            keyExtractor={(item) => item.pubkey}
            style={{ paddingHorizontal: 16 }}
            contentInsetAdjustmentBehavior="automatic"
          />
          <View style = {{ alignItems: 'flex-end', margin:20,}}>
            <Pressable onPress= { toggleModal } style = {{ width: 50, height: 50, borderRadius: 100, backgroundColor: 'white', }}>
              <Text style={{ color:'black', fontSize: 50, flex: 1, textAlign: "center", lineHeight: 43}}>+</Text>
            </Pressable>
          </View>
          <Modal 
                  animationType = "none"
                  transparent = {true}
                  visible = {isModalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popup}>
                <Text style={styles.popupText}>Add a public key to your contacts:</Text>
                <TextInput
                style={styles.popupInput}
                placeholder="Public Key"
                placeholderTextColor={"gray"}
                value={publicKey}
                onChangeText={setPublicKey}
                />
                <TextInput
                style={styles.popupInput}
                placeholder="Nickname"
                placeholderTextColor={"gray"}
                value={nickname}
                onChangeText={setNickname}
                />
                <View style={styles.footer}>
                  <Pressable style = {styles.popupButtons} onPress = {toggleModal}>
                    <Text style = {{color: 'white'}}>Cancel</Text>
                  </Pressable>
                  <Pressable style = {styles.popupButtons} onPress = {newContact}>
                    <Text style = {{color: 'white'}}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    blankList: {
        color: "gray",
        marginHorizontal: "auto",
        marginTop: 5,
        marginBottom: -5,
        fontSize: 17,
    },
    popupContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popup: {
      width: '75%',
      backgroundColor: "rgba(225, 225, 225, 0.12)",
      padding: 20,
      borderRadius: 25,
      color: "#FFF"
    },
    popupInput: {
        height: 35,
        backgroundColor: "#444",
        color: "#FFF",
        borderRadius: 8,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    footer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    popupButtons: {
        color: "#FFF",
        backgroundColor: "#666",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        padding: 5,
    },
    popupText: {
        color: "inherit",
        fontSize: 15, 
        margin: "auto", 
        marginBottom: 20, 
        fontWeight: "bold"
    },
  });