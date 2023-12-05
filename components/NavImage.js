import { Image } from "react-native";

import profileData from "../data/profile.json"

export default function NavImage() {
  return (
    <Image
      source={{
        uri: profileData.image
      }}
      style={{
        width: 25,
        height: 25,
        borderRadius: 100,
      }}
    ></Image>
  );
}
