const pablo = ndk.getUser({
  npub: "npub112vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft"
})

let pabloProfile = await pablo.fetchProfile();
let pabloFollows = await pablo.follows();
let pabloRelays = await pablo.relayList();
let pabloFeed = await pablo.feed();

pablo. profile.name = "Pablo";
await pablo.publish();


