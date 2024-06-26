import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, useColorScheme, NativeModules } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { getPublicKeyHex, removeLogin } from "../utils/keys";
import queryMeta from "../utils/meta";
import { setPage } from "../utils/statePersistence";
import { wipeContacts, wipeBlocked } from "../utils/contacts";
import blank from "../data/blankProfile.json"

export default function CustomDrawer(props) {

    const [imageURL, setImageURL] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        const f = async () => {
            const data = await queryMeta()
            if (Object.keys(data).includes("image")) {
                if (data.image != "") {
                    setImageURL(data.image)
                }
                else {
                    setImageURL(blank.image + await getPublicKeyHex())
                }
            }
            else {
                setImageURL(blank.image + await getPublicKeyHex())
            }
            if (Object.keys(data).includes("name")) {
                if (data.name != "") {
                    setName(data.name)
                }
                else {
                    setName(blank.name)
                }
            }
            else {
                setName(blank.name)
            }
        }
        f();
    })

    // filter out "logout" prop
    const { state, ...rest } = props;
    const newState = { ...state };
    newState.routes = newState.routes.filter(item => item.name !== 'Logout');

  const currentTheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.profileWrapper}>
          <Image source={{uri:imageURL}} style={styles.profileImage}></Image>
          <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameDark}>{name}</Text>
        </View>
        {newState.routes.map((route, index) => (
            <DrawerItem
                key={route.key}
                label={route.name}
                onPress={() => {
                    props.navigation.navigate(route.name)
                    setPage(route.name)
                }}
            />
        ))}

        <DrawerItem 
            onPress={() => {
                removeLogin();
                wipeContacts();
                wipeBlocked();
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
