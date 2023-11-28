import { 
  SimplePool,
  getEventHash,
  getSignature, 
  relayInit} from "nostr-tools";
import getRelays from "./relays";
import { getPrivateKeyHex, getPublicKeyHex, hexToBech } from "./keys";
import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";

// used to block while waiting for events
function block(name, event) {
  return new Promise((resolve) => {
    event.on(name, (e) => {
      resolve(e)
    })
  })
}

export default async function getContacts() {
  const sig = new NDKPrivateKeySigner(getPrivateKeyHex())

  const ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: sig})

  await ndk.connect()

  let events = await block("event",
    ndk.subscribe({
      kinds: [3],
      authors: [getPublicKeyHex()]
    })
  );

  let contacts = []

  for (let contact of events.tags) {
    let usr = ndk.getUser({ npub: hexToBech(contact[1]) })
    await usr.fetchProfile()

    contacts.push({
      ...usr.profile,
      nickname: contact[3],
      publicKey: contact[1]
    })
  }

  return contacts
}

export async function addContact(npub, nickname) {
  const pool = new SimplePool()
  const contacts_event = await pool.list([...getRelays()], [{ kinds: [3], authors: [getPublicKeyHex()] }])

  let tags = []

  if (contacts_event.length > 0) {
    wipe(contacts_event[0].id)
    tags = contacts_event[0].tags
  }

  tags.push([ "p", npub, "", nickname ])

  let event = {
    kind: 3,
    created_at: Math.floor(Date.now() / 1000),
    tags: tags,
    content: '',
    pubkey: getPublicKeyHex(),
  }
  
  event.id = getEventHash(event)
  event.sig = getSignature(event, getPrivateKeyHex())
  
  pool.publish([...getRelays()], event)
}

export async function deleteContact(npub) {
  const pool = new SimplePool()
  const contacts_event = await pool.list([...getRelays()], [{ kinds: [3], authors: [getPublicKeyHex()] }])

  let tags = []

  if (contacts_event.length > 0) {
    wipe(contacts_event[0].id)
    tags = contacts_event[0].tags
  }
  else {
    return
  }

  if (tags.length == 1) {
    return
  }

  tags = tags.filter(function(item){ return item[1] != npub })

  let event = {
    kind: 3,
    created_at: Math.floor(Date.now() / 1000),
    tags: tags,
    content: '',
    pubkey: getPublicKeyHex(),
  }
  
  event.id = getEventHash(event)
  event.sig = getSignature(event, getPrivateKeyHex())
  
  pool.publish([...getRelays()], event)
}


/*
export function editNickName() {

}
*/




// deletes the event with the specified id
export function wipe(id) {
  const pool = new SimplePool()
  let event = {
    kind: 5,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["e", id]
    ],
    content: '',
    pubkey: getPublicKeyHex(),
  }
  
  
  event.id = getEventHash(event)
  event.sig = getSignature(event, getPrivateKeyHex())
  
  pool.publish([...getRelays()], event)
}