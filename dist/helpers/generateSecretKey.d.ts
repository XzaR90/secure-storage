import { IKeySaltPair } from 'src/interfaces/IKeySaltPair';
export declare const generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => IKeySaltPair;
declare const generateSecretKey: (secretPhrase: string) => IKeySaltPair;
export default generateSecretKey;
