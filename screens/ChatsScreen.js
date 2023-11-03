import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import Chat from "../components/Chat";

// importing temp chats data
import jsonData from "../data/chats.json";
const chats = jsonData

export default function ChatsScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <Chat chat={item} />
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}