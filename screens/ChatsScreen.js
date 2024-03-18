import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text } from "react-native";
import Chat from "../components/Chat";
import { useEffect } from "react";

// importing temp chats data
import jsonData from "../data/chats.json";
import { useLayoutEffect } from "react";
import getPrivateKeyHex, { getPrivateKeyArray, getPublicKeyHex, getPublicKeyArray, bechToHex } from "../utils/keys";
import getContactsListener, { addContact, deleteContact, getContactDataFromKey, saveContactsToRelays } from "../utils/contacts";
import { getAllRelaysFromAPI, getRelays } from "../utils/relays";
import { decrypt, receive, send } from "../utils/messages";
const chats = jsonData;

export default function ChatsScreen() {
  //addContact(bechToHex("npub10qvf7wj98tj7x8pgjjjda402h4eh4e3y720ud98g0w6t259f4eqsu50pe7"),"NotisB");
  //addContact(bechToHex("npub1uqj8jgd5uch8srmwxzvj5u6wzl0fc2vuzd8euwgj7rllhz6aagdslf3lxy"),"NotisB");
  //addContact(bechToHex("npub107krzcztxmzr9654v30t7afmtptwf3ux0nygdunldn3ga2w8q56sq6yp9y"),"NotisC");
  //deleteContact(bechToHex("npub1uqj8jgd5uch8srmwxzvj5u6wzl0fc2vuzd8euwgj7rllhz6aagdslf3lxy"))
  //deleteContact(bechToHex("npub107krzcztxmzr9654v30t7afmtptwf3ux0nygdunldn3ga2w8q56sq6yp9y"))
  //saveContactsToRelays()
  //send("Hi Mom! :)", bechToHex("npub1uqj8jgd5uch8srmwxzvj5u6wzl0fc2vuzd8euwgj7rllhz6aagdslf3lxy"))
  
  receive(bechToHex("npub10qvf7wj98tj7x8pgjjjda402h4eh4e3y720ud98g0w6t259f4eqsu50pe7"), (e) => {
    console.log(e)
  })
  

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