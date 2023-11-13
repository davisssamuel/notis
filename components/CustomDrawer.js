import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawer(props) {
const currentTheme = useColorScheme();
 return(
  <View style={{flex:1}}>
    <DrawerContentScrollView>
      <View style={
              currentTheme === "dark"
                ? styles.upperContentDark
                : styles.upperContentLight
            }>
        <Image
          src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"}
          style={styles.profileImage}
        ></Image>
        <Text style={currentTheme === "dark"
                ? styles.profileNameDark
                : styles.profileNameLight}>Luke Lyall</Text>
      </View>
      
      <DrawerItemList {...props}></DrawerItemList>
    </DrawerContentScrollView>
    <View>
    </View>
  </View>
 );
}

const styles = StyleSheet.create({
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  upperContentDark: {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    margin: 5,
  },
  upperContentLight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    margin: 5,
  },
  profileNameDark: {
    fontSize: 20,
    color: "white"
  },
  profileNameLight: {
    fontSize: 20,
    color: "black"
  }
});
