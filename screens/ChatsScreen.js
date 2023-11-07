import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import Chat from "../components/Chat";

// importing temp chats data
import jsonData from "../data/chats.json";
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatsWrapper: {},
});
