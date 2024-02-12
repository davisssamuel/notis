import { SimplePool, finalizeEvent } from "nostr-tools";

export let relayPool = null;

export default function initPool() {
  relayPool = new SimplePool()
}

// returns an array containing the urls to our preferred relays
let relays = [
  "wss://relay.damus.io",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.mom",
  "wss://nostr.slothy.win" ,
]

export function getRelays() {
  return relays   // TODO: get form storage
}

// possible types are: online, offline, public, paid
export async function getAllRelaysFromAPI(type) {
  if (!["online", "public", "paid", "offline"].includes(type)) {
    return {
      status: -1,
      type: type,
      data: "Unknown type",
    }
  }
  let response = await fetch("https://api.nostr.watch/v1/" + type);
  return {
    status: response.status,
    type: type,
    data: await response.json()
  }
}

// used to set the users relays to the top [num] online relays
export async function setRelays(num) {
  let tempRelays = await getAllRelaysFromAPI("online")
  if (tempRelays.status == 200) {
    relays = tempRelays.data.slice(0, num) // TODO: save in storage (or on nostr), not just in the relays variable
  }
}