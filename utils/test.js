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
import getContacts, { addContact, deleteContact, wipe } from './contacts';
import encrypt from './messages';
import { nip04 } from 'nostr-tools';


const message = "test"
const pubkey = "80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78"

const encryptedMessage = await nip04.encrypt(getPrivateKeyHex(), pubkey, message);
console.log(encryptedMessage);

const decryptedMessage = await nip04.decrypt(getPrivateKeyHex(), pubkey, encryptedMessage);
console.log(decryptedMessage);