import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import ChatsView from "./components/ChatsView";
import Settings from "./components/Settings"

const Stack = createNativeStackNavigator();

const getFonts = () =>
  Font.loadAsync({
    scp: require("./assets/fonts/source-code-pro.ttf"),
    ways: require("./assets/fonts/ways.ttf"),
  });

export default function App() {
  
  getFonts();

  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen
          name="ChatsView"
          component={ChatsView}
          options={headerOptions.ChatsViewHeader}
        />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {<Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={headerOptions.SettingsHeader}/>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerOptions = {
  ChatsViewHeader: {
    title: "Chats",
    headerLargeTitle: true,
    headerLargeTitleShadowVisible: false,
    headerSearchBarOptions: {
      textColor: "#FFF",
      // onChangeText: (text) => console.log(text),
    },
    headerTransparent: true,
    headerTitleStyle: { color: "#FFF" },
  },
  SettingsHeader: {
    title: "Settings",
    headerLargeTitle: false,
    headerLargeTitleShadowVisible: false,
    headerTransparent: true,
    headerTitleStyle: { color: "transparent" },
  },
};
