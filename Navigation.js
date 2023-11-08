import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatsScreen from "./screens/ChatsScreen";
import MesssagingScreen from "./screens/MessagingScreen";
import { Platform, StatusBar, useColorScheme } from "react-native";

// stack
const Stack = createNativeStackNavigator();

// function MessagingStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="MessagingSreen" component={MessagingScreen} />
//       <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
//     </Stack.Navigator>
//   );
// }

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="ChatsScreen"
          options={{
            title: "Chats",
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios" ? true : false,
            headerSearchBarOptions: {
              textColor: currentTheme === "dark" ? "#FFF" : "#000",
              // onChangeText: (text) => console.log(text),
            },
          }}
          component={ChatsScreen}
        />
        <Stack.Screen
          name="MessagingScreen"
          options={{ headerTransparent: Platform.OS === "ios" ? true : false }}
          component={MesssagingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerOptions = {
  ChatsScreenHeader: {
    title: "Chats",
    headerLargeTitle: true,
    headerTransparent: Platform.OS === "ios" ? true : false,
    headerSearchBarOptions: {
      textColor: "#FFF",
      // onChangeText: (text) => console.log(text),
    },
  },
  MessagingScreenHeader: {
    headerTransparent: Platform.OS === "ios" ? true : false,
  },
  ChatDetailsScreen: {},
};
