import 
  getPrivateKeyBech, { 
  getPrivateKeyHex,
  getPublicKeyHex,
  getPubliceKeyBech } from "./keys";
import { secp256k1 } from '@noble/curves/secp256k1'
import { randomBytes } from '@noble/hashes/utils'

const utf8Decoder = new TextDecoder('utf-8')
const utf8Encoder = new TextEncoder()

import crypto from "../crypto";

export default async function encrypt(message, theirPublicKey) {
  const key = secp256k1.getSharedSecret(getPrivateKeyHex(), '02' + theirPublicKey)
  const normalizedKey = getNormalizedX(key)

  let iv = Uint8Array.from(randomBytes(16))
  let plaintext = utf8Encoder.encode(message)
  let cryptoKey = await crypto.subtle.importKey('raw', normalizedKey, { name: 'AES-CBC' }, false, ['encrypt'])
  let ciphertext = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, plaintext)
  let ctb64 = base64.encode(new Uint8Array(ciphertext))
  let ivb64 = base64.encode(new Uint8Array(iv.buffer))

  return `${ctb64}?iv=${ivb64}`
}

export async function decrypt(theirPublicKey, data) {
  let [ctb64, ivb64] = data.split('?iv=')
  let key = secp256k1.getSharedSecret(getPrivateKeyHex(), '02' + theirPublicKey)
  let normalizedKey = getNormalizedX(key)

  let cryptoKey = await crypto.subtle.importKey('raw', normalizedKey, { name: 'AES-CBC' }, false, ['decrypt'])
  let ciphertext = base64.decode(ctb64)
  let iv = base64.decode(ivb64)

  let plaintext = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, ciphertext)

  let text = utf8Decoder.decode(plaintext)
  return text
}


function getNormalizedX(key) {
  return key.slice(1, 33)
}