# BAND Clone
### Table of Contents
- [Summary](#summary)
  - [General](#general)
  - [Communities](#communities)
  - [Notices](#notices)
  - [Breakouts](#breakouts)
- [NIPs](#nips)
- [Competition](#competition)
  - [BAND](#band)
  - [Discord](#discord)

## Summary
### General
Creating a BAND clone using the Nostr protocol will provide users of our app with a community-based social media platform to share announcements, comments, and ideas about things within the community. 

### Communities
Communities themselves are invite-only, which adds an extra layer of security to the communities themselves. Communities can be created by anyone. Whoever creates a community will be in charge of maintaining it. Maintenence can include purging unwanted comments, assigning permissions to other users, etc. In order to avoid joining a phony community, users will need to take extra precautions to ensure the community they have been invited to is the correct one.

### Notices
A notice is a Post created by a moderator in a community. Anything can be said within a particular Notice. Again, moderation will be controlled by either the creator of the group, or any member who has been assigned the proper moderation role. Community-wide announcements can only be created by moderators.
Notices can be commented on as well. Any member of the community can comment
Notices can have reactions as well. Any member of the community can react.

### Breakouts
Breakouts can be created by anyone within a community, but must be approved by a moderator. Breakouts are a way for members of a community who are a part of the breakout to talk amongst themselves outside of commenting on Notices. Members can join or leave breakouts as they wish. Moderators can add, remove, or ban users from breakouts as needed. Moderators can delete breakouts as needed.

## NIPs
The following is a list of [NIPs](https://github.com/nostr-protocol/nips/blob/master/README.md) that will be used in our implementation of a BAND clone. These are subject to change, as some relays may not support certain NIPs we make use of. Each bullet point will list the NIP number, along with what we would use the NIP for in our application. Implementable NIPs include:
- Official NIPs
    - [NIP-02: Friend List](https://github.com/nostr-protocol/nips/blob/master/02.md)
    - [NIP-03: Notice Timespamps](https://github.com/nostr-protocol/nips/blob/master/03.md)
    - [NIP-08: Mentions](https://github.com/nostr-protocol/nips/blob/master/08.md)
    - [NIP-09: Deleting Notices](https://github.com/nostr-protocol/nips/blob/master/09.md)
    - [NIP-18: Reposting Notices](https://github.com/nostr-protocol/nips/blob/master/18.md)
    - [NIP-23: Image Notices](https://github.com/nostr-protocol/nips/blob/master/23.md)
    - [NIP-25: Reacting to Notices](https://github.com/nostr-protocol/nips/blob/master/25.md)
    - [NIP-27: Notices within Notices](https://github.com/nostr-protocol/nips/blob/master/27.md)
    - [NIP-28: Breakouts](https://github.com/nostr-protocol/nips/blob/master/28.md)
    - [NIP-38: Friend Statuses](https://github.com/nostr-protocol/nips/blob/master/38.md)
    - [NIP-40: Temporary Notices](https://github.com/nostr-protocol/nips/blob/master/40.md)
    - [NIP-52: Calendar Events](https://github.com/nostr-protocol/nips/blob/master/52.md)
    - [NIP-53: Interactive Notices](https://github.com/nostr-protocol/nips/blob/master/53.md)
    - [NIP-56: Reporting Notices](https://github.com/nostr-protocol/nips/blob/master/56.md)
    - [NIP-72: Community Moderation](https://github.com/nostr-protocol/nips/blob/master/72.md)
    - ~~[NIP-78: App-Specific Data](https://github.com/nostr-protocol/nips/blob/master/78.md)~~
    - [NIP-94: File Sharing](https://github.com/nostr-protocol/nips/blob/master/94.md)

- Unofficial NIPs
    - None yet
- Custom NIPs
    - None yet


## Competition
The following is a list of apps that may be able to compete with the features we provide
#### BAND

#### Discord
While not exactly the same as what we intend to produce, Discord would be competition.
##### What We Have on Them
- A more appealing and user-friendly interface.
  - Discord may be difficult to understand at first, making it harder for anybody to join servers.
  - The process of learning how to efficiently utilize all its features is difficult for someone who has never used it before
- Decentralized
  - If using a tool that does not gather metadata from users is important, then Notis would be the perfect app.
  - Since Nostr is the protocol used, no information is stolen from the user. Only information the user wants our client to have is saved.

##### What They Have on Us
- A more robust ecosystem
  - Since Nostr is a fairly new protocol, the "robustness" can sometimes come into question.
  - Dicsord has a very well-developed ecosystem, with seamless integration between devices signed into the same account.
  - Relays storing notes may go down, causing our app to lose access ot certain Notices occasionally.
