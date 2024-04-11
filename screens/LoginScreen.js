import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal, Image} from 'react-native';
import { generateSecretKey } from 'nostr-tools';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loggedIn } from "../utils/keys";
import getPage, { setPage } from "../utils/statePersistence";

import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { setAllMeta } from '../utils/meta';

const Login = () => {
  const { navigate }  = useNavigation();
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [ispopupVisible, setPopupVisible] = useState(false);
  const [copyMessage, setCopyMessage] = useState(false);

  const copyPopup = (message) => {
    setPopupVisible(true);
    setCopyMessage(message);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);setPopupVisible(true);
  }

  const copyKey = async () => {
    try {
      await Clipboard.setStringAsync(privateKey.hex);
      copyPopup('Copied!');
    }
    catch (error){
      copyPopup('Copy Error!');
    }
  }
  
  const generateKeys = async () => {
    try {
      const sk = generateSecretKey();
      const skHex = bytesToHex(sk);
      setPrivateKey({
        "uint8": sk,
        "hex": skHex,
      });
      toggleModal();
    }
    catch (error) {
      console.error("Error generating keys:", error);
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
                    console.log("wrong length")
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
                            <Text style = {styles.popupKey}>{privateKey.hex}</Text>
                        </ScrollView>
                        <Pressable style={styles.popupCopy} onPress = {copyKey}>
                            <Text style={{color:"inherit",fontWeight:"inherit"}}>Copy</Text>
                        </Pressable>
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
                            await AsyncStorage.setItem('privateKey', JSON.stringify(privateKey));
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
            <View style={styles.copyModal}>
                <Text style={styles.copyText}>{copyMessage}</Text>
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
  copyModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  copyText: {
    color: 'white',
    fontSize: 20,
  },
}

export default Login;