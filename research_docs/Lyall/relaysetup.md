# NOSTR Relay Setup on VM
**USES THIS [NOSTR Relay](https://github.com/scsibug/nostr-rs-relay/blob/master/README.md)**
## Setup Steps (No Docker)
* sudo apt-get install build-essential cmake protobuf-compiler pkg-config libssl-dev
* git clone -q https://git.sr.ht/\~gheartsfield/nostr-rs-relay
* cd nostr-rs-relay/
* cargo build -q -r (will take a few minutes)
* RUST_LOG=warn,nostr_rs_relay=info ./target/release/nostr-rs-relay
