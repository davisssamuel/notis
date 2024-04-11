import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal} from 'react-native';
import * as Clipboard from "expo-clipboard"
import { generateSecretKey } from 'nostr-tools';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loggedIn } from "../utils/keys";
import getPage, { setPage } from "../utils/statePersistence";

import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { setAllMeta } from '../utils/meta';

const Login = () => {
  const { navigate }  = useNavigation();
  const [privateKey, setPrivateKey] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [ispopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSubMessage, setPopupSubMessage] = useState("");

  const setPopup = (message, subMessage, timeout) => {
    setPopupVisible(true);
    setPopupMessage(message);
    setPopupSubMessage(subMessage);
    setTimeout(() => {
        setPopupVisible(false);
    }, timeout);
    setPopupVisible(true);
}
  
  const generateKeys = async () => {
    try {
      const sk = await generateSecretKey();
      const skHex = await bytesToHex(sk);
      setPrivateKey(skHex);
      toggleModal();
    }
    catch (error) {
      setPopup("Error Generating Keys", `${e}`, 2500)
    }
  };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // if we already have a key in storage, log in.
    useEffect(() => {
        const f = async () => {
            if (await loggedIn()) {
                if (await getPage() != "Logout") {
                    navigate(await getPage());
                }
                else {
                    navigate("Chats")
                }
            }
            else {
                setPage("Logout");
            }
        }
        f()
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.loginPage}>
            <View style={styles.navBar}>
                <Text style={styles.navName}>notis</Text>
            </View>
            <View style={styles.loginForm}>
                <TextInput
                    style={styles.key}
                    placeholder="Private Key"
                    placeholderTextColor="gray"
                    onChangeText={(inp) => setPrivateKey(inp)}
                />
            </View>
            <Text id="input-status" style={styles.inputStatus}>Invalid Key</Text>
            <Pressable style={styles.loginButton} onPress={async () => {
                if (privateKey.length != 64) {
                    document.getElementById("input-status").style.color = "red";
                }
                else {
                    document.getElementById("input-status").style.color = "transparent";
                    let uint8;
                    let hex = privateKey;
                    try {
                        uint8 = hexToBytes(hex);
                        AsyncStorage.setItem("privateKey", JSON.stringify({
                            uint8: uint8,
                            hex: hex,
                        }))
                        setPrivateKey("")
                        navigate('Chats')
                    }
                    catch(e) {
                        document.getElementById("input-status").style.color = "red";
                        console.log("not a hex key")
                    }
                }
            }}>
            
            <Text style={{fontWeight: "inherit", color:"inherit", fontWeight: "inherit"}}>Login</Text>
            </Pressable>
            <View style={styles.keyGen}>
                <Pressable style={styles.generator}onPress ={generateKeys}>
                    <Text style={{fontWeight: "inherit", color:"inherit", fontWeight: "inherit"}}>generate a private key</Text>
                </Pressable>
                <Modal 
                    animationType = "none"
                    transparent = {true}
                    visible = {isModalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                    <View style={styles.popupBar}>
                        <ScrollView horizontal = {true} style={styles.popupKeys}>
                            <Text style = {styles.popupKey}>{privateKey}</Text>
                        </ScrollView>
                        {/*
                        <Pressable style={styles.popupCopy} onPress = {() => {
                            Clipboard.setStringAsync(privateKey).then(() => {
                                setPopup("Copied!", "", 1000)
                            }).catch(() => {
                                setPopup("Error Copying", "", 3000)
                            })
                        }}>
                            <Text style={{color:"inherit",fontWeight:"inherit"}}>Copy</Text>
                        </Pressable>
                        */}
                    </View>
                    <View style={styles.popupBody}>
                        <Text style={{color:"inherit", fontSize:"inherit", fontSize:"inherit", textAlign:"center"}}>Treat Your <strong>private key</strong> like a password...</Text>
                        <Text style={{color:"inherit", fontSize:"inherit", fontSize:"inherit", textAlign:"center"}}><strong style={{color:"#F66"}}>Don't lose it</strong> and <strong style={{color:"#F66"}}>don't share it</strong> with anyone! </Text>
                        
                    </View>
                    <View style={styles.popupFooter}>
                        <Pressable style = {styles.popupButtons} onPress = {toggleModal}>
                            <Text style={{color:"inherit",fontWeight:"inherit"}}>Close</Text>
                        </Pressable>
                        
                        <Pressable style = {styles.popupButtons} onPress = {async () => {
                            await AsyncStorage.setItem('privateKey', JSON.stringify({hex: privateKey, uint8: hexToBytes(privateKey)}));
                            setAllMeta("","","","")
                            toggleModal();
                            navigate('Chats');
                        }}>
                            <Text style={{color:"inherit",fontWeight:"inherit"}}>Login</Text>
                        </Pressable>
                    </View>
                    </View>
                </View>
                </Modal>
            </View>
            </View>
            <Modal
                animationType="none"
                transparent={true}
                visible={ispopupVisible}
                onRequestClose={() => setPopupVisible(false)}
            >
                <View style={styles.copyPopup}>
                    <View style={styles.popupView}>
                        <Text style={styles.popupText}>{popupMessage}</Text>
                        <Text style={styles.popupSubText}>{popupSubMessage}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles =  {
  inputStatus: {
    color: "transparent",
    paddingBottom: 10,
    justifyContent: 'center',
    display: "flex"
  },
  container: {
    flex: 1,
    backgroundColor: '#FF',
    margin:"auto",
    maxWidth: 600,
    width: "100%"
  },
  loginPage: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  navBar: {
    alignItems: 'center',
  },
  navName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  loginForm: {
    backgroundColor: 'rgb(210, 210, 210)',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 8,
  },
  loginButton: {
    color: "#FFF",
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: "auto",
    height: 35,
    fontWeight: "bold",
  },
  key: {
    height: 35,
    backgroundColor: "#444",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  keyGen: {
    display: 'flex',
    borderRadius: 8,
    width: 'auto',
    height: 'auto',
  },
  popupBar: {
    flexDirection: 'row',
  },
  generator: {
    textAlign: 'center',
    flex:1,
    alignItems: "center",
    marginTop: 10,
    color: 'gray',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '75vw',
    backgroundColor: '#777',
    padding: 15,
    borderRadius: 10,
  },
  popupKeys: {
    height: 35,
    backgroundColor: "#444",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#F44",
    height: 30,
  },
  popupKey: {
    color: 'white',
  },
  popupCopy: {
    color: "#FFF",
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: 30,
    width: 55,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#000",
  },
  popupBody: {
    flex:1,
    gap: 10,
    alignItems: "center",
    marginVertical: 15,
    fontSize: 18,
    color: "#FFF",
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000"
  },
  popupWarn: {
    width: 70,
    height: 69,
  },
  popupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "auto",
  },
  popupButtons: {
    color: "#FFF",
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 55,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#000",
    marginTop: "auto",
  },
  copyPopup: {
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
}

export default Login;