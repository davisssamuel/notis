import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text } from "react-native";
import Contact from "../components/Contact"

// importing temp contacts data
import jsonData from "../data/contacts.json";
import getContacts, { getContactsFromStorage } from "../utils/contacts";
import { getPublicKeyHex } from "../utils/keys";
const contacts = jsonData;
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import contactsList from "../data/contacts.json"

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    async function f() {
      let c = await getContactsFromStorage()
      setContacts(c)
    }
    f()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return <Contact contact={item}/>;
        }}
        keyExtractor={(item) => item.pubkey}
        style={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
