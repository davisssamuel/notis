import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import getPrivateKeyBech, { bechToHex, getPrivateKeyHex, getPublicKeyHex, hexToBech } from "../utils/keys";
import { nip04 } from "nostr-tools";
import NDK from "@nostr-dev-kit/ndk";
import { formatUnixTimestamp } from "../utils/misc";
import { getContactFromKey } from "../utils/misc";

const Message = ({ message }) => {

  let text = message.content
  let unix_time = message.created_at
  let formattedTime = formatUnixTimestamp(unix_time)
  let sender = getContactFromKey(message.pubkey)
  

  return (
    <View style={message.pubkey == getPublicKeyHex() ? styles.messageWrapperSent : styles.messageWrapperRec}>
      <Image source={{uri:sender.image}} style={styles.messageImage}></Image>
      <View>
        <Text style={styles.messageTime}>{formattedTime}</Text>
        <Text style={styles.messageBody}>{text}</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  messageWrapperSent: {
    width: "100%",
    marginVertical: 4,
    backgroundColor: "#222222",
    padding:5,
    flex:1,
    flexDirection: "row"
  },
  messageWrapperRec: {
    width: "100%",
    marginVertical: 4,
    //backgroundColor: "gray",
    padding:5,
    flex:1,
    flexDirection: "row"
  },
  messageImage: {
    height: 50,
    width: 50,
    borderRadius: 10000,
    marginRight: 10
  },
  messageBody: {
    color: "white",
    fontSize: 18
  },
  messageTime: {
    color: "gray",
    fontSize: 15
  }
});

export default Message;
