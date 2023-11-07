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
} from "react-native";

import DarkModeSVG from "../assets/images/jsx/DarkModeSVG"
import LiveActivitySVG from "../assets/images/jsx/LiveActivitySVG";
import KeysSVG from "../assets/images/jsx/KeysSVG";
import NotificationsSVG from "../assets/images/jsx/NotificationsSVG";
import TransactionHistorySVG from "../assets/images/jsx/TransactionHistorySVG";

export default function Settings() {
  return (
    <View style={styles.settingsContainer}>
      {/* Settings */}
      <ScrollView style={styles.settingsWrapper}>
        <View style={styles.profileInfo}>
          <Image
            style={styles.profileImage}
            src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"}
          />
          <Text style={styles.profileName}>Luke Lyall</Text>
          <View style={styles.settings}>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.darkModeImage]}><DarkModeSVG></DarkModeSVG></View>
                <Text>Dark Mode</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.liveActivityImage]}><LiveActivitySVG></LiveActivitySVG></View>
                <Text>Live Activity</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.keysImage]}><KeysSVG></KeysSVG></View>
                <Text>Keys</Text>
              </View>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.notificationsImage]}><NotificationsSVG></NotificationsSVG></View>
                <Text>Notifications</Text>
              </View>
              <Switch></Switch>
            </View>
            <View style={styles.setting}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingImage, styles.transactionHistoryImage]}><TransactionHistorySVG></TransactionHistorySVG></View>
                <Text>Transaction History</Text>
              </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: "rgb(28,28,30)",
  },
  settingsWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 10000,
    alignSelf: "center",
  },
  profileName: {
    fontSize: 28,
    color: "#FFF",
    alignSelf: "center",
    padding: 10
  },
  profileInfo: {
    flexDirection: "column",
    width: "100%",
    padding: 10,
    marginVertical: 4,
  },
  settings: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "rgb(65,65,70)",
    alignSelf: "center",
    gap: 10,
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
    padding: 7,
    width: 40,
    height: 40,
    borderRadius: 10000
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
