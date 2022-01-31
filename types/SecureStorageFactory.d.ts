import { IKeySaltPair } from './interfaces/IKeySaltPair';
import { ISecureStorage } from './interfaces/ISecureStorage';
import { ISecureStorageConfig } from './interfaces/ISecureStorageConfig';
import { ISecureStorageFactory } from './interfaces/ISecureStorageFactory';
export default class SecureStorageFactory implements ISecureStorageFactory {
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string) => IKeySaltPair;
    createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage>;
}
