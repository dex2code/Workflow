# Javascripts 

Building GenWallet.js 

1 - Run GenWallet.js 
2 - Generate a new wallet
3 - Return to the console 
- Wallet address 
- Public key 
- Private key 

/
/
- Sample code - https://github.com/massalabs/massa-web3/blob/2d881ce/src/web3/WalletClient.ts#L291
- Doc - https://web3.docs.massa.net/classes/WalletClient.html#walletGenerateNewAccount
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
Output: Generated PublicKey: PublicKey {
  version: 0,
  base58Encoded: 'P12FSzm9mQvyqNMT1jz6vhmvcxHCnVeEzwZ6wJoFFpVAB3uNwwVh',
  bytes: Uint8Array(32) [
    164, 128, 164, 160,  76, 125,  32, 49,
     42,  36, 214, 159, 194, 158, 198, 81,
    204, 143, 230, 134,  90, 144, 197, 94,
     77,  29, 133,  63,   3, 150, 121, 13
  ]
}
New account generated: undefined

Error: Error creating Address instance: Error: Invalid checksum
    at decode (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\node_modules\@massalabs\massa-web3\node_modules\bs58check\base.js:41:25)
    at base58Decode (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\node_modules\@massalabs\massa-web3\dist\cmd\utils\Xbqcrypto.js:47:44)
    at Address.decodeVersionAndAddressBytes (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\node_modules\@massalabs\massa-web3\dist\cmd\utils\keyAndAddresses.js:99:84)
    at Address._initialize (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\node_modules\@massalabs\massa-web3\dist\cmd\utils\keyAndAddresses.js:88:14)  
    at new Address (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\node_modules\@massalabs\massa-web3\dist\cmd\utils\keyAndAddresses.js:84:14)
    at walletGenerateNewAccount (E:\VS Code\MW0rld - Gama - 0.2.3\ChainScript\xxx PlayerGenWallet.js:30:21)

```


