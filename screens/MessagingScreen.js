import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { send, receive } from "../utils/messages.js"

export default function MessagingScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <ScrollView style={styles.messageWrapper}></ScrollView>
        <TextInput
          style={styles.messageCompose}
          placeholder="Message"
          onSubmitEditing={send}
          // placeholderTextColor="#000"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    paddingHorizontal: 10,
  },
  messageCompose: {
    padding: 10,
    borderRadius: 100,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: "gray",
  },
  keyboardAvoidingView: {
    flex:1,
    justifyContent: "space-between",
  }
});
