import { Image } from "react-native";

import profileData from "../data/profile.json"
import { useEffect, useState } from "react";
import queryMeta from "../utils/meta";
import { getPublicKeyHex } from "../utils/keys";

export default function NavImage() {
    const [imageURL, setImageURL] = useState("")

    useEffect(() => {
        const f = async () => {
            const data = await queryMeta()
            if (Object.keys(data).includes("image")) {
                setImageURL(data.image)
            }
            else {
                setImageURL("https://api.dicebear.com/8.x/identicon/svg?seed=" + await getPublicKeyHex())
            }
        }
        f();
    })
  return (
    <Image
      source={{
        uri: imageURL
      }}
      style={{
        width: 25,
        height: 25,
        borderRadius: 100,
      }}
    ></Image>
  );
}
