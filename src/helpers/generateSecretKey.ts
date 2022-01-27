import CryptoES from 'crypto-es';
import { IKeySaltPair } from 'src/interfaces/IKeySaltPair';

const _generateSecretKey = (secretPhrase: string, salt: CryptoES.lib.WordArray) => {
    const key128Bits = CryptoES.PBKDF2(secretPhrase, salt, { keySize: 128 / 32 });
    return key128Bits?.toString();
};

export const generateSecretKeyWithSalt = (secretPhrase: string, saltAsHex?: string): IKeySaltPair => {
    let salt = CryptoES.lib.WordArray.random(128 / 8);
    if (saltAsHex) {
        salt = CryptoES.enc.Hex.parse(saltAsHex);
    }

    const key128Bits = _generateSecretKey(secretPhrase, salt);
    return { key: key128Bits, salt: salt.toString(CryptoES.enc.Hex) };
};

export const generateSecretKey = (secretPhrase: string) => {
    return generateSecretKeyWithSalt(secretPhrase);
};
