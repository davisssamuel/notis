# YikYak Clone
## Idea
Make an application like YikYak that allows the user to create an anonymous temporary message that other users within a certain location radius can see. Users should be able to like or dislike messages, comment on messages, and direct message other users.
## Features
* Anonymous posting
* Temporary posts
* Like or dislike posts
* Message other users
## NIPs
**NIP-28: Public Chat**  
[NIP-28 Documentation](https://github.com/nostr-protocol/nips/blob/master/28.md)  
"This NIP defines new event kinds for public chat channels, channel messages, and basic client-side moderation."  
This NIP creates five event kinds:
* channel create  
* channel metadata  
* channel message  
* hide message  
* mute user  

This would allow for a public chat similar to YikYak and also allow for additional public chat features that could give users more "control" with the addition of hiding messages and muting users.  
**NIP-25: Reactions**  
[NIP-25 Documentation](https://github.com/nostr-protocol/nips/blob/master/25.md)  
"The generic reaction, represented by the content set to a + string, SHOULD be interpreted as a like or upvote. A reaction with content set to - SHOULD be interpreted as a dislike or downvote."  
Allows the users to react to other posts.  
NOTE: can also be used with NIP-30 to display an emoji reaction on a post.    
**NIP-30: Custom Emoji**  
[NIP-30 Documentation](https://github.com/nostr-protocol/nips/blob/master/30.md)  
Allows for custom emojis to be used with reactions.    
**NIP-40: Expiration Timestamp**  
[NIP-40 Documentation](https://github.com/nostr-protocol/nips/blob/master/40.md)  
"The expiration tag enables users to specify a unix timestamp at which the message SHOULD be considered expired (by relays and clients) and SHOULD be deleted by relays."  
This would be used to make each user's post go away after 24 hours.  
IMPORTANT: A relay that supports this NIP must be used. A relay could choose to keep the message forever if the NIP is not supported.  
**NIP-09: Event Deletion**  
[NIP-09 Documentation](https://github.com/nostr-protocol/nips/blob/master/09.md)  
Allows the user to delete their own post and sends a request of deletion to all relays.  
**NIP-56: Reporting**  
[Nip-56 Documentation](https://github.com/nostr-protocol/nips/blob/master/56.md)  
"A report is a kind 1984 note that is used to report other notes for spam, illegal and explicit content."  
Allows the users to report content. If illegal or explicit content is displayed then admins can take it down based off the reports.  
**UNOFFICIAL NIP-31: Incognito Direct Messages**  
[NIP-31 Documentation](https://github.com/nostr-protocol/nips/pull/410)  
Could be used to send anonymous direct messages to different users on the app.
## Competition
* YikYak  
* Whisper

YikYak is an obvious competition to this app as it is based off that idea. Whisper has a similar idea to YikYak, but is less popular. There are currently no clones of YikYak using Nostr which makes it stand out to the many other social media clones using Nostr.  
**Benefits of Ours**  
No phone number required and available to more than just IOS.