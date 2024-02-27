import getPrivateKeyHex, { getPublicKeyHex, hexToBech } from "./keys";
import { SimplePool, finalizeEvent } from "nostr-tools";
import { getRelays, relayPool } from "./relays";
import NDK, { NDKPrivateKeySigner, NDKEvent } from "@nostr-dev-kit/ndk";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function queryContacts(func) {
  const ndk = new NDK({
    explicitRelayUrls: getRelays()
  })
  await ndk.connect()

  ndk.subscribe({
    kinds:[3],
    authors:[await getPublicKeyHex()]
  }).on("event", (e) => { 
    func(e) 
  })

  /*
  return relayPool.subscribeMany(
    getRelays(),
    [{
      kinds: [3],
      authors: [await getPublicKeyHex()],
    }],
    {
      onevent(e) {
        func(e)
      },
      oneose() {
        relayPool.close(getRelays());
      }
    }
  )*/
}

export async function getContactDataFromKey(npub, func) {
  const ndk = new NDK({
    explicitRelayUrls: getRelays()
  })
  await ndk.connect()

  ndk.subscribe({
    kinds:[0],
    authors:[npub]
  }).on("event", (e) => { 
    func(JSON.parse(e.content)) 
  })
}

export async function getContactsFromStorage() {
  return JSON.parse(await AsyncStorage.getItem("contactsList"));
}

export async function saveContactsToStorage(tagsList) {
  AsyncStorage.setItem("contactsList", JSON.stringify(tagsList));
}

export async function saveContactsToRelays() {

  let relayContacts = []
  for (let contact of await getContactsFromStorage()) {
    relayContacts.push(["p", contact.pubkey, "", contact.nickname])
  }

  let sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
  let ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: sig
  })

  let event = new NDKEvent(ndk)
  event.kind = 3
  event.pubkey = await getPublicKeyHex()
  event.created_at = Math.floor(Date.now() / 1000)
  event.tags = relayContacts
  event.content = ""

  await event.sign()
  event.publish()
  /*
  
  let event = {
    kind: 3,
    author: await getPublicKeyHex(),
    created_at: Math.floor(Date.now() / 1000),
    tags: relayContacts,
    content:"",
  }

  const signedEvent = finalizeEvent(event, await getPrivateKeyHex());
  try {
    relayPool.publish(getRelays(), signedEvent);
  }
  catch(e) {
    console.log(e);
  }
}

export async function loadContactsFromRelays() {
  queryContacts((event) => {
    saveContactsToStorage(event.tags)
  })*/
}

export async function addContact(npub, nickname) {
  if (await AsyncStorage.getItem("contactsList") == null) {
    await AsyncStorage.setItem("contactsList", JSON.stringify([]))
  }
  let contacts = JSON.parse(await AsyncStorage.getItem("contactsList"));
  getContactDataFromKey(npub, (data) => {
    let contactObj = {
      pubkey: npub,
      name: data.name,
      nickname: nickname,
      description: data.about,
      image: data.picture
    }

    let inList = false;
    for(let i = 0; i < contacts.length; i++) {
      if(contacts[i].pubkey == npub) {
        inList = true;
        break;
      }
    }

    if(inList == false) {
      contacts.push(contactObj);
      saveContactsToStorage(contacts);
      saveContactsToRelays();
    }
  })
}

export async function deleteContact(npub) {
  let contacts = await getContactsFromStorage()
  contacts = contacts.filter(contact => contact[1] !== npub);
  await saveContactsToStorage(contacts);
}

export async function editNickName(npub, nickname) {
  deleteContact(npub)
  addContact(npub, nickname)
}
