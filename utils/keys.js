import { nip19 } from "nostr-tools";

// current keys for the dev profile
const privateBech = "nsec1fy7yg4clgtv9ustwwh90nt6p5w64m36vmq3c4rwunw3cxsg8pxrsns8vzy"
const privateHex = "493c44571f42d85e416e75caf9af41a3b55dc74cd8238a8ddc9ba38341070987"
const publicBech = "npub1l9mg709fnx7pvcd0c29zdkffr3v4uu6re4tnp7x7vt9dsr580ffqlhk4j2"
const publicHex = "f9768f3ca999bc1661afc28a26d9291c595e7343cd5730f8de62cad80e877a52"

// all of these "gets" will ideally read from local storage eventually. For now, the keys are hard-coded
export default function getPrivateKeyBech() {
  return privateBech
}
export function getPrivateKeyHex() {
  return privateHex
}
export function getPublicKeyBech() {
  return publicBech
}
export function getPublicKeyHex() {
  return publicHex
}

export function bechToHex(bechKey) {
  return nip19.decode(bechKey).data
}

export function hexToBech(hexKey) {
  return nip19.npubEncode(hexKey)
}
