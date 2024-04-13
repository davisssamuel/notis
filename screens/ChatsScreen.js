import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text, StyleSheet } from "react-native";
import Chat from "../components/Chat";

// importing temp chats data
import { useEffect, useState } from "react";
import getPrivateKeyHex, { getPrivateKeyArray, getPublicKeyHex, getPublicKeyArray, bechToHex } from "../utils/keys";
import getContactsListener, { addContact, deleteContact, getContactDataFromKey, getContactFromStorage, saveContactsToRelays } from "../utils/contacts";
import { getAllRelaysFromAPI, getRelays } from "../utils/relays";
import { decrypt, queryAllMesssages, receive, send } from "../utils/messages";
import queryContacts from "../utils/contacts";
import queryMeta, { setMetaDescription, setMetaName, setMetaImage, queryMetaFromKey } from "../utils/meta";
import { setPage } from "../utils/statePersistence";
import blank from "../data/blankProfile.json"
import { formatUnixTimestamp } from "../utils/misc";

export default function ChatsScreen() {

    const [chats, setChats] = useState(null);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const f = async () => {
            let mappings = new Object([]);
            let size = 0
            queryAllMesssages(async (message) => {
                let M = {
                    content: message.content,
                    created_at: message.created_at,
                    pubkey: message.pubkey
                }
                if (message.pubkey == await getPublicKeyHex()) {
                    if (!Object.keys(mappings).includes(message.tags[0][1])) {
                        mappings[message.tags[0][1]] = size;
                        size = size + 1;
                    }
                    let tmp = messages;
                    tmp[mappings[message.tags[0][1]]] == null ? tmp[mappings[message.tags[0][1]]] = [M] : tmp[mappings[message.tags[0][1]]].push(M)
                    setMessages(tmp)
                }
                else {
                    if (!Object.keys(mappings).includes(message.pubkey)) {
                        mappings[message.pubkey] = size;
                        size = size + 1;
                    }
                    let tmp = messages; 
                    tmp[mappings[message.pubkey]] == null ? tmp[mappings[message.pubkey]] = [M] : tmp[mappings[message.pubkey]].push(M)
                    setMessages(tmp)
                }
            }, async (_) => {
                // eose
                let alltmp = JSON.parse(JSON.stringify(messages));
                for (let i = 0; i < alltmp.length; i++) {
                    alltmp[i].sort((a, b) => (a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at) ? -1 : 0)
                    let contactMeta = await getContactFromStorage(Object.keys(mappings)[i])
                    let relayMeta = null;
                    if (contactMeta == null) {
                        relayMeta = await queryMetaFromKey(Object.keys(mappings)[i])
                    }
                    alltmp[i] = alltmp[i][0]
                    alltmp[i] = {
                        pubkey: Object.keys(mappings)[i],
                        whoSent: alltmp[i].pubkey == await getPublicKeyHex() ? "You" : "Them",
                        timestamp: formatUnixTimestamp(alltmp[i].created_at),
                        created_at: alltmp[i].created_at,
                        content: await decrypt(alltmp[i].content, Object.keys(mappings)[i]),
                        image: contactMeta == null ? (relayMeta == null ? blank.image : relayMeta.image) : contactMeta.image,
                        name: contactMeta == null ? (relayMeta == null ? blank.name : relayMeta.name) : contactMeta.name,
                        nickname: contactMeta == null ? "" : contactMeta.nickname,
                    }
                }
                alltmp.sort((a, b) => (a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at) ? -1 : 0)
                setChats(JSON.parse(JSON.stringify(alltmp)))
            })
        }
        f();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.blankList}>{chats == null || chats.length == 0 ? "Go to the contacts page and add a contact to start chatting!" : null}</Text>
            <FlatList
                data={chats}
                renderItem={({ item }) => {
                    return <Chat chat={item} />;
                }}
                keyExtractor={(item) => item.pubkey}
                style={{ paddingHorizontal: 16 }}
                contentInsetAdjustmentBehavior="automatic"
            />
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
        marginTop: 5,
        marginBottom: -5,
        marginHorizontal: "auto",
        marginVertical: 10,
        fontSize: 17,
    }
});