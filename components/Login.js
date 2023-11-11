import * as React from "react";
import { View, Text, TextInput, Image, Pressable, Modal} from 'react-native';
import { generatePrivateKey, getPublicKey} from 'nostr-tools';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const { navigate }  = useNavigation();

  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);

  const generateKeys = async () => {
    try {
      const sk = await generatePrivateKey();
      const pk = getPublicKey(sk);
      setPrivateKey(sk);
      setPublicKey(pk);
      toggleModal();
    } 
    catch (error) {
      console.error("Error generating keys:", error);
    }
  };

  const toggleModal = () => {
    console.log("Modal Toggled");
    setModalVisible(!isModalVisible);
  };

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
            />
          </View>
          <View style = {styles.button}>
            <Pressable onPress = {() => {navigate('contacts')}}>
              <Text style={styles.loginButton}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.keyGen}>
            <Pressable onPress ={generateKeys}>
              <Text style={styles.generator}>generate a private key</Text>
            </Pressable>
            <Modal 
              animationType = "scale"
              transparent = {true}
              visible = {isModalVisible}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popup}>
                  <View style={styles.popupKeys}>
                    <Text style = {styles.popupKey}>Public Key: {publicKey}</Text>
                    <Text style = {styles.popupKey}>Private Key: {privateKey}</Text>
                  </View>
                  <View style={styles.popupFooter}>
                    <Pressable style = {styles.popupButtons} onPress = {toggleModal}>
                      <Text style = {styles.popupText}>Close</Text>
                    </Pressable>
                    <Pressable style = {styles.popupButtons} onPress = {() => {navigate('contacts')}}>
                      <Text style = {styles.popupText}>Login</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    )
}
const styles =  {
  container: {
    flex: 1,
    backgroundColor: 'rgb(229, 229, 229)',
  },
  loginPage: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  navBar: {
    alignItems: 'center',
    // marginTop: 10,
  },
  navName: {
    fontSize: 30,
    // height: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    // display: 'flex',
    // marginTop: 10,
  },
  loginForm: {
    height: 35,
    backgroundColor: 'rgb(210, 210, 210)',
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 8,
  },
  loginButton: {
    textAlign: 'center',
    color: 'white',
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
  generator: {
    textAlign: 'center',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '75%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2,
  },
  popupKeys: {
    borderColor: 'grey',
    borderRadius: 2,
    borderRadius: 10,
  },
  popupKey: {
    color: 'black',
  },
  popupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  popupButtons: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  popupText: {
    color: 'white',
    textAlign: 'center',
  },
}

export default Login;