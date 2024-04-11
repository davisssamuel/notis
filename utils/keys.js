import { nip19 } from "nostr-tools";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPublicKey } from "nostr-tools";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

// current keys for the primary dev profile (A)
/*
const privateBech = "nsec1klty3wfv2llk6g4dt66smcgrgcd47wqjhept9knm325egy9afhqszja9er"
const privateHex = bytesToHex(bechToHex(privateBech))
const publicBech = "npub10qvf7wj98tj7x8pgjjjda402h4eh4e3y720ud98g0w6t259f4eqsu50pe7"
const publicHex = bechToHex(publicBech)
*/

export default async function getPrivateKeyHex() {
  let key = JSON.parse(await AsyncStorage.getItem("privateKey"));
  return key == null ? null : key.hex;
}
export async function getPrivateKeyArray() {
    let key = JSON.parse(await AsyncStorage.getItem("privateKey"))
  return key == null ? null : Uint8Array.from(
    Object.values(
      key.uint8
    )
  );
}

export async function getPublicKeyHex() {
    let key = await getPrivateKeyHex()
  return key == null ? null : getPublicKey(key);
}
export async function getPublicKeyArray() {
    let key = await getPublicKeyHex()
  return key == null ? null : hexToBytes(key);
}

export async function removeLogin() {
    AsyncStorage.removeItem("privateKey")
}
export async function loggedIn() {
    return await AsyncStorage.getItem("privateKey") != null;
}

export function bechToHex(bechKey) {
  return nip19.decode(bechKey).data
}
export function hexToBech(hexKey) {
  return nip19.npubEncode(hexKey)
}