import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text } from "react-native";
import Chat from "../components/Chat";
import { useEffect } from "react";

// importing temp chats data
import jsonData from "../data/chats.json";
import { useLayoutEffect } from "react";
import getPrivateKeyHex, { getPrivateKeyArray, getPublicKeyHex, getPublicKeyArray } from "../utils/keys";
const chats = jsonData;

export default function ChatsScreen() {

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