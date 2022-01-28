interface IKeySaltPair {
    key: string;
    salt: string;
}

interface ISecureStorage {
    /**
     * Clear all the values from storageNamespace
     */
    clear: () => void;
    setItem: <T>(key: string, value: T) => void;
    getItem: <T>(key: string) => T | null;
    removeItem: (key: string) => void;
}

interface IEncryptionConfig {
    /**
     * Sets a hex based key to be used when encrypting/decrypting values. (default: undefined (auto generated))
     */
    key?: string;
    /**
     * Sets the expires date for your encryption key in days. (default: 90 days)
     */
    expires: number;
}

declare enum EncodingType {
    AES = 'aes',
    DES = 'des',
    TDES = 'tdes',
    Rabbit = 'rabbit',
    RC4 = 'rc4',
}

interface ISecureStorageConfigBase {
    /**
     * Sets the encoding type aes, tdes, des, rabbit or rc4. (default: 'aes')
     */
    encodingType: EncodingType;
    /**
     * Sets the value which is used to track all storage keys. (default: 'secure')
     */
    storageNamespace: string;
}

interface ISecureStorageConfig extends ISecureStorageConfigBase {
    encryptionSecret?: IEncryptionConfig;
}

interface ISecureStorageFactory {
    /**
     * Creates a PBKDF2 key and salt value pair.
     * @param {string} secretPhrase the password.
     * @param {string} saltAsHex optional, if left a random salt is generated.
     */
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => IKeySaltPair;
    createAsync: (config: Partial<ISecureStorageConfig>) => Promise<ISecureStorage>;
}

declare class SecureStorageFactory implements ISecureStorageFactory {
    static defaultInstance: SecureStorageFactory;
    generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string) => IKeySaltPair;
    createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage>;
}
declare const _default: SecureStorageFactory;

export { _default as default };
