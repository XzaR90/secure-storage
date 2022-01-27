import * as __interfaces_IKeySaltPair from './interfaces/IKeySaltPair.ts';
import { ISecureStorage } from './interfaces/ISecureStorage.ts';
import { ISecureStorageConfig } from './interfaces/ISecureStorageConfig.ts';
import { ISecureStorageFactory } from './interfaces/ISecureStorageFactory.ts';

declare class SecureStorageFactory implements ISecureStorageFactory {
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => __interfaces_IKeySaltPair.IKeySaltPair;
    createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage>;
}
declare const _default: SecureStorageFactory;

export { _default as default };
