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
      <View style={{flex:1, gap:0}}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageSender}>{sender.name}</Text>
          <Text style={styles.messageTime}>{formattedTime}</Text>
        </View>
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
    color: "#DDD",
    fontSize: 19
  },
  messageTime: {
    color: "gray",
    fontSize: 15,
    flex:1
  },
  messageHeader: {
    flex:1,
    flexDirection: "row",
    gap: 3,
    justifyContent: "space-between"
  },
  messageSender: {
    color: "white",
    flex:1,
    fontSize: 17,
    fontWeight: "bold"
  }
});

export default Message;
