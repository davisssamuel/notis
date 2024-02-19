import * as React from "react";
import "react-native-gesture-handler";
import { Platform, StatusBar, useColorScheme, Pressable } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

// SCREENS
import ChatsScreen from "./screens/ChatsScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactsScreen from "./screens/ContactsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MesssagingScreen from "./screens/MessagingScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import ContactInfoScreen from "./screens/ContactInfoScreen";

// COMPONENTS
import CustomDrawer from "./components/CustomDrawer";
import NavImage from "./components/NavImage";


const ChatsStack = createNativeStackNavigator();
function ChatsStackGroup() {
  const navigation = useNavigation();
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="ChatsScreen"
        options={{
          title: "Chats",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerSearchBarOptions: {
            // textColor: currentTheme === "dark" ? "#FFF" : "#000",
            // onChangeText: (text) => console.log(text),
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <NavImage />
            </Pressable>
          ),
        }}
        component={ChatsScreen}
      />

      <ChatsStack.Screen
        name="MessagingScreen"
        options={{ headerTransparent: Platform.OS === "ios" ? true : false }}
        component={MesssagingScreen}
      />
    </ChatsStack.Navigator>
  );
}

const ContactsStack = createNativeStackNavigator();
function ContactsStackGroup() {
  const navigation = useNavigation();
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="ContactsScreen"
        options={{
          title: "Contacts",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <NavImage />
            </Pressable>
          ),
        }}
        component={ContactsScreen}
      />
      <ContactsStack.Screen
        screenOptions={{
          headerShown: false,
        }}
        name="ContactInfoScreen"
        options={({ navigation }) => ({
          title: "",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLeft: () => (
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color="gainsboro"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15 }}
            />
          ),
        })}
        component={ContactInfoScreen}
      />
    </ContactsStack.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();
function LoginStackGroup() {
  const navigation = useNavigation();
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
    </LoginStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsStackGroup() {
  const navigation = useNavigation();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        options={{
          title: "Settings",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <NavImage />
            </Pressable>
          ),
        }}
        component={SettingsScreen}
      />
      <ChatsStack.Screen
        name="TransactionHistoryScreen"
        options={{ headerTransparent: Platform.OS === "ios" ? true : false }}
        component={TransactionHistoryScreen}
      />
    </SettingsStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function DrawerGroup() {
  return (
    <Drawer.Navigator
      initialRouteName="Logout"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Chats" component={ChatsStackGroup} />
      <Drawer.Screen name="Contacts" component={ContactsStackGroup} />
      <Drawer.Screen name="Settings" component={SettingsStackGroup} />
      <Drawer.Screen name="Logout" component={LoginStackGroup} />
    </Drawer.Navigator>
  );
}

const prefix = Linking.makeUrl("/");
export default function App() {

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Chats: "chats",
        Contacts: "contacts",
        Settings: "settings",
        Logout: "login",
      },
    },
  };

  // function handleDeepLink(event) {
  //   let data = Linking.parse(event.url);
  //   setData(data);
  // }

  // useEffect(() => {
  //   Linking.addEventListener("url", handleDeepLink);
  //   return () => {
  //     Linking.removeEventListener("url");
  //   };
  // }, []);

  const currentTheme = useColorScheme();
  return (
    <NavigationContainer linking={linking} theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
  // return (<Navigation/>);
}



// ============================================================================================== //

// const headerOptions = {
//   ChatsViewHeader: {
//     // title: "Chats",
//     headerLargeTitle: true,
//     headerLargeTitleShadowVisible: false,
//     headerSearchBarOptions: {
//       textColor: "#FFF",
//       // onChangeText: (text) => console.log(text),
//     },
//     headerTransparent: true,
//     headerTitleStyle: { color: "#FFF" },
//   },
//   ConversationViewHeader: {
//     // title: "Chats",
//     headerLargeTitle: true,
//     headerLargeTitleShadowVisible: false,
//     headerSearchBarOptions: {
//       textColor: "#FFF",
//       // onChangeText: (text) => console.log(text),
//     },
//     headerTransparent: true,
//     headerTitleStyle: { color: "#FFF" },
//   },
// };
