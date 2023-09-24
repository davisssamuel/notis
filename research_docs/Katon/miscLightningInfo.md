Nostr + Lightning: Building payments into your Nostr Applications (Youtube video notes)
https://www.youtube.com/watch?v=b77E9qKnJOU
NOTE: The following information has been taken from the video from the link listed above.
This document is just for reference and ideas about the Nostr + lightning applications. Please refer the Gitlab links 

NIPs for Lightning (and general applications to get lighting running)

-	NIP-01 – Events & Signatures, Relays, Simple text notes, profile metadata
-	NIP-07 – window.nostr (useful nostr functions in browser)
-	NIP-57 – can zap someone and can see who zapped

-	Clients post to and read from multiple relays
-	Websocket connections

Everything in Nostr is a note.

Nostr note format:
```
{
  "id": <32-bytes lowercase hex-encoded sha256 of the serialized event data>,
  "pubkey": <32-bytes lowercase hex-encoded public key of the event creator>,
  "created_at": <unix timestamp in seconds>,
  "kind": <integer between 0 and 65535; Note: 1 is a simple note>
  "tags": [
    [<arbitrary string>...],
    ...
  ],
  "content": <arbitrary string>,
  "sig": <64-bytes lowercase hex of the signature of the sha256 hash of the serialized event data, which is the same as the "id" field>
}
```










Simple query example to retrieve info from relays you’re connected to (“everything in Nostr is a websocket request”) [Note: the following query event has been taken from the videos powerpoint presentation timestamp:@ 22:26
```
[
	“REQ”,
	“profiles:a3922ca3”,
	{
		“authors”: [
			“15b5cf6cdf4fd1c02…”
		  ],
		  “kinds”: [
		         0
		  ]
	}
]
```
(Meta data is kind 0)


Apps that do lightning: Alby
Alby Description (from its website): Connect your wallet, use Bitcoin & Nostr apps with the Alby Extension.
Create an Alby Account to get a lightning wallet for payments wherever you go. 

NIP-07 functions examples
-	window.nostr.getPublicKey()
-	window.nostr.signEvent()
-	window.nostr.nip04.encrypt()
-	window.nostr04.decrypt()

look at @26:15 for an example for NIP- 07

LNURL (Look at NIP-57)
-	Open source spec – LUDs
-	LNURL Pay (LUD-06, LUD-12, LUD-18)
-	LNURL Withdraw (LUD-03)
-	LNURL Auth (LUD-04)
-	Lightning Addresses(LUD-12)

WebLN
-	`window.webln`
-	`webln.makeInvoice()`
-	`webln.sendPaymend()`
-	`webln.keysend()`
-	`webln.lnurl()`
-	`webln.request()`

Nostr + Lightning **Benefits:**

-	Decentralized
-	Money flows as easily as info
-	Content creators have a direct link to their audience
-	No middleman charging fees

NIP-57 is basically central to anything lightning payments

Huge potential with lightning payments. (can send a few cents over bc there is no middleman anymore)

Take a look at http-nostr-publisher (publishes events to Nostr relays)

