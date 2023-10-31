import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsList from "./components/ChatsList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"}/>
      <Stack.Navigator
        initialRouteName="ChatsList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ChatsList" component={ChatsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}