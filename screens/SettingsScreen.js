import { useEffect, useState } from "react";
import { View, ScrollView, Text, TextInput, Pressable, Image, StyleSheet, useColorScheme, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getPrivateKeyHex, { getPublicKeyHex } from "../utils/keys";
import queryMeta, { setAllMeta } from "../utils/meta";
import * as Clipboard from 'expo-clipboard';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const currentTheme = useColorScheme();

  const [ispopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSubMessage, setPopupSubMessage] = useState("");

  const [pk, setPK] = useState("")
  const [privK, setPrivK] = useState("")
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
        let pubKey = await getPublicKeyHex();
        setPK(pubKey)
        let privKey = await getPrivateKeyHex();
        setPrivK(privKey)

        let data = await queryMeta();

        if (Object.keys(data).includes("image")) {
            if (data.image != "") {
                setImageURL(data.image)
                setEditedImageURL(data.image)
            }
            else {
                setImageURL("https://api.dicebear.com/8.x/identicon/svg?seed=" + await getPublicKeyHex())
            }
        }
        else {
            setImageURL("https://api.dicebear.com/8.x/identicon/svg?seed=" + await getPublicKeyHex())
        }
        if (Object.keys(data).includes("name")) {
            if (data.name != "") {
                setName(data.name)
                setEditedName(data.name)
            }
            else {
                setName("notis profile")
            }
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
            if (data.banner != "") {
                setBannerURL(data.banner)
                setEditedBannerURL(data.banner)
            }
            else {
                setBannerURL("https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg")
            }
        }
        else {
            setBannerURL("https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg")
        }
    }
    f();
  }, [])

  const setPopup = (message, subMessage, timeout) => {
        setPopupVisible(true);
        setPopupMessage(message);
        setPopupSubMessage(subMessage);
        setTimeout(() => {
            setPopupVisible(false);
        }, timeout);
        setPopupVisible(true);
  }
  
  return (

    <ScrollView style={styles.container}>
         
        <Image style={styles.bannerImage} source={{uri: bannerURL}}></Image>
        
        <Image style={styles.profileImage} source={{uri: imageURL}} />
        <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameDark}>{name}</Text>
        <Text style={currentTheme === "dark" ? styles.nickNameDark : styles.nickNameDark}>{bio}</Text>

        <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsDark}>
            <Text style={styles.settingsTitle}>Public Data</Text>
            <View style={styles.setting}>
                <View style={styles.settingLeft}>
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameDark}>Name: </Text>
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
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameDark}>Bio: </Text>
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
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameDark}>Image URL: </Text>
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
                    <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameDark}>Banner URL: </Text>
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
                    setAllMeta(editedName, editedBio, editedImageURL, editedBannerURL).then(() => {
                        setPopup("Saved!", "Refresh the page to see changes", 2500)
                    }).catch(() => {
                        setPopup("Error Saving", "", 2500)
                    })
                    }}>
                    <Text style={{color:"inherit"}}>Save</Text>
                </Pressable>
            </View>
        </View>

        <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsDark}>
            <Text style={styles.settingsTitle}>Keys</Text>
            <View style={styles.setting}>
                <Pressable style={styles.keyButton} onPress={() => {
                    Clipboard.setStringAsync(pk).then(() => {
                        setPopup("Copied!", "", 1500)
                    }).catch(() => {
                        setPopup("Error Copying", "", 2500)
                    })
                }}>
                    <Text style={{color:"inherit", fontWeight: "inherit"}}>Copy Public Key</Text>
                </Pressable>
            </View>
            <View style={styles.setting}>
                <Pressable style={styles.keyButton} onPress={() => {
                    Clipboard.setStringAsync(privK).then(() => {
                        setPopup("Copied!", "Do not share it with anyone", 2000)
                    }).catch(() => {
                        setPopup("Error Copying", "", 2500)
                    })
                }}>
                    <Text style={{color:"inherit", fontWeight: "inherit"}}>Copy Private Key</Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.qrCodeWrapper}>    
            <Image style={styles.qrCode} source={{uri: pk == "" ? "loading" : "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + pk}}></Image>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={ispopupVisible}
          onRequestClose={() => setPopupVisible(false)}
        >
          <View style={styles.popup}>
            <View style={styles.popupView}>
                <Text style={styles.popupText}>{popupMessage}</Text>
                <Text style={styles.popupSubText}>{popupSubMessage}</Text>
            </View>
          </View>
        </Modal>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    margin:"auto",
    maxWidth: 600,
    width: "100%"
  },
  profileImage: {
    marginTop: -55,
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 7,
    borderColor: "#000"
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
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "center",
    
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
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginLeft: "auto",
  },
  keyButton: {
    color: "#FFF",
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: "auto",
    fontWeight: "bold",
  },
  settingsTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    alignContent: "top",
    justifyContent: "center",
  },
  popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupView: {
    backgroundColor:"#777",
    padding: 30,
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  popupText: {
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
  },
  popupSubText: {
    color: 'white',
    fontSize: 20,
  }
});