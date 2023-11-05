import React from "react";
import { View, Text, TextInput, Image, Pressable} from 'react-native';
import { generatePrivateKey } from 'nostr-tools';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const navigation = useNavigation();

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
          <View style={styles.keyGen}>
            <Pressable onPress ={() => {}}>
              <Text style={styles.generator}>Generate a key</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
}
const styles =  {
  container: {
    backgroundColor: 'rgb(229, 229, 229)',
  },
  loginPage: {
    display: 'flex',
    flexDirection: 'column',
    height: 100,
  },
  navName: {
    fontFamily: 'source-code-pro',
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
    margin: 10,
    borderRadius: 8,
  },
  key: {
    margin: 5,
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'source-code-pro',
  },
  keyGen: {
    display: 'flex',
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 8,
    width: 'auto',
    height: 'auto',
  },
  generator: {
    textAlign: 'center',
  },
}

export default Login;