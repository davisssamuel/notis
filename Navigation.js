import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import ChatsScreen from "./screens/ChatsScreen";
import ContactsScreen from "./screens/ContactsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MesssagingScreen from "./screens/MessagingScreen";
import CustomDrawer from "./components/CustomDrawer";
import NavImage from "./components/NavImage";

import {
  Platform,
  StatusBar,
  useColorScheme,
  Pressable,
  Image,
} from "react-native";

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
              <NavImage/>
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
              <NavImage/>
            </Pressable>
          ),
        }}
        component={ContactsScreen}
      />
    </ContactsStack.Navigator>
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
              <NavImage/>
            </Pressable>
          ),
        }}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function DrawerGroup() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props}></CustomDrawer>}
    >
      <Drawer.Screen name="Chats" component={ChatsStackGroup}></Drawer.Screen>
      <Drawer.Screen
        name="Contacts"
        component={ContactsStackGroup}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={SettingsStackGroup}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <DrawerGroup></DrawerGroup>
    </NavigationContainer>
  );
}
