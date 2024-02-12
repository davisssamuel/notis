import * as React from "react";
import "react-native-gesture-handler"
import Navigation from "./Navigation";
import initPool from "./utils/relays";

// const Stack = createNativeStackNavigator();

initPool()

export default function App() {
  return (<Navigation/>);
};

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
