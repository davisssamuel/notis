import { useEffect, useState } from "react";
import { View, ScrollView, Text, Switch, TextInput, Pressable, Image, StyleSheet, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons, Entypo, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import profileData from "../data/profile.json"
import QRCode from 'react-native-qrcode-svg'
import { getPublicKeyHex } from "../utils/keys";
import queryMeta, { setAllMeta, setMetaBanner, setMetaBio, setMetaImage, setMetaName } from "../utils/meta";
import { setPage } from "../utils/statePersistence";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const currentTheme = useColorScheme();

  const [pk, setPK] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [bannerURL, setBannerURL] = useState("")

  const [editedImageURL, setEditedImageURL] = useState("")
  const [editedName, setEditedName] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [editedBannerURL, setEditedBannerURL] = useState("")

  useEffect(() => {
    const f = async () => {
        setPage("Settings");
        let key = await getPublicKeyHex();
        setPK(key)
        let data = await queryMeta();

        console.log(data)
        if (Object.keys(data).includes("image")) {
            setImageURL(data.image)
            setEditedImageURL(data.image)
        }
        else {
            setImageURL("https://api.dicebear.com/8.x/identicon/svg?seed=" + await getPublicKeyHex())
        }
        if (Object.keys(data).includes("name")) {
            setName(data.name)
            setEditedName(data.name)
        }
        else {
            setName("notis profile")
        }
        if (Object.keys(data).includes("about")) {
            setBio(data.about)
            setEditedBio(data.about)
        }
        else {
            setBio("notis bio")
        }
        if (Object.keys(data).includes("banner")) {
            setBannerURL(data.banner)
            setEditedBannerURL(data.banner)
        }
        else {
            setBannerURL("https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg")
        }
    }
    f();
  }, []) 
  
  return (

    <ScrollView style={styles.container}>
         
        <Image style={styles.bannerImage} source={{uri: bannerURL}}></Image>
        
        <Image style={styles.profileImage} source={{uri: imageURL}} />
        <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameLight}>{name}</Text>
        <Text style={currentTheme === "dark" ? styles.nickNameDark : styles.nickNameLight}>{bio}</Text>
        <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>

            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Name: </Text>
                </View>
                <TextInput
                    style={styles.settingsInputForm}
                    value={editedName}
                    placeholder="name"
                    placeholderTextColor="gray"
                    onChangeText={(value) => {
                        setEditedName(value)
                    }}
                />
            </View>
            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Bio: </Text>
                </View>
                <TextInput
                    style={styles.settingsInputForm}
                    value={editedBio}
                    placeholder="biography"
                    placeholderTextColor="gray"
                    onChangeText={(value) => {
                        setEditedBio(value)
                    }}
                />
            </View>
            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Image URL: </Text>
                </View>
                <TextInput
                    style={styles.settingsInputForm}
                    value={editedImageURL}
                    placeholder="image URL"
                    placeholderTextColor="gray"
                    onChangeText={(value) => {
                        setEditedImageURL(value)
                    }}
                />
            </View>
            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Banner URL: </Text>
                </View>
                <TextInput
                    style={styles.settingsInputForm}
                    value={editedBannerURL}
                    placeholder="banner URL"
                    placeholderTextColor="gray"
                    onChangeText={(value) => {
                        setEditedBannerURL(value)
                    }}
                />
            </View>
            <View style={styles.setting}>
                <Pressable style={styles.centerButton} onPress={() => {
                    setAllMeta(editedName, editedBio, editedImageURL, editedBannerURL);
                    navigation.navigate("SettingsScreen", { refreshTimeStamp: new Date().toISOString() });
                    }}>
                    <Text style={{color:"inherit"}}>Save</Text>
                </Pressable>
            </View>
        </View>

        <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>

            {/* KEYS */}
            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                {/* <View style={[styles.settingImage, styles.keysImage]}>
                    <Ionicons name="at" size={32} color="white" />
                </View> */}
                <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Keys</Text>
                </View>
            </View>
        </View>

        {/* QR CODE 
          <Image style={styles.qrCode} source={{uri: "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + profileData.id}}></Image>
        */}
        <View style={styles.qrCodeWrapper}>    
            <Image style={styles.qrCode} source={{uri: pk == "" ? "loading" : "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + pk}}></Image>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //paddingHorizontal: 15,
  },
  profileImage: {
    marginTop: -40,
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
    width: "95%",
    marginTop: 10,
    marginHorizontal: "auto",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: "rgba(225, 225, 225, 0.12)",
  },
  setting: {
    height: 33,
    flexDirection: "row",
    justifyContent: "left",
    
    // DEBUG BORDER
    // borderWidth: 1,
    // borderColor: "red",
  },
  settingLeft: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    gap: 15,
    width: 100,
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

  nickNameDark: {
    marginTop: 10,
    marginBottom:0,
    alignSelf: "center",
    
    // FONT
    fontSize: 15,
    color: "#999",
  },
  nickNameLight: {
    marginTop:0,
    marginBottom:5,
    alignSelf: "center",
    
    // FONT
    fontSize: 15,
    color: "#000",
  },
  bannerImage: {
    height: 150,
  },
  settingsInputForm: {
    flex:1,
    backgroundColor: "#444",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  centerButton: {
    color: "#FFF",
    backgroundColor: "#363",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginLeft: "auto",
  },
});