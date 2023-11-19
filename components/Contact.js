import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';

const Contact = ({ contact }) => {
  const { navigate } = useNavigation();
  const currentTheme = useColorScheme();
  return (
    <Pressable
      style={styles.contact}
      onPress={() => {
        navigate("MessagingScreen", { contact }); //FIXME make contact screen
      }}
    >
      <Image
        style={styles.image}
        src={
          "https://github.com/identicons/" + contact.name.split(" ")[0] + ".png" //FIXME name is the error
        }
      />
      <View style={styles.contactDetails}>
        <View style={styles.contactFirstLine}>
          <Text
            style={
              currentTheme === "dark"
                ? styles.contactNameDark
                : styles.contactNameLight
            }
          >
          {contact.name}
          </Text>
          <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'right',
              ...(currentTheme === "dark"
                ? styles.timestampDark
                : styles.timestampLight)
                
            }}
          >           
            {contact.lastMessage}  
          </Text>
          <Ionicons name="ios-chevron-forward" size={18} color="gray" />
        </View>
        </View>
        <Text
          style={
            currentTheme === "dark"
              ? styles.statusDark
              : styles.statusLight
          }
        >
          {contact.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  contactDetails: {
    flex: 1,
    justifyContent: "center",
  },
  contactFirstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  contactNameLight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  contactNameDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  statusLight: {
    fontSize: 14,
    color: "#000",
    color: "rgba(0, 0, 0, 0.5)",
  },
  statusDark: {
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

export default Contact;
