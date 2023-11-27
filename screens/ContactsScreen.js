import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text } from "react-native";
import Contact from "../components/Contact"

// importing temp contacts data
import jsonData from "../data/contacts.json";
import getContacts from "../utils/contacts";
const contacts = jsonData;

export default function ContactsScreen() {
  getContacts().then((c) => {
    console.log(c)
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatsWrapper: {},
});
