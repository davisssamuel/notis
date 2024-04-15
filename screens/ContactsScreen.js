import { SafeAreaView, StyleSheet, FlatList, Pressable, View, Text, Modal, TextInput } from "react-native";
import Contact from "../components/Contact"

import { addContact, getContactsFromStorage, saveContactsToStorage } from "../utils/contacts";
import { useEffect, useState } from "react";
import queryContacts from "../utils/contacts";
import { queryMetaFromKey } from "../utils/meta";
// import { useNavigation } from "@react-navigation/native";
// import { getPublicKeyHex } from "../utils/keys";
// import { ScrollView } from "react-native-gesture-handler";
// import { setPage } from "../utils/statePersistence";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState(null)

  const [isModalVisible, setModalVisible] = useState(false);
  const [publicKey, setPublicKey ] = useState('');
  const [nickname, setNickname ] = useState('');

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
        async function f() {
            queryContacts(async (c) => {
                let allContacts = []
                for(let contact of c.tags) {
                    let key = contact[1]
                    let nickname = contact[3]
                    let meta = await queryMetaFromKey(key)
                    allContacts.push({
                        name: Object.keys(meta).length == 0 ? "" : meta.name,
                        image: Object.keys(meta).length == 0 ? "" : meta.image,
                        banner: Object.keys(meta).length == 0 ? "" : meta.banner,
                        about: Object.keys(meta).length == 0 ? "" : meta.about,
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

    const setError = (message, timeout) => {
      setErrorVisible(true);
      setErrorMessage(message);
      setTimeout(() => {
        setErrorVisible(false);
      }, timeout);
      setErrorVisible(true);
    }

    const newContact = () => {
        if (publicKey.length === 64) {
            addContact(publicKey, nickname).then(() => {
                setPublicKey("");
                setNickname("");
            })
            .catch(() => {
              setError("Error adding contact.", 2500);
            })
            toggleModal();
            
        } else {
            console.log('Public key needs to be 64 characters');
            setError("Public key needs to be 64 characters", 2500);
        }
      };


      return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.blankList}>{contacts == null || contacts.length == 0 ? "Use the button in the bottom right to add a contact!" : null}</Text>
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
              <Text style={{ color:'black', fontSize: 50, flex: 1, textAlign: "center", marginTop: -2, lineHeight: 43}}>+</Text>
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
          <Modal
              animationType="none"
              transparent={true}
              visible={isErrorVisible}
              onRequestClose={() => setErrorVisible(false)}
            >
            <View style={styles.errorPopup}>
              <View style={styles.errorPopupView}>
                <Text style={styles.errorPopupText}>{errorMessage}</Text>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:"auto",
        maxWidth: 600,
        width: "100%"
    },
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
    errorPopup: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    errorPopupView: {
      backgroundColor:"#777",
      padding: 30,
      borderRadius: 15,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    errorPopupText: {
      color: 'white',
      fontSize: 30,
      fontWeight: "bold",
    },
  });