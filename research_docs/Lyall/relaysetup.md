# Nostr Relay Setup on VM
**USES THIS [NOSTR Relay](https://github.com/scsibug/nostr-rs-relay/blob/master/README.md)**
## Setup Instructions (No Docker)
1. `sudo apt-get install build-essential cmake protobuf-compiler pkg-config libssl-dev`
2. `git clone -q https://git.sr.ht/\~gheartsfield/nostr-rs-relay`
3. `cd nostr-rs-relay`
4. `cargo build -q -r (will take a few minutes)`
5. `RUST_LOG=warn,nostr_rs_relay=info ./target/release/nostr-rs-relay`
