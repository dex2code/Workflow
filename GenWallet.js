const { base58Encode, varintEncode } = require('@massalabs/massa-web3/dist/cmd/utils/Xbqcrypto');
const ed = require('@noble/ed25519');
const { SecretKey, PublicKey, Address } = require('@massalabs/massa-web3/dist/cmd/utils/keyAndAddresses');

const SECRET_KEY_PREFIX = 'S';
const VERSION_NUMBER = 0;
const ADDRESS_PREFIX_USER = 'AU';

async function walletGenerateNewAccount() {
  // Generate private key
  const secretKeyArray = ed.utils.randomPrivateKey();

  // Encode the private key
  const version = Buffer.from(varintEncode(VERSION_NUMBER));
  const secretKeyBase58Encoded = SECRET_KEY_PREFIX + base58Encode(Buffer.concat([version, secretKeyArray]));

  // Create SecretKey instance
  const secretKey = new SecretKey(secretKeyBase58Encoded);

  // Get public key
  const publicKey = await secretKey.getPublicKey();
  console.log('Generated PublicKey:', publicKey);

  // Ensure public key has correct prefix
  const publicKeyBase58Encoded = publicKey.base58Encoded;
  const addressBase58Encoded = ADDRESS_PREFIX_USER + publicKeyBase58Encoded.slice(2); // Remove the first 2 characters 'P1' and add 'AU'

  // Create Address instance
  try {
    const address = new Address(addressBase58Encoded);
    console.log('Generated Address:', address);

    return {
      address: address.base58Encoded,
      secretKey: secretKeyBase58Encoded,
      publicKey: publicKeyBase58Encoded,
    };
  } catch (error) {
    console.error('Error creating Address instance:', error);
  }
}

// Example usage
walletGenerateNewAccount()
  .then(account => console.log('New account generated:', account))
  .catch(err => console.error('Error generating new account:', err));
