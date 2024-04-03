import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text } from "react-native";
import Chat from "../components/Chat";

// importing temp chats data
import jsonData from "../data/chats.json";
import { useEffect } from "react";
import getPrivateKeyHex, { getPrivateKeyArray, getPublicKeyHex, getPublicKeyArray, bechToHex } from "../utils/keys";
import getContactsListener, { addContact, deleteContact, getContactDataFromKey, saveContactsToRelays } from "../utils/contacts";
import { getAllRelaysFromAPI, getRelays } from "../utils/relays";
import { decrypt, receive, send } from "../utils/messages";
import queryContacts from "../utils/contacts";
import queryMeta, { setMetaDescription, setMetaName, setMetaImage } from "../utils/meta";
import { setPage } from "../utils/statePersistence";
const chats = jsonData;

export default function ChatsScreen() {

    useEffect(() => {
        const f = async () => {
            setPage("Chats");
        }
        f()
    }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <Chat chat={item} />;
        }}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}