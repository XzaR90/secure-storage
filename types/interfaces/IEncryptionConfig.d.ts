export interface IEncryptionConfig {
    /**
     * Sets a hex based key to be used when encrypting/decrypting values. (default: undefined (auto generated))
     */
    key?: string;
    /**
     * Sets the expires date for your encryption key in days. (default: 90 days)
     */
    expires: number;
}
