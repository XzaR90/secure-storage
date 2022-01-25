import { EncodingType } from '../enums/EncodingType';

export interface ISecureStorageConfigBase {
    encodingType: EncodingType;
    storageNamespace: string;
}
