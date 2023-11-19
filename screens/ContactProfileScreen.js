import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  Switch,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  useColorScheme
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  Entypo,
  Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const currentTheme = useColorScheme();
  return (
    <SafeAreaView style={styles.settingsContainer}>
      <ScrollView style={styles.settingsWrapper} scrollIndicatorInsets={{ right: 1 }}>
        <View style={styles.profileInfo}>
          <Image
            style={styles.profileImage}
            src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"}
          />
          <Text style={currentTheme === "dark"
                ? styles.profileNameDark
                : styles.profileNameLight}>Luke Lyall</Text>
          <View style={currentTheme === "dark"
                ? styles.settingsDark
                : styles.settingsLight}>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.darkModeImage]}><Ionicons name="moon" size={25} color="white" /></View>
                <Text style={currentTheme === "dark"
                  ? styles.settingNameDark
                  : styles.settingNameLight}>Dark Mode</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.liveActivityImage]}><Entypo name="notification" size={25} color="white" /></View>
                <Text style={currentTheme === "dark"
                  ? styles.settingNameDark
                  : styles.settingNameLight}>Live Activity</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.keysImage]}><Ionicons name="at" size={32} color="white" /></View>
                <Text style={currentTheme === "dark"
                  ? styles.settingNameDark
                  : styles.settingNameLight}>Keys</Text>
              </View>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.notificationsImage]}><MaterialCommunityIcons name="bell" size={30} color="white" /></View>
                <Text style={currentTheme === "dark"
                  ? styles.settingNameDark
                  : styles.settingNameLight}>Notifications</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <Pressable style={styles.settingLeft} onPress={() => {
                navigation.navigate("TransactionHistoryScreen");
              }}>
                <View style={[styles.settingImage, styles.transactionHistoryImage]}><Foundation name="dollar" size={41} color="white" /></View>
                <Text style={currentTheme === "dark"
                  ? styles.settingNameDark
                  : styles.settingNameLight}>Transaction History</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.qrCodeWrapper}>
            <Image 
              style={styles.qrCode}
              src={"https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + 
                "This is a test"
              }>
            </Image>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    marginTop: 25,
  },
  settingsWrapper: {
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 10000,
    alignSelf: "center",
  },
  profileNameDark: {
    fontSize: 28,
    alignSelf: "center",
    padding: 10,
    color: "white"
  },
  profileNameLight: {
    fontSize: 28,
    alignSelf: "center",
    padding: 10,
    color: "black"
  },
  profileInfo: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  settingsDark: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    gap: 10,
    backgroundColor: "#222222"
  },
  settingsLight: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    gap: 10,
    backgroundColor: "#DDDDDD"
  },
  setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  settingLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  settingNameDark: {
    fontSize: 16,
    color: "white"
  },
  settingNameLight: {
    fontSize: 16,
    color: "black"
  },
  qrCodeWrapper: {
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    margin: 25,
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  settingImage: {
    width: 40,
    height: 40,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center"
  },
  darkModeImage: {
    backgroundColor: "black",
  },
  liveActivityImage: {
    backgroundColor: "#E8C919",
  },
  keysImage: {
    backgroundColor: "#E64968"
  },
  notificationsImage: {
    backgroundColor: "#C461E0"
  },
  transactionHistoryImage: {
    backgroundColor: "#00D200"
  }
});
