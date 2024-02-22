import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text, Modal, View, TextInput } from "react-native";
import Contact from "../components/Contact"
// importing temp contacts data
import jsonData from "../data/contacts.json";
import { getContacts, addContact } from "../utils/contacts";
import { getPublicKeyHex } from "../utils/keys";
const contacts = jsonData;
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import contactsList from "../data/contacts.json"
import * as React from "react";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";

export default function ContactsScreen() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [publicKey, setPublicKey ] = React.useState('');
/*
  const [contactsList, setContactsList] = useState([])

  getContacts().then((c) => {
    setContactsList(c)
    console.log(c)
  })
*/
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const newContact = () => {
    if (publicKey.length === 64) {
      addContact(publicKey);
      toggleModal();
    } else {
      console.log('Public key needs to be 64 characters');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={contactsList}
        renderItem={({ item }) => {
          return <Contact contact={item}/>;
        }}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      />
      <View style = {{ alignItems: 'flex-end', marginBottom: 20, marginRight: 20, }}>
        <Pressable onPress= { toggleModal } style = {{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', }}>
          <Text style={{ color:'black', fontSize: 40, lineHeight: 40 }}> + </Text>
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
            <Text>Enter a person's public key to add them to your contacts:</Text>
              <TextInput
              style={styles.popupInput}
              placeholder="> Public Key"
              value={publicKey}
              onChangeText={setPublicKey}
              />
            <View style={styles.footer}>
              <Pressable style = {styles.popupButtons} onPress = {toggleModal}>
                <Text style = {{color: 'white'}}>Cancel</Text>
              </Pressable>
              <Pressable style = {styles.popupButtons} onPress = {newContact}>
                <Text style = {{color: 'white'}}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '75%',
    backgroundColor: 'grey',
    padding: 20,
  },
  popupInput: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  footer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButtons: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  }
});
