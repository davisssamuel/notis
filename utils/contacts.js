import { 
  SimplePool,
  getEventHash,
  getSignature } from "nostr-tools";
import getRelays from "./relays";
import { getPrivateKeyHex, getPublicKeyHex } from "./keys";

export default async function getContacts() {
  const pool = new SimplePool()
  const events = await pool.list([...getRelays()], [{ kinds: [3], authors: [getPublicKeyHex()] }])

  if (events.length == 0) {
    return null
  }

  const contacts = []

  for (let contact of events[0].tags) {
    let contact_profile = await pool.list([...getRelays()], [{ kinds: [0], authors: [contact[1]] }])
    contacts.push({
      ...JSON.parse(contact_profile[contact_profile.length - 1].content),
      nickname: contact[3],
      publicKey: contact[1]
    })
  }

  return contacts;
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