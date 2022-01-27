import { IEncryptionConfig } from './IEncryptionConfig';
import { ISecureStorageConfigBase } from './ISecureStorageConfigBase';

export interface ISecureStorageConfig extends ISecureStorageConfigBase {
    encryptionSecret?: IEncryptionConfig;
}
