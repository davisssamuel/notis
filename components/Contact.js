import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

const Contact = ({ contact }) => {
  const { navigate } = useNavigation();
  const currentTheme = useColorScheme();
  return (
    <Pressable>
      {contact}
    </Pressable>
  );
};

const styles = StyleSheet.create({
});

export default Contact;
