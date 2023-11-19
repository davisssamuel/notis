import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, Pressable, Image, Text } from "react-native";
import Contact from "../components/Contact"; //FIXME back to C

// importing temp contacts data
import jsonData from "../data/contacts.json";
import { useLayoutEffect } from "react";
const contacts = jsonData;

export default function ContactsScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return <Contact contact={item} />;
        }}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contactsWrapper: {},
});