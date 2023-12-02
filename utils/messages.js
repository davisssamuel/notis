import 
  getPrivateKeyBech, { 
  getPrivateKeyHex,
  getPublicKeyHex,
  getPublicKeyBech, 
  hexToBech} from "./keys";
import { secp256k1 } from '@noble/curves/secp256k1'
import * as ExpoCrypto from 'expo-crypto';
import { base64 } from "@scure/base";
import crypto from "./crypto"
import { Buffer } from "buffer";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getSignature } from "nostr-tools";
import getRelays from "./relays";


const utf8Decoder = new TextDecoder('utf-8')
const utf8Encoder = new TextEncoder()

export default async function encrypt(message, theirPublicKey) {
  const key = secp256k1.getSharedSecret(getPrivateKeyHex(), '02' + theirPublicKey);
  const normalizedKey = getNormalizedX(key);

  let iv = ExpoCrypto.getRandomBytes(16);
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
  const signer = new NDKPrivateKeySigner(getPrivateKeyHex())

  const ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: signer})
  await ndk.connect()

  let event = new NDKEvent(ndk);
  event.kind = 4;
  event.tag(ndk.getUser({npub: hexToBech(pubkey)}))
  event.content = encrypt(message, pubkey)._j
  event.sign().catch((err) => {
    console.error(err)
  })

  //console.log(event)
}

export async function receive(pubkey) {
  const ndk = new NDK({
    explicitRelayUrls: getRelays()
  })
  await ndk.connect();

  let sub = ndk.subscribe({ kinds: [4], authors: [getPublicKeyHex()] });

  sub.on("event", (e) => {
    //console.log(e.rawEvent())
  })
}