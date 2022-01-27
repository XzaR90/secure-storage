import { ISecureStorage } from './interfaces/ISecureStorage';
import { ISecureStorageConfig } from './interfaces/ISecureStorageConfig';
import { ISecureStorageFactory } from './interfaces/ISecureStorageFactory';
declare class SecureStorageFactory implements ISecureStorageFactory {
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => import("./interfaces/IKeySaltPair").IKeySaltPair;
    createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage>;
}
declare const _default: SecureStorageFactory;
export default _default;
