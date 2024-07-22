const {
    Client,
    ClientFactory,
    fromMAS,
    CHAIN_ID,
    ProviderType,
    EOperationStatus,
    Address,
    SecretKey,
    PublicKey,
    utils: { base58Encode, varintEncode },
    crypto: { randomBytes } // Import randomBytes
} = require("@massalabs/massa-web3");

const baseProviders = [
    {
        url: "https://mainnet.massa.net/api/v2",
        type: ProviderType.PUBLIC
    }
];

(async function () {
    
    const baseClient = await ClientFactory.createCustomClient(
        baseProviders,
        CHAIN_ID.MainNet,
        true,
        baseAccount
    );  
    
  
    // Generate a new wallet account
    const walletGenerateNewAccount = async () => {
        const VERSION_NUMBER = 1;
        const SECRET_KEY_PREFIX = "S";

        // Generate random private key
        const secretKeyArray = randomBytes(32); 
        const version = Buffer.from(varintEncode(VERSION_NUMBER));
        const secretKeyBase58Encoded = SECRET_KEY_PREFIX + base58Encode(Buffer.concat([version, secretKeyArray]));
        const secretKey = new SecretKey(secretKeyBase58Encoded);
        const publicKey = await secretKey.getPublicKey();
        const address = new Address(publicKey);

        return {
            address: address.toString(),
            secretKey: secretKeyBase58Encoded,
            publicKey: publicKey.toString()
        };
    };

    const newAccount = await walletGenerateNewAccount();

    // Log the new wallet details in JSON format
    console.log(JSON.stringify({
        address: newAccount.address,
        publicKey: newAccount.publicKey,
        secretKey: newAccount.secretKey
    }));

})();
