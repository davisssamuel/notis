import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text } from "react-native";
import Contact from "../components/Contact"

// importing temp contacts data
import jsonData from "../data/contacts.json";
import getContacts from "../utils/contacts";
import { getPublicKeyHex } from "../utils/keys";
const contacts = jsonData;
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import contactsList from "../data/contacts.json"

export default function ContactsScreen() {
/*
  const [contactsList, setContactsList] = useState([])

  getContacts().then((c) => {
    setContactsList(c)
    console.log(c)
  })
*/

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
