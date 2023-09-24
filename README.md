# Getting Started with Nostr
The following is a comprehensive tutorial for setting up an account (public/private key pair) in order to use various Nostr clients.

## Choosing a Client
There are several different Nostr clients that make use of Nostr's many features and capabilities. Many are available as a web application and for both iOS and Android devices. A comprehensive list can be found [here](https://www.nostrapps.com). Some clients allow you to set up a key pair in-app. There is nothing wrong with doing it this way, but we do reccomend using a web-browser as outlined in [the following](#creating-a-key-pair) step for consistency's sake.

## Creating a Key Pair
NOTE: a Chromium-based web browser is required for this step

Install the [nos2x](https://chrome.google.com/webstore/detail/nos2x/kpgefcfmnafjgpblomihpgmejjdanjjp) extension

[nos2x](https://chrome.google.com/webstore/detail/nos2x/kpgefcfmnafjgpblomihpgmejjdanjjp) can be installed like any other Chrome extension. You will need to visit nos2x's options page in order to configure a key pair. This may vary based on browsers, but generally, right-click on the extension icon and click `options`. This will take you to this page: 

<img src="/images/options-page.png" alt="Options Page" width="500"/>

Assuming you do not already have key pair, press the `generate`. If you do already have a key pair, paste your private key into the field to the left of `generate`. Click `save` to save the key pair into the extension. Congratulations! You now have a Nostr "account."

NOTE: You do not have change anything in `preferred relays` unless you prefer to use a certain set of relays. We will not delve into this since it is not nescessary for getting started with Nostr.

## Using a Client
Most clients allow you to configure your profile in-app, which should update your Nostr information accordingly. To check or alter profile information more comprehensively, visit the [Nostr Profile Manager](https://metadata.nostr.com).

# Bun
[Bun Documentation](https://bun.sh/docs)

We plan to use Bun (an alternative to Node.js), which claims to be much quicker due to custom package installers, build scripts, and test scripts.
