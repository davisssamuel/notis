import { finalizeEvent, nip44 } from "nostr-tools";
import getPrivateKeyHex, { bechToHex, getPublicKeyHex } from "./keys";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getRelays, relayPool } from "./relays";
import { SimplePool } from 'nostr-tools/pool'
import { isBlocked } from "./contacts";


export default async function encrypt(message, theirPublicKey) {
    let privKey = await getPrivateKeyHex()
    let convKey = nip44.v2.utils.getConversationKey(privKey, theirPublicKey);
    let encrypted = nip44.v2.encrypt(message, convKey);
    return encrypted;
}

export async function decrypt(payload, theirPublicKey) {
    let privKey = await getPrivateKeyHex()
    let convKey = nip44.v2.utils.getConversationKey(privKey, theirPublicKey);
    let decrypted = nip44.v2.decrypt(payload, convKey);
    return decrypted;
}

export async function send(message, theirPublicKey) {
    let publicKey = await getPublicKeyHex();
    let privateKey = await getPrivateKeyHex();
    let encryptedMessage = await encrypt(message, theirPublicKey);

    let sig = new NDKPrivateKeySigner(privateKey)
    let ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig
    })

    await ndk.connect();

    let event = new NDKEvent(ndk);
    event.kind = 4;
    event.pubkey = publicKey;
    event.created_at = Math.floor(Date.now() / 1000);
    event.tags = [['p', theirPublicKey]];
    event.content = encryptedMessage;

    await event.sign();
    await event.publish();
}

export async function queryMessages(pubkey, myPubKey, func, eose) {
    const ndk = new NDK({
        explicitRelayUrls: getRelays()
    })
    await ndk.connect()

    ndk.subscribe([{
        kinds: [4],
        authors: [myPubKey],
    },{
        kinds: [4],
        authors: [pubkey],
    }]).on("event", async (e) => { 
        if (((e.pubkey == myPubKey && e.tags[0][1] == pubkey) || 
            (e.pubkey == pubkey && e.tags[0][1] == myPubKey)) &&
            e.kind == 4)
        {
            func(e)
        }
    }).on("eose", (e) => {
        eose(e)
    })
    
}

export async function queryAllMesssages(func, eose) {
    const ndk = new NDK({
        explicitRelayUrls: getRelays()
    })
    await ndk.connect()

    ndk.subscribe([{
        kinds: [4],
        pubkey: await getPublicKeyHex(),
    },{
        kinds: [4],
        tags: [['p', await getPublicKeyHex()]]
    }]).on("event", async (e) => {
        if (((e.pubkey == await getPublicKeyHex() || e.tags[0][1] == await getPublicKeyHex()) && 
            e.kind == 4) &&
            (!(await isBlocked(e.pubkey)) && !(await isBlocked(e.tags[0][1]))))
        {
            func(e)
        }
    }).on("eose", (e) => {
        eose(e)
    })
}