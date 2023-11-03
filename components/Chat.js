import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

// add chat parameter
const Chat = ({ chat }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      style={styles.chat}
      onPress={() => {
        navigate("MessagingScreen", { chat });
      }}
    >
      <Image
        style={styles.image}
        src={"https://github.com/identicons/" + chat.name.split(" ")[0] + ".png"}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.sender}>{chat.name}</Text>
        <Text style={styles.message}>{chat.lastMessage}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#FFF",
  },
  message: {
    fontSize: 14,
    // color: "#FFF",
  },
});

export default Chat;
