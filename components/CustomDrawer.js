import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import profileData from "../data/profile.json"

export default function CustomDrawer(props) {
  const currentTheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.profileWrapper}>
          <Image source={{uri:profileData.image}} style={styles.profileImage}></Image>
          <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameLight}>{profileData.name}</Text>
        </View>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 10,
    margin: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profileNameDark: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  profileNameLight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
