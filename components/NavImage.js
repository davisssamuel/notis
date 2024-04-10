import { Image } from "react-native";

import { useEffect, useState } from "react";
import queryMeta from "../utils/meta";
import { getPublicKeyHex } from "../utils/keys";

import blank from "../data/blankProfile.json"

export default function NavImage() {
    const [imageURL, setImageURL] = useState("")

    useEffect(() => {
        const f = async () => {
            const data = await queryMeta()
            if (Object.keys(data).includes("image")) {
                if (data.image != "") {
                    setImageURL(data.image)
                }
                else {
                    setImageURL(blank.image + await getPublicKeyHex())
                }
            }
            else {
                setImageURL(blank.image + await getPublicKeyHex())
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
