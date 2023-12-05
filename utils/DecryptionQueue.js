import getPrivateKeyBech from "./keys";
import getPrivateKeyHex, { hexToBech } from "./keys";

export default class DecryptionQueue {
  static queue = [];

  static decryptFn;

  static setDecryptFn(fn) {
    this.decryptFn = fn;
  }

  static isDecrypting = false;

  static add(encryptedMsg, pubkey, cb) {
    this.queue.push([encryptedMsg, pubkey, cb]);
    if (!this.isDecrypting) {
      this.decrypt();
    }
  }

  static async decrypt() {
    if (!this.decryptFn) throw new Error("No decrypt function set");

    if (this.queue.length > 0) {
      this.isDecrypting = true;
      const [encryptedMsg, pubkey, cb] = this.queue.shift();
      try {
        const decryptedEvent = await this.decryptFn(getPrivateKeyHex(), pubkey, encryptedMsg);
        cb(null, decryptedEvent);
        this.isDecrypting = false;
        this.decrypt();
      } catch (error) {
        cb(error);
      }
    }
  }

  static clear() {
    this.queue = [];
  }
}

// Example usage:
// DecryptionQueue.setDecryptFn(async (msg, theirPublicKey) => {
//   // Your decryption logic here
//   return "Decrypted Message";
// });

// DecryptionQueue.add("Encrypted Message", "Public Key", (error, decryptedMsg) => {
//   if (error) {
//     console.error("Decryption error:", error);
//   } else {
//     console.log("Decrypted message:", decryptedMsg);
//   }
// });
