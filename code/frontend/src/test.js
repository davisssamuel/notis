import { relayInit, finishEvent, generatePrivateKey, getPublicKey } from 'nostr-tools'

const relay = relayInit('wss://localhost:7000')

relay.on('connect', () => {
  console.log(`connected to ${relay.url}`)
})
relay.on('error', () => {
  console.log(`failed to connect to ${relay.url}`)
})

await relay.connect()

// let's publish a new event while simultaneously monitoring the relay for it
let sk = generatePrivateKey()
let pk = getPublicKey(sk)

let event = {
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'AAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDD',
}

// this assigns the pubkey, calculates the event id and signs the event in a single step
const signedEvent = finishEvent(event, sk)
await relay.publish(signedEvent)

relay.close()