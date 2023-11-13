import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text } from "react-native";
import Contact from "../components/Contact"

// importing temp contacts data
import jsonData from "../data/contacts.json";
const contacts = jsonData;

export default function ContactsScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Placeholder Contacts Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatsWrapper: {},
});
