import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text, StyleSheet } from "react-native";
import Chat from "../components/Chat";

// importing temp chats data
import { useEffect, useState } from "react";
import getPrivateKeyHex, { getPrivateKeyArray, getPublicKeyHex, getPublicKeyArray, bechToHex } from "../utils/keys";
import getContactsListener, { addContact, deleteContact, getContactDataFromKey, saveContactsToRelays } from "../utils/contacts";
import { getAllRelaysFromAPI, getRelays } from "../utils/relays";
import { decrypt, receive, send } from "../utils/messages";
import queryContacts from "../utils/contacts";
import queryMeta, { setMetaDescription, setMetaName, setMetaImage } from "../utils/meta";
import { setPage } from "../utils/statePersistence";

export default function ChatsScreen() {

    const [chats, setChats] = useState(null);

    useEffect(() => {
        const f = async () => {
            
        }
        f()
    }, [])

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.blankList}>{chats === null ? "Nothing to see here..." : null}</Text>
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

const styles = StyleSheet.create({
    blankList: {
        color: "gray",
        marginTop: 5,
        marginBottom: -5,
        marginHorizontal: "auto",
        marginVertical: 10,
        fontSize: 17,
    }
});