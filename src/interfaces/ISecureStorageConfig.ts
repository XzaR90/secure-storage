import { ISecureStorageConfigBase } from './ISecureStorageConfigBase';

export interface ISecureStorageConfig extends ISecureStorageConfigBase {
    encryptionSecret?: string;
}
