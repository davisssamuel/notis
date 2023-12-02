import { 
  nip05,
  nip19, 
  SimplePool, 
  validateEvent, 
  verifySignature, 
  getSignature, 
  getEventHash, 
  getPublicKey } from 'nostr-tools'
import NDK from '@nostr-dev-kit/ndk';
import bechToHex, { getPrivateKeyHex } from './keys';
import getRelays from './relays';
import encrypt, { decrypt, send, receive } from './messages';

/*
const sig = new NDKPrivateKeySigner(getPrivateKeyHex())

const ndk = new NDK({
  explicitRelayUrls: getRelays(),
  signer: sig})

await ndk.connect()

const message = "Wow this actually works?"
const pubkey = "80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78"

//send(message, pubkey)

let sub = ndk.subscribe({
  kinds: [4],
  authors: [getPublicKeyHex()]
})

sub.on("event", (e) => {
  console.log(e);
}) 
*/