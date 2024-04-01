import * as React from "react";
import { View, Text, TextInput, ScrollView, Pressable, Modal} from 'react-native';
import { generateSecretKey, getPublicKey, nip19} from 'nostr-tools';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getPrivateKeyBech, { getPrivateKeyHex, hexToBech, loggedIn, setPrivateKeyHex } from "../utils/keys";
import { decode } from "punycode";

import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import getContactsListener from "../utils/contacts";
 
const Login = () => {
  const { navigate }  = useNavigation();
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [ispopupVisible, setPopupVisible] = React.useState(false);
  const [copyMessage, setCopyMessage] = React.useState(false);

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
      console.log('Copied!');
    }
    catch (error){
      copyPopup('Copy Error!');
      console.error('Copy Error!')
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
  React.useEffect(() => {
    const f = async () => {
        if (await loggedIn()) {
            navigate("Chats");
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
            placeholder="> Private Key"
            placeholderTextColor="black"
            onChangeText={(inp) => setPrivateKey(inp)}
            />
          </View>
          <Text id="input-status" style={styles.inputStatus}>Invalid Key</Text>
          <View style = {styles.button}>
            <Pressable onPress={async () => {
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
                  //b7d648b92c57ff6d22ad5eb50de103461b5f3812be42b2da7b8aa99410bd4dc1
                  catch(e) {
                    document.getElementById("input-status").style.color = "red";
                    console.log("not a hex key")
                  }
                }
              }}>
              
              <Text style={styles.loginButton}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.keyGen}>
            <Pressable onPress ={generateKeys}>
              <Text style={styles.generator}>generate a private key</Text>
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
                      <Text style={styles.popupText}>Copy</Text>
                    </Pressable>
                  </View>
                  <Text>Remember to save the private key or you will lose your account!</Text>
                  <View style={styles.popupFooter}>
                    <Pressable style = {styles.popupButtons} onPress = {toggleModal}>
                      <Text style = {styles.popupText}>Close</Text>
                    </Pressable>
                    <Pressable style = {styles.popupButtons} onPress = {async () => {
                      await AsyncStorage.setItem('privateKey', JSON.stringify(privateKey));
                      toggleModal();
                      navigate('Chats'); }}>
                      <Text style = {styles.popupText}>Login</Text>
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
    textAlign: 'center',
    color: '#FF',
    fontSize: 20,
  },
  key: {
    margin: 5,
    fontSize: 15,
    
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
    color: 'white',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '75%',
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    borderColor: '#FF',
    borderWidth: 2,
  },
  popupKeys: {
    flexDirection: 'row',
    borderColor: '#FF',
    borderWidth: 2,
    borderRadius: 3,
  },
  popupKey: {
    color: 'white',
  },
  popupCopy: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  popupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  popupButtons: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  popupText: {
    color: 'black',
    textAlign: 'center',
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