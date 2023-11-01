import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionHistory from "./components/TransactionHistory"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"}/>
      <Stack.Navigator
        initialRouteName="TransactionHistory"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}