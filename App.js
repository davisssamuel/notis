import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsView from "./components/ChatsView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      <Stack.Navigator
        initialRouteName="ChatsView"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ChatsView" component={ChatsView} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
