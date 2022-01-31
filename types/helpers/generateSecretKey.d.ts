import { IKeySaltPair } from '../interfaces/IKeySaltPair';
export declare const generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => IKeySaltPair;
export declare const generateSecretKey: (secretPhrase: string) => IKeySaltPair;
