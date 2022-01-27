import { IKeySaltPair } from './IKeySaltPair';
import { ISecureStorage } from './ISecureStorage';
import { ISecureStorageConfig } from './ISecureStorageConfig';
export interface ISecureStorageFactory {
    /**
     * Creates a PBKDF2 key and salt value pair.
     * @param {string} secretPhrase the password.
     * @param {string} saltAsHex optional, if left a random salt is generated.
     */
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => IKeySaltPair;
    createAsync: (config: Partial<ISecureStorageConfig>) => Promise<ISecureStorage>;
}
