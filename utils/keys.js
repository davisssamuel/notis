import { nip19 } from "nostr-tools";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPublicKey } from "nostr-tools";

// current keys for the primary dev profile (A)
const privateBech = "nsec1klty3wfv2llk6g4dt66smcgrgcd47wqjhept9knm325egy9afhqszja9er"
const privateHex = bechToHex(privateBech)
const publicBech = "npub10qvf7wj98tj7x8pgjjjda402h4eh4e3y720ud98g0w6t259f4eqsu50pe7"
const publicHex = bechToHex(publicBech)

export default async function getPrivateKeyBech() {
  return await getPrivateKeyHex();
}
export async function getPrivateKeyHex() {
  return (await AsyncStorage.getItem("privateKey")).hex;
}
export async function getPrivateKeyArray() {
  return (await AsyncStorage.getItem("privateKey")).uint8;
}
export function getPublicKeyBech() {
  return hexToBech(getPublicKeyHex());
}
export function getPublicKeyHex() {
  return getPublicKey(getPrivateKeyArray());
}

export function bechToHex(bechKey) {
  return nip19.decode(bechKey).data
}

export function hexToBech(hexKey) {
  return nip19.npubEncode(hexKey)
}