import getPrivateKeyHex, { getPublicKeyHex, hexToBech } from "./keys";
import { SimplePool, finalizeEvent } from "nostr-tools";
import { getRelays, relayPool } from "./relays";
import NDK, { NDKPrivateKeySigner, NDKEvent } from "@nostr-dev-kit/ndk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryMetaFromKey } from "./meta";

export default async function queryContacts(func) {
  const ndk = new NDK({
    explicitRelayUrls: getRelays()
  })
  await ndk.connect();

  ndk.subscribe({
    kinds:[3],
    authors:[await getPublicKeyHex()]
  }).on("event", (e) => { 
    func(e) 
  })
}

export async function getContactsFromStorage() {
  return JSON.parse(await AsyncStorage.getItem("contactsList"));
}

export async function getContactFromStorage(pubkey) {
    let contacts = JSON.parse(await AsyncStorage.getItem("contactsList"));
    if (contacts != null) {
        for (let contact of contacts) {
            if (contact.pubkey == pubkey) {
                return contact
            }
        }
    }
    return null;
}

export async function saveContactsToStorage(contactsList) {
  AsyncStorage.setItem("contactsList", JSON.stringify(contactsList));
}

export async function saveContactsToRelays() {

  let relayContacts = []
  let contacts = await getContactsFromStorage();
  if (contacts == null) {return;}
  for (let contact of contacts) {
    relayContacts.push(["p", contact.pubkey, "", contact.nickname])
  }

  let sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
  let ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: sig
  })

  await ndk.connect();

  let event = new NDKEvent(ndk)
  event.kind = 3
  event.pubkey = await getPublicKeyHex()
  event.created_at = Math.floor(Date.now() / 1000)
  event.tags = relayContacts
  event.content = "update contacts"

  await event.sign()
  await event.publish()
}

export async function addContact(npub, nickname) {
    if (await AsyncStorage.getItem("contactsList") == null) {
        await AsyncStorage.setItem("contactsList", JSON.stringify([]))
    }
    let contacts = JSON.parse(await AsyncStorage.getItem("contactsList"));
    let data = await queryMetaFromKey(npub)
    let contactObj = {
      pubkey: npub,
      name: data == null ? "" : data.name,
      nickname: nickname,
      description: data == null ? "" : data.about,
      banner: data == null ? "" : data.banner,
      image: data == null ? "" : data.image
    }

    let inList = false;
    for(let i = 0; i < contacts.length; i++) {
      if(contacts[i].pubkey == npub) {
        //console.log("IN LIST :(")
        inList = true;
        break;
      }
    }

    if(inList == false) {
      contacts.push(contactObj);
      saveContactsToStorage(contacts);
      saveContactsToRelays();
    }
}

export async function deleteContact(npub) {
    let contacts = await getContactsFromStorage()
    contacts = contacts.filter(contact => contact.pubkey !== npub);
    await saveContactsToStorage(contacts);
    saveContactsToRelays();
}

export async function wipeContacts() {
    await AsyncStorage.setItem("contactsList", JSON.stringify([]))
}

export async function editNickName(npub, nickname) {
    let contacts = await getContactsFromStorage()
    for (let contact of contacts) {
        if (contact.pubkey == npub) {
            contact.nickname = nickname
            break;
        }
    }
    await saveContactsToStorage(contacts);
    await saveContactsToRelays();
}

export async function blockContact(pubkey) {
    let blocked = JSON.parse(await AsyncStorage.getItem("blockedContacts"))
    if (blocked == null) {
        blocked = [];
    }
    if (!blocked.includes(pubkey)) {
        blocked.push(pubkey);
    }
    AsyncStorage.setItem("blockedContacts", JSON.stringify(blocked))
}

export async function unblockContact(pubkey) {
    let blocked = JSON.parse(await AsyncStorage.getItem("blockedContacts"))
    if (blocked == null) {
        blocked = [];
    }
    blocked = blocked.filter((c) => {c == pubkey});
    AsyncStorage.setItem("blockedContacts", JSON.stringify(blocked))
}

export async function isBlocked(pubkey) {
    let blocked = JSON.parse(await AsyncStorage.getItem("blockedContacts"))
    if (blocked != null) {
        return blocked.includes(pubkey)
    }
    return null;
}

export async function wipeBlocked() {
    await AsyncStorage.setItem("blockedContacts", JSON.stringify([]))
}
