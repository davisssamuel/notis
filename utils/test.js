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
import bechToHex from './keys';
import getRelays from './relays';
import getContacts, { addContact, deleteContact, wipe } from './contacts';

/*
let event = {
  kind: 3,
  created_at: Math.floor(Date.now() / 1000),
  tags: [
    ["p", "80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78", "", "Joshy"]
  ],
  content: '',
  pubkey: npubHex,
}

event.id = getEventHash(event)
event.sig = getSignature(event, nsecHex)

pool.publish([...relays], event)
*/

/*
let event = {
  kind: 5,
  created_at: Math.floor(Date.now() / 1000),
  tags: [
    ["e", "c972c21eaaa6459e4d82238bd0fea53d012ca4d3bba099eccd6cee1bf5e7ce62"]
  ],
  content: 'delete',
  pubkey: npubHex,
}


event.id = getEventHash(event)
event.sig = getSignature(event, nsecHex)

pool.publish([...relays], event)

*/



/*
const sub = pool.sub([...relays],[
  {
    authors: [npubHex],
    kinds: [3]
  }
])

sub.on("event", (e) => {
  console.log(e)
})
*/

//console.log(await getContacts())