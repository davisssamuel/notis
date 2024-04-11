import getPrivateKeyHex, { getPublicKeyHex, hexToBech } from "./keys";
import { getRelays, relayPool } from "./relays";
import NDK, { NDKPrivateKeySigner, NDKEvent } from "@nostr-dev-kit/ndk";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function queryMeta() {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return {};
    }

    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    return usr.profile
}

export async function queryMetaFromKey(npub) {
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: npub
    })

    await usr.fetchProfile();

    return usr.profile
}

export async function setMetaImage(url) {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return;
    }
    
    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    usr.profile.image = url;
    await usr.publish();
}

export async function setMetaName(name) {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return;
    }

    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    usr.profile.name = name;
    await usr.publish();
}

export async function setMetaBio(bio) {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return;
    }

    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    usr.profile.about = bio;
    await usr.publish();
}

export async function setMetaBanner(url) {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return;
    }

    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    usr.profile.banner = url;
    await usr.publish();
}

export async function setAllMeta(name, bio, image, banner) {
    let pub = await getPublicKeyHex()
    let sec = await getPrivateKeyHex()
    if (sec == null || pub == null) {
        return {};
    }

    const sig = new NDKPrivateKeySigner(sec)
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: pub
    })

    await usr.fetchProfile();

    usr.profile.name = name;
    usr.profile.about = bio;
    usr.profile.image = image;
    usr.profile.banner = banner;
    await usr.publish();
}