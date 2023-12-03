import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

const Chat = ({ chat }) => {
  const { navigate } = useNavigation();
  const currentTheme = useColorScheme();
  return (
    <Pressable
      style={styles.chat}
      onPress={() => {
        navigate("MessagingScreen", { chat });
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://github.com/identicons/" + chat.name.split(" ")[0] + ".png"
        }}
      />
      <View style={styles.chatDetails}>
        <View style={styles.chatFirstLine}>
          <Text
            style={
              currentTheme === "dark"
                ? styles.chatNameDark
                : styles.chatNameLight
            }
          >
            {chat.name}
          </Text>
          <Text
            style={
              currentTheme === "dark"
                ? styles.timestampDark
                : styles.timestampLight
            }
          >
            {chat.timestamp}
          </Text>
        </View>
        <Text
          style={
            currentTheme === "dark"
              ? styles.lastMessageDark
              : styles.lastMessageLight
          }
        >
          {chat.lastMessage}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chatFirstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  chatNameLight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  chatNameDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  lastMessageLight: {
    fontSize: 14,
    color: "#000",
    color: "rgba(0, 0, 0, 0.5)",
  },
  lastMessageDark: {
    paddingRight: 20,
    fontSize: 14,
    color: "#FFF",
    color: "rgba(225, 225, 225, 0.75)",
  },
  timestampLight: {
    fontSize: 12,
    color: "#000",
    color: "rgba(0, 0, 0, 0.5)",
  },
  timestampDark: {
    fontSize: 12,
    color: "#FFF",
    color: "rgba(225, 225, 225, 0.75)",
  },
});

export default Chat;
