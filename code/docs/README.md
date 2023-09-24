## General Notes
Ensure [nostr-tools](https://github.com/nbd-wtf/nostr-tools/tree/master) is installed before proceeding with any of the code examples from these notes.
To install, run
```bun -g install nostr-tools```

### Decoding Keys using [nostr-tools/nip19](https://github.com/nbd-wtf/nostr-tools/blob/master/nip19.ts)
In order to actually use the Nostr protocol to publish and sign notes, keys must be formatted properly. The Bech32 encoding that [NIP-19](https://github.com/nostr-protocol/nips/blob/master/19.md) outlines is not the proper formatting to be used in relays. Relays require the hex string of keys. 
To convert from Bech32 to Hex, do something like the following:
``` javascript
import { nip19 } from 'nostr-tools'
let bechKey = "npub1sqmqhhuhqq7pqlk20kl2nw520nt7h9jlr6ddp27ynmpvuyt7d4uq54lfxp";
let keyObj = nip19.decode(bechKey);
console.log(keyObj)
```
which will output the following object to the console:

``` json
{
    "type": "npub",
    "data": "80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78"
}
```
Then obviously, to access the hex version of the key you would just need to access the `data` portion of the object like so:
``` javascript
import { nip19 } from 'nostr-tools'
let bechKey = "npub1sqmqhhuhqq7pqlk20kl2nw520nt7h9jlr6ddp27ynmpvuyt7d4uq54lfxp";
let keyObj = nip19.decode(bechKey);
console.log(keyObj.data)
```
which will output the following string to the console:
```80360bdf97003c107eca7dbea9ba8a7cd7eb965f1e9ad0abc49ec2ce117e6d78```

This method works for all of the following key types:
`nprofile`, `nevent`, `naddr`, `nrelay`, `nsec`, `npub`, `note`