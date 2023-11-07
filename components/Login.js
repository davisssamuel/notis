import * as React from "react";
import { View, Text, TextInput, Image, Pressable, Modal} from 'react-native';
import { generatePrivateKey } from 'nostr-tools';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
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
            <Pressable onPress ={toggleModal}>
              <Text style={styles.generator}>generate a private key</Text>
            </Pressable>
            <Modal visible={isModalVisible} transparent={true}>
              <View style={styles.popup}>
                <Text>Popup</Text>
                <Pressable onPress = {toggleModal}>
                  <Text>Close</Text>
                </Pressable>
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
  navName: {
    fontSize: 30,
    height: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    marginTop: 10,
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
  popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
}

export default Login;