import React from "react";
import { View, Text, TextInput, Image} from 'react-native';
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
}

export default Login;