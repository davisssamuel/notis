import getRelays from "./relays";
import { getPrivateKeyHex, getPublicKeyHex, hexToBech } from "./keys";
import {RelayPool} from "nostr-relaypool";
import { SimplePool, finalizeEvent } from "nostr-tools";

// used to block while waiting for events
function block(name, event) {
  return new Promise((resolve) => {
    event.on(name, (e) => {
      resolve(e)
    })
  })
}

export default async function getContacts() {
  let pool = new SimplePool();

  return pool.subscribeMany(
    getRelays(),
    [{
      kinds: [3],
      authors: [getPublicKeyHex()]
    }],
    {
      onevent(e) {
        console.log(e)
      },
      oneose() {
        h.close();
      }
    }
  )
}

console.log()

export async function addContact(npub, nickname) {
  let pool = new SimplePool()
  let event = {
    kind: 3,
    pubkey: getPublicKeyHex(),
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      [
        "p",
        npub,
        "",
        nickname
      ]
    ],
    content:"",
  }

  const signedEvent = finalizeEvent(event, getPrivateKeyHex())
  await Promise.any(pool.publish(getRelays(), signedEvent))
}

export async function deleteContact(npub) {

  // query contacts
  // get event ID of the contact u want to delete
  // delete event




  /*
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
  */
}


/*
export function editNickName() {

}
*/




// deletes the event with the specified id
export function wipe(id) {

  /*
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
  */
}