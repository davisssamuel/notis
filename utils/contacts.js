import getRelays from "./relays";
import { getPrivateKeyHex, getPublicKeyHex, hexToBech } from "./keys";
import { SimplePool, finalizeEvent } from "nostr-tools";

/*
Usage: 
getContacts((e) => {
  // do something with the event e
});
*/
export default async function getContacts(func) {
  let pool = new SimplePool();

  pool.subscribeMany(
    getRelays(),
    [{
      kinds: [3],
      authors: [getPublicKeyHex()]
    }],
    {
      onevent(e) {
        func(e)
      },
      oneose() {
        pool.close();
      }
    }
  )
}

//deleteContact("another")

getContacts((e) => {
  console.log(e)
})


/*
Usage: 
addContact("[public key hex]", "nickname");
*/
export async function addContact(npub, nickname) {
  let pool = new SimplePool()
  let event = {
    kinds: [3],
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
  pool.close()
}

/*
Usage: 
deleteContact("[public key hex]")
*/
export async function deleteContact(npub) {
  getContacts(async (e) => {
    let pool = new SimplePool()
    // found the contact, now delete (NIP-05)
    if (npub == e.tags[0][1]) {
      //e.id
      let event = {
        kind: 5,
        pubkey: getPublicKeyHex(),
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ["e", e.id]
        ],
        content: "",
      }
      const signedEvent = finalizeEvent(event, getPrivateKeyHex());
      await Promise.any(pool.publish(getRelays(), signedEvent));
      pool.close();
    }
  })
}

// NOT tested, may not work because of async stuff
/*
export async function editNickName(npub, nickname) {
  deleteContact(npub)
  addContact(npub, nickname)
}
*/