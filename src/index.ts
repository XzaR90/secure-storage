import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CryptoES from 'crypto-es';
import Cookies from 'js-cookie';
import { EncodingType } from './enums/EncodingType';
import generateSecretKey, { generateSecretKeyWithSalt } from './helpers/generateSecretKey';
import { ISecureStorage } from './interfaces/ISecureStorage';
import { ISecureStorageConfig } from './interfaces/ISecureStorageConfig';
import { ISecureStorageConfigBase } from './interfaces/ISecureStorageConfigBase';

class SecureStorage {
    private static browserFingerPrint?: string;
    private _encrypt = CryptoES.AES.encrypt;
    private _decrypt = CryptoES.AES.decrypt;
    private _isInitialized = false;
    private _storage: Storage = window?.localStorage ?? localStorage;
    private _encryptionSecret?: string;

    config: ISecureStorageConfigBase = {
        encodingType: EncodingType.AES,
        storageNamespace: 'secure',
    };

    constructor(config: Partial<ISecureStorageConfig>) {
        this.setConfig(config);
        this.setCryptoMethods();
    }

    initAsync = async () => {
        if (this._encryptionSecret !== undefined) {
            this._isInitialized = true;
            return;
        }

        if (!SecureStorage.browserFingerPrint) {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            SecureStorage.browserFingerPrint = result.visitorId;
            Object.freeze(SecureStorage.browserFingerPrint);
        }

        const salt = this.getSaltOrDefaultFromSecurePlace();
        this.setEncryptionSecret(salt);
        this._isInitialized = true;
    };

    clear = () => {
        for (let index = 0; index < this._storage.length; index++) {
            const key = this._storage.key(index);
            if (key?.startsWith(`${this.config.storageNamespace}.`)) {
                this._storage.removeItem(key);
            }
        }
    };

    getItem = <T>(key: string): T | null => {
        this.throwIfNotInitialized();

        key = this.getNamespaceKey(key);
        const encodedItem = this._storage.getItem(key);
        if (encodedItem === null) {
            return null;
        }

        const decryptedValue = this._decrypt(encodedItem, this._encryptionSecret);
        const strValue = decryptedValue.toString(CryptoES.enc.Utf8);
        try {
            return JSON.parse(strValue);
        } catch (e) {
            return strValue as unknown as T;
        }
    };

    removeItem = (key: string): void => {
        key = this.getNamespaceKey(key);
        this._storage.removeItem(key);
    };

    setItem = <T>(key: string, value: T): void => {
        this.throwIfNotInitialized();

        key = this.getNamespaceKey(key);
        let strValue = value as unknown as string;
        if (typeof value !== 'string') {
            strValue = JSON.stringify(value);
        }

        const encryptedValue = this._encrypt(strValue, this._encryptionSecret);
        this._storage.setItem(key, encryptedValue.toString());
    };

    private get metaKey() {
        return `${this.config.storageNamespace}_metaKey`;
    }

    private getNamespaceKey = (key: string) => {
        this.throwIfKeyIsUndefined(key);
        return `${this.config.storageNamespace}.${key}`;
    };

    private throwIfNotInitialized() {
        if (!this._isInitialized) {
            throw new Error('Secure Storage: Is not initialized.');
        }
    }

    private throwIfKeyIsUndefined(key: string) {
        if (!key) {
            throw new Error('Secure Storage: a key must be provided.');
        }
    }

    private setEncryptionSecret(salt: string | undefined) {
        if (!SecureStorage.browserFingerPrint) {
            throw new Error('Secure Storage: Browser finger print is not set.');
        }

        if (!salt) {
            const secret = generateSecretKey(SecureStorage.browserFingerPrint);
            this.setSaltToSecurePlace(secret);
            this._encryptionSecret = secret.key;
            Object.freeze(this._encryptionSecret);
            return;
        }

        this._encryptionSecret = generateSecretKeyWithSalt(SecureStorage.browserFingerPrint, salt).key;
        Object.freeze(this._encryptionSecret);
    }

    private setSaltToSecurePlace(secret: { key: string; salt: string }) {
        Cookies.set(this.metaKey, secret.salt, { secure: true, sameSite: 'Strict' });
    }

    private getSaltOrDefaultFromSecurePlace() {
        return Cookies.get(this.metaKey);
    }

    private setConfig(config: Partial<ISecureStorageConfig>) {
        this.config.encodingType = config?.encodingType ?? this.config.encodingType;
        this.config.storageNamespace = config?.storageNamespace ?? this.config.storageNamespace;

        if (config?.encryptionSecret !== undefined) {
            this._encryptionSecret = config.encryptionSecret;
            Object.freeze(this._encryptionSecret);
        }
    }

    private setCryptoMethods() {
        switch (this.config.encodingType) {
            case EncodingType.TDES:
                this._encrypt = CryptoES.TripleDES.encrypt;
                this._decrypt = CryptoES.TripleDES.decrypt;
                break;
            case EncodingType.DES:
                this._encrypt = CryptoES.DES.encrypt;
                this._decrypt = CryptoES.DES.decrypt;
                break;
            case EncodingType.Rabbit:
                this._encrypt = CryptoES.Rabbit.encrypt;
                this._decrypt = CryptoES.Rabbit.decrypt;
                break;
            case EncodingType.RC4:
                this._encrypt = CryptoES.RC4.encrypt;
                this._decrypt = CryptoES.RC4.decrypt;
                break;
            case EncodingType.AES:
                this._encrypt = CryptoES.AES.encrypt;
                this._decrypt = CryptoES.AES.decrypt;
                break;
        }
    }
}

export default class SecureStorageFactory {
    static async createAsync(config: Partial<ISecureStorageConfig>): Promise<ISecureStorage> {
        const secureStorage = new SecureStorage(config);
        await secureStorage.initAsync();
        return {
            clear: secureStorage.clear,
            setItem: secureStorage.setItem,
            getItem: secureStorage.getItem,
            removeItem: secureStorage.removeItem,
        };
    }
}
