import { ISecureStorage } from './interfaces/ISecureStorage';
import { ISecureStorageConfig } from './interfaces/ISecureStorageConfig';
export default class SecureStorageFactory {
    static createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage>;
}
