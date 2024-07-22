# Javascripts 

Building GenWallet.js 

1 - Run GenWallet.js 
2 - Generate a new wallet
3 - Return to the console 
- Wallet address 
- Public key 
- Private key 



Sample code - https://github.com/massalabs/massa-web3/blob/2d881ce/src/web3/WalletClient.ts#L291
Doc - https://web3.docs.massa.net/classes/WalletClient.html#walletGenerateNewAccount
```
 /**
   * Generates a new wallet account.
   * @param version_number - The version number of the secret key to be generated, to create a new account.
   *
   * @returns A Promise that resolves to an {@link IAccount} object, which represents the newly created account.
   */
  public static async walletGenerateNewAccount(): Promise<IAccount> {
    // generate private key
    const secretKeyArray: Uint8Array = ed.utils.randomPrivateKey();

    const version = Buffer.from(varintEncode(VERSION_NUMBER));
    const secretKeyBase58Encoded: string =
      SECRET_KEY_PREFIX +
      base58Encode(Buffer.concat([version, secretKeyArray]));
    const secretKey: SecretKey = new SecretKey(secretKeyBase58Encoded);

    // get public key
    const publicKey: PublicKey = await secretKey.getPublicKey();

    // get wallet account address
    const address: Address = new Address(publicKey);

    return {
      address: address.base58Encode,
      secretKey: secretKeyBase58Encoded,
      publicKey: publicKey.base58Encode,
    } as IAccount;
  }
```




An error is returned 
```
    crypto: { randomBytes } // Importování randomBytes
              ^

TypeError: Cannot read properties of undefined (reading 'randomBytes')
    at Object.<anonymous> (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\xxx PlayerGenWallet.js:12:15)
    at Module._compile (node:internal/modules/cjs/loader:1369:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)
    at Module.load (node:internal/modules/cjs/loader:1206:32)
    at Module._load (node:internal/modules/cjs/loader:1022:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49

Node.js v20.12.2
```


