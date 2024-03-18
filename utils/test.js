import NDK, { NDKPrivateKeySigner, NDKEvent } from "@nostr-dev-kit/ndk";
import { bechToHex } from "./keys";
import { getRelays } from "./relays";

let sig = new NDKPrivateKeySigner(Buffer.from(bechToHex("nsec1klty3wfv2llk6g4dt66smcgrgcd47wqjhept9knm325egy9afhqszja9er")).toString("hex"))
let ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: sig
})

await ndk.connect();

let event = new NDKEvent(ndk)
event.kind = 1
event.pubkey = bechToHex("npub10qvf7wj98tj7x8pgjjjda402h4eh4e3y720ud98g0w6t259f4eqsu50pe7")
event.created_at = Math.floor(Date.now() / 1000)
event.tags = []
event.content = "Another test"

await event.sign();
await event.publish();