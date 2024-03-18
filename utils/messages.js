import { finalizeEvent, nip44 } from "nostr-tools";
import getPrivateKeyHex, { bechToHex, getPublicKeyHex } from "./keys";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { getRelays, relayPool } from "./relays";

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

    let event = new NDKEvent(ndk);
    event.kind = 4;
    event.pubkey = publicKey;
    event.created_at = Math.floor(Date.now() / 1000);
    event.tags = [['p', theirPublicKey]];
    event.content = encryptedMessage;

    await event.sign();
    event.publish();

}

export async function receive(pubkey) {
    const ndk = new NDK({
        explicitRelayUrls: getRelays()
    })
    await ndk.connect()

    ndk.subscribe({
        kind: 4,
        pubkey: pubkey
        //tags: [['p', await getPublicKeyHex()]]
    }).on("event", (e) => { 
        func(e)
    })
}