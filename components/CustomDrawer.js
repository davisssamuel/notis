import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme, Button, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import profileData from "../data/profile.json"
import { removeLogin } from "../utils/keys";

export default function CustomDrawer(props) {

    // filter out "logout" prop
    const { state, ...rest } = props;
    const newState = { ...state };
    newState.routes = newState.routes.filter(item => item.name !== 'Logout');

  const currentTheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.profileWrapper}>
          <Image source={{uri:profileData.image}} style={styles.profileImage}></Image>
          <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameLight}>{profileData.name}</Text>
        </View>
        {newState.routes.map((route, index) => (
            <DrawerItem
                key={route.key}
                label={route.name}
                onPress={() => props.navigation.navigate(route.name)}
            />
        ))}

        <DrawerItem 
            onPress={() => {
                removeLogin();
                props.navigation.navigate("Logout")
            }}
            key={"Logout"}
            label={"Logout"}
        />
        
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
  button: {
    backgroundColor: "red"
  },
});
