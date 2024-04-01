import getPrivateKeyHex, { getPublicKeyHex, hexToBech } from "./keys";
import { SimplePool, finalizeEvent } from "nostr-tools";
import { getRelays, relayPool } from "./relays";
import NDK, { NDKPrivateKeySigner, NDKEvent } from "@nostr-dev-kit/ndk";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function queryMeta() {
    const sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
  const ndk = new NDK({
    explicitRelayUrls: getRelays(),
    signer: sig,
  })
  await ndk.connect();

  const usr = await ndk.getUser({
    pubkey: await getPublicKeyHex()
  })

  await usr.fetchProfile();

  return usr.profile
}

export async function setMetaImage(url) {
    const sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: await getPublicKeyHex()
    })

    await usr.fetchProfile();

    usr.profile.image = url;
    await usr.publish();
}

export async function setMetaName(name) {
    const sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: await getPublicKeyHex()
    })

    await usr.fetchProfile();

    usr.profile.name = name;
    await usr.publish();
}

export async function setMetaBio(bio) {
    const sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: await getPublicKeyHex()
    })

    await usr.fetchProfile();

    usr.profile.bio = bio;
    await usr.publish();
}

export async function setMetaBanner(url) {
    const sig = new NDKPrivateKeySigner(await getPrivateKeyHex())
    const ndk = new NDK({
        explicitRelayUrls: getRelays(),
        signer: sig,
    })
    await ndk.connect();

    const usr = await ndk.getUser({
        pubkey: await getPublicKeyHex()
    })

    await usr.fetchProfile();

    usr.profile.banner = url;
    await usr.publish();
}