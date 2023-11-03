import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function MessagingScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.messageWrapper}></ScrollView>
      <View style={styles.messageComposeWrapper}>
        <TextInput
          style={styles.messageCompose}
          placeholder="Message"
          // placeholderTextColor="#000"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    paddingHorizontal: 10,
  },
  messageComposeWrapper: {
    paddingHorizontal: 10,
  },
  messageCompose: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "gray",
    // position: "absolute",
    // bottom: 0,
    // left: 0,
  },
});
