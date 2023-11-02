import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsView from "./components/ChatsView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      <Stack.Navigator initialRouteName="ChatsView">
        <Stack.Screen
          name="ChatsView"
          component={ChatsView}
          options={{
            title: "Chats",
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
            headerSearchBarOptions: {
              textColor: "#FFF",
              // onChangeText: (text) => console.log(text),
            },
            headerTransparent: true,
            headerTitleStyle: { color: "#FFF" },
          }}
        />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {},
});
