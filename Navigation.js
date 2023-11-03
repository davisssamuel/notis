import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatsScreen from "./screens/ChatsScreen";
import MesssagingScreen from "./screens/MessagingScreen";

// stack
const Stack = createNativeStackNavigator();

// function MessagingStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Chats" component={ChatsScreen} />
//       <Stack.Screen name="MessagingScreen" component={MesssagingScreen} />
//     </Stack.Navigator>
//   );
// }

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="MessagingScreen" component={MesssagingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
