import { useEffect, useState } from "react";
import { View, ScrollView, Text, TextInput, Pressable, Image, StyleSheet, useColorScheme, Modal } from "react-native";
import * as Clipboard from 'expo-clipboard';
import blank from "../data/blankProfile.json"
import { blockContact, deleteContact, editNickName, isBlocked, unblockContact } from "../utils/contacts";
// import { useNavigation } from "@react-navigation/native";
// import getPrivateKeyHex, { getPublicKeyHex } from "../utils/keys";
// import queryMeta, { setAllMeta } from "../utils/meta";

export default function ContactInfoScreen({ navigation, route }) {
    const contact = route.params.contact;

    const currentTheme = useColorScheme();
  
    const [ispopupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupSubMessage, setPopupSubMessage] = useState("");

    const [editedNickname, setEditedNickname] = useState(contact.nickname)

    const [blocked, setBlocked] = useState()
  
    useEffect(() => {
      const f = async () => {
          setBlocked(await isBlocked(contact.pubkey))
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
           
          <Image style={styles.bannerImage} source={{uri: contact.banner == "" ? blank.banner : contact.banner}}></Image>
          <Image style={styles.profileImage} source={{uri: contact.image == "" ? blank.image + contact.pubkey : contact.image}} />

          <Text style={currentTheme === "dark" ? styles.profileNameDark : styles.profileNameLight}>{contact.nickname == "" ? (contact.name == "" ? blank.name : contact.name) : contact.nickname}</Text>
          <Text style={currentTheme === "dark" ? styles.nickNameDark : styles.nickNameLight}>{ contact.about == "" ? blank.about : contact.about }</Text>

          <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>
                <View style={styles.setting}>
                    <Pressable style={styles.keyButton} onPress={() => {
                          navigation.goBack()
                          navigation.navigate("Chats", {screen: "MessagingScreen", params: { pubkey: contact.pubkey }})
                    }}>
                        <Text style={{color:"inherit", fontWeight: "inherit"}}>Messages</Text>
                    </Pressable>
                </View>
            </View>
  
          <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>
              <Text style={styles.settingsTitle}>Customize Contact</Text>
              <View style={styles.setting}>
                  <View style={styles.settingLeft}>
                      <Text style={currentTheme === "dark" ? styles.settingNameDark : styles.settingNameLight}>Nickname: </Text>
                  </View>
                  <TextInput
                      style={styles.settingsInputForm}
                      value={editedNickname}
                      placeholder="nickname"
                      placeholderTextColor="gray"
                      onChangeText={(value) => {
                          setEditedNickname(value)
                      }}
                  />
              </View>
              <View style={styles.setting}>
                  <Pressable style={styles.centerButton} onPress={() => {
                      editNickName(contact.pubkey, editedNickname).then(() => {
                          setPopup("Saved!", "Refresh the page to see changes", 2500)
                      }).catch(() => {
                          setPopup("Error Saving", "", 2500)
                      })
                      }}>
                      <Text style={{color:"inherit"}}>Save</Text>
                  </Pressable>
              </View>
          </View>
  
          <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>
              <Text style={styles.settingsTitle}>Keys</Text>
              <View style={styles.setting}>
                  <Pressable style={styles.keyButton} onPress={() => {
                      Clipboard.setStringAsync(contact.pubkey).then(() => {
                          setPopup("Copied!", "", 1500)
                      }).catch(() => {
                          setPopup("Error Copying", "", 2500)
                      })
                  }}>
                      <Text style={{color:"inherit", fontWeight: "inherit"}}>Copy Public Key</Text>
                  </Pressable>
              </View>
          </View>

        <View style={styles.qrCodeWrapper}>    
            <Image style={styles.qrCode} source={{uri: contact.pubkey == "" ? "loading" : "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" + contact.pubkey}}></Image>
        </View>

          <View style={currentTheme === "dark" ? styles.settingsDark : styles.settingsLight}>
                <View style={styles.setting}>
                  <Pressable style={styles.keyButton} onPress={() => {
                    if (blocked) {
                        unblockContact(contact.pubkey).then(() => {
                            setPopup("Unblocked Contact", contact.nickname == "" ? (contact.name == "" ? blank.name : contact.name) : contact.nickname, 1500)
                        }).catch((e) => {
                            setPopup("Error Unblocking", `${e}`, 2500)
                        })
                    }
                    else {
                        blockContact(contact.pubkey).then(() => {
                            setPopup("Blocked Contact", contact.nickname == "" ? (contact.name == "" ? blank.name : contact.name) : contact.nickname, 1500)
                        }).catch(() => {
                            setPopup("Error Blocking", "", 2500)
                        })
                    }
                  }}>
                      <Text style={{color:"inherit", fontWeight: "inherit"}}>{blocked ? "Unblock Contact" : "Block Contact"}</Text>
                  </Pressable>
              </View>
              <View style={styles.setting}>
                  <Pressable style={styles.deleteContact} onPress={() => {
                      deleteContact(contact.pubkey).then(() => {
                          setPopup("Deleted Contact", contact.nickname == "" ? (contact.name == "" ? blank.name : contact.name) : contact.nickname, 1500)
                      }).catch(() => {
                          setPopup("Error Copying", "", 2500)
                      })
                  }}>
                      <Text style={{color:"inherit", fontWeight: "inherit"}}>Delete Contact</Text>
                  </Pressable>
              </View>
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
};

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
    deleteContact: {
        color: "#F99",
        backgroundColor: "#733",
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
    },
    qrCodeWrapper: {
        margin: 30,
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
  });