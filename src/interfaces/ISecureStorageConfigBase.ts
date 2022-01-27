import { EncodingType } from '../enums/EncodingType';

export interface ISecureStorageConfigBase {
    /**
     * Sets the encoding type aes, tdes, des, rabbit or rc4. (default: 'aes')
     */
    encodingType: EncodingType;
    /**
     * Sets the value which is used to track all storage keys. (default: 'secure')
     */
    storageNamespace: string;
}
