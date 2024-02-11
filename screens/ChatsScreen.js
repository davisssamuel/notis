import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text } from "react-native";
import Chat from "../components/Chat";
import { useEffect } from "react";

// importing temp chats data
import jsonData from "../data/chats.json";
import { useLayoutEffect } from "react";
import getPrivateKeyBech, { getPrivateKeyArray, getPrivateKeyHex } from "../utils/keys";
const chats = jsonData;

export default function ChatsScreen() {

  useEffect(() => {
    let f = async () => {
      console.log("hex:", await getPrivateKeyHex());
      console.log("bech:", await getPrivateKeyBech());
      console.log("uint8array:", await getPrivateKeyArray());
    }
    f();
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