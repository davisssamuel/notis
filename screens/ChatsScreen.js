import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, FlatList, Pressable, Image, Text } from "react-native";
import Chat from "../components/Chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

// importing temp chats data
import jsonData from "../data/chats.json";
import { useLayoutEffect } from "react";
const chats = jsonData;

export default async function ChatsScreen() {
  //console.log(await AsyncStorage.getItem('privateKey'));
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
