import 
  getPrivateKeyBech, { 
  getPrivateKeyHex,
  getPublicKeyHex,
  getPublicKeyBech, 
  hexToBech} from "./keys";
import { secp256k1 } from '@noble/curves/secp256k1'
// import * as ExpoCrypto from 'expo-crypto'; causes a typeof error in the message.js file
//import { getRandomBytes } from 'react-native-get-random-values'; causes a typeof error
// import { getRandomValues } from './crypto'; causes a typeof error

import { base64 } from "@scure/base";
import crypto from "./crypto"
import { Buffer } from "buffer";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getSignature } from "nostr-tools";
import getRelays from "./relays";


const utf8Decoder = new TextDecoder('utf-8')
const utf8Encoder = new TextEncoder()

export default async function encrypt(message, theirPublicKey) {
  console.log("inside of encrypt");
  const key = secp256k1.getSharedSecret(getPrivateKeyHex(), '02' + theirPublicKey);
  const normalizedKey = getNormalizedX(key);

  console.log('@ random bytes');
  let iv = crypto.randomFillSync(new Uint8Array(16))
  let plaintext = utf8Encoder.encode(message);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(normalizedKey), iv);
  let ciphertext = cipher.update(plaintext, 'utf-8', 'base64');
  ciphertext += cipher.final('base64');
  let ivb64 = base64.encode(new Uint8Array(iv.buffer));

  return `${ciphertext}?iv=${ivb64}`
}

export async function decrypt(data, theirPublicKey) {
  let [ctb64, ivb64] = data.split('?iv=');
  let key = secp256k1.getSharedSecret(getPrivateKeyHex(), '02' + theirPublicKey);
  let normalizedKey = getNormalizedX(key);

  let iv = base64.decode(ivb64);
  let ciphertext = base64.decode(ctb64);
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(normalizedKey), iv);
  let decrypted = decipher.update(ciphertext, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

function getNormalizedX(key) {
  return key.slice(1, 33)
}

export async function send(message, pubkey) {
  try {
    const message = "Wow this actually works?"
    const pubkey = "80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78"
    const signer = new NDKPrivateKeySigner(getPrivateKeyHex())

    const ndk = new NDK({
      explicitRelayUrls: getRelays(),
      signer: signer
    })
    await ndk.connect()

    let event = new NDKEvent(ndk);
    event.kind = 4;
    console.log('hexToBech(pubkey):', hexToBech(pubkey));
    event.tag(ndk.getUser({ npub: hexToBech(pubkey) }))
    console.log('passed event.tag');
    event.content = await encrypt(message, pubkey);
    console.log('passed encrypt');
    await event.sign();
    console.log('signed');
  } catch (error) {
    console.error('Send Error:', error);
  }
}

export async function receive(pubkey) {
  const ndk = new NDK({
    explicitRelayUrls: getRelays()
  })
  await ndk.connect();

  let sub = ndk.subscribe({ kinds: [4], authors: [getPublicKeyHex()] });

  sub.on("event", (e) => {
    console.log(e.rawEvent())
  })
}