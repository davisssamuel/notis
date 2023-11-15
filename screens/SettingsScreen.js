import * as React from "react";
import { View, ScrollView, Text, Switch, TextInput, Pressable, Image, StyleSheet, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons, Entypo, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const currentTheme = useColorScheme();
  return (
    // TESTING SCROLLVIEW IN SAFEAREAVIEW
    // <View>
    //     {/* <SafeAreaView/> */}
    //     <ScrollView styles={{ backgroundColor: "#FFF"}}>
    //       <Image style={styles.profileImage} src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"} />
    //     </ScrollView>
    // </View>

    <ScrollView style={styles.container}>
        
        <Image style={styles.profileImage} src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"} />
        <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameLight}>John Smith</Text>

        <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>
          
          {/* DARK MODE */}
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              {/* <View style={[styles.settingImage, styles.darkModeImage]}>
                <Ionicons name="moon" size={25} color="white" />
              </View> */}
              <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Dark Mode</Text>
            </View>
            <Switch/>
          </View>

          {/* LIVE ACTIVITY */}
          {/* <View style={styles.setting}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingImage, styles.liveActivityImage]}>
                <Entypo name="notification" size={25} color="white" />
              </View>
              <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Live Activity</Text>
            </View>
            <Switch></Switch>
          </View> */}

          {/* KEYS */}
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              {/* <View style={[styles.settingImage, styles.keysImage]}>
                <Ionicons name="at" size={32} color="white" />
              </View> */}
              <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Keys</Text>
            </View>
          </View>

          {/* NOTIFICATIONS */}
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              {/* <View style={[styles.settingImage, styles.notificationsImage]}>
                <MaterialCommunityIcons name="bell" size={30} color="white" />
              </View> */}
              <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Notifications</Text>
            </View>
          </View>

          {/* TRANSACTION HISTORY */}
          <View style={styles.setting}>
            <Pressable
              style={styles.settingLeft}
              onPress={() => {
                navigation.navigate("TransactionHistoryScreen");
              }}
            >
              {/* <View style={[styles.settingImage, styles.transactionHistoryImage]}>
                <Foundation name="dollar" size={41} color="white" />
              </View> */}
              <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Transaction History</Text>
            </Pressable>
          </View>
        </View>

        {/* QR CODE */}
        <View style={styles.qrCodeWrapper}>
          <Image style={styles.qrCode} src={"https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + "This is a test"}></Image>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  profileImage: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
  },
  profileNameLight: {
    marginVertical: 10,
    alignSelf: "center",
    
    // FONT
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  profileNameDark: {
    marginVertical: 10,
    alignSelf: "center",
    
    // FONT
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  profileInfo: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  settingsLight: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  settingsDark: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: "rgba(225, 225, 225, 0.12)",
  },
  setting: {
    height: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    
    // DEBUG BORDER
    // borderWidth: 1,
    // borderColor: "red",
  },
  settingLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  settingNameLight: {
    paddingLeft: 5,
    fontSize: 16,
    // fontWeight: "500",
    color: "#000",
  },
  settingNameDark: {
    paddingLeft: 5,
    fontSize: 16,
    // fontWeight: "500",
    color: "#FFF",
  },
  qrCodeWrapper: {
    marginTop: 30,
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    
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
    justifyContent: "center",
  },
  darkModeImage: {
    backgroundColor: "black",
  },
  liveActivityImage: {
    backgroundColor: "#E8C919",
  },
  keysImage: {
    backgroundColor: "#E64968",
  },
  notificationsImage: {
    backgroundColor: "#C461E0",
  },
  transactionHistoryImage: {
    backgroundColor: "#00D200",
  },
});
