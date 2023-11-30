import { relayInit, finishEvent, generatePrivateKey, getPublicKey } from 'nostr-tools'
import { SimplePool, nip19 } from 'nostr-tools'
import crypto from './crypto'
import * as secp from '@noble/secp256k1'

/*
const relay = relayInit('wss://relay.damus.io')
relay.on('connect', () => {
  console.log(`connected to ${relay.url}`)
})
relay.on('error', () => {
  console.log(`failed to connect to ${relay.url}`)
})

await relay.connect()

*/
// let's publish a new event while simultaneously monitoring the relay for it
let sk = generatePrivateKey()
let pk = getPublicKey(sk)
let codedPublicKey = 'npub14t4uyrrgvyweuxkdhjqfsx2vnwxvedmar480r57v76ktnl7tfe8qrkd2tx'
let theirPublicKey = nip19.decode(codedPublicKey)

let sharedPoint
try{
  sharedPoint = secp.getSharedSecret(sk, '02' + theirPublicKey.data)
}
catch(error){
  console.error(error.message)
}

let sharedX = sharedPoint.slice(1, 33)

let text = 'Now how do I get this to receive?'

let iv = crypto.randomFillSync(new Uint8Array(16))
var cipher = crypto.createCipheriv(
  'aes-256-cbc',
  Buffer.from(sharedX),
  iv
)
let encryptedMessage = cipher.update(text, 'utf8', 'base64')
encryptedMessage += cipher.final('base64')
let ivBase64 = Buffer.from(iv.buffer).toString('base64')

console.log(encryptedMessage + "?iv=" + ivBase64)

/*
let sub= relay.sub([
  {
    // sending messages
    kinds: [4],
    authors: [pk],
    "#p": [theirPublicKey.data],
  },
  // receiving messages
  {
    kinds: [4],
    authors: [theirPublicKey.data],
    "#p": [pk],
  }
])

sub.on('event', event => {
  console.log(event)
})

let newEvent = {
  pubkey: pk,
  created_at: Math.floor(Date.now() / 1000),
  kind: 4,
  tags: [['p', theirPublicKey.data]],
  content: encryptedMessage + '?iv=' + ivBase64,
}

// this assigns the pubkey, calculates the event id and signs the event in a single step
const signedEvent = finishEvent(newEvent, sk)
await relay.publish(signedEvent)

let events = await relay.list([{ kinds: [0, 1, 4] }])
let retrievedEvent = await relay.get({
  ids: ['44e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245'],
})


relay.close()
*/