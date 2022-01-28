'use strict';

var FingerprintJS = require('@fingerprintjs/fingerprintjs');
var CryptoES = require('crypto-es');
var Cookies = require('js-cookie');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var FingerprintJS__default = /*#__PURE__*/_interopDefaultLegacy(FingerprintJS);
var CryptoES__default = /*#__PURE__*/_interopDefaultLegacy(CryptoES);
var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);

var EncodingType;
(function (EncodingType) {
    EncodingType["AES"] = "aes";
    EncodingType["DES"] = "des";
    EncodingType["TDES"] = "tdes";
    EncodingType["Rabbit"] = "rabbit";
    EncodingType["RC4"] = "rc4";
})(EncodingType || (EncodingType = {}));

const _generateSecretKey = (secretPhrase, salt) => {
    const key128Bits = CryptoES__default["default"].PBKDF2(secretPhrase, salt, { keySize: 128 / 32 });
    return key128Bits?.toString();
};
const generateSecretKeyWithSalt = (secretPhrase, saltAsHex) => {
    let salt = CryptoES__default["default"].lib.WordArray.random(128 / 8);
    if (saltAsHex) {
        salt = CryptoES__default["default"].enc.Hex.parse(saltAsHex);
    }
    const key128Bits = _generateSecretKey(secretPhrase, salt);
    return { key: key128Bits, salt: salt.toString(CryptoES__default["default"].enc.Hex) };
};
const generateSecretKey = (secretPhrase) => {
    return generateSecretKeyWithSalt(secretPhrase);
};

class SecureStorage {
    static browserFingerPrint;
    _encrypt = CryptoES__default["default"].AES.encrypt;
    _decrypt = CryptoES__default["default"].AES.decrypt;
    _isInitialized = false;
    _storage = window?.localStorage ?? localStorage;
    _encryptionSecret = {
        expires: 90,
    };
    config = {
        encodingType: EncodingType.AES,
        storageNamespace: 'secure',
    };
    constructor(config) {
        this.setConfig(config);
        this.setCryptoMethods();
    }
    initAsync = async () => {
        if (this._encryptionSecret.key !== undefined) {
            this._isInitialized = true;
            return;
        }
        if (!SecureStorage.browserFingerPrint) {
            const fp = await FingerprintJS__default["default"].load();
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
    getItem = (key) => {
        this.throwIfNotInitialized();
        key = this.getNamespaceKey(key);
        const encodedItem = this._storage.getItem(key);
        if (encodedItem === null) {
            return null;
        }
        const decryptedValue = this._decrypt(encodedItem, this._encryptionSecret.key);
        const strValue = decryptedValue.toString(CryptoES__default["default"].enc.Utf8);
        try {
            return JSON.parse(strValue);
        }
        catch (e) {
            return strValue;
        }
    };
    removeItem = (key) => {
        key = this.getNamespaceKey(key);
        this._storage.removeItem(key);
    };
    setItem = (key, value) => {
        this.throwIfNotInitialized();
        key = this.getNamespaceKey(key);
        let strValue = value;
        if (typeof value !== 'string') {
            strValue = JSON.stringify(value);
        }
        const encryptedValue = this._encrypt(strValue, this._encryptionSecret.key);
        this._storage.setItem(key, encryptedValue.toString());
    };
    get metaKey() {
        return `${this.config.storageNamespace}_metaKey`;
    }
    getNamespaceKey = (key) => {
        this.throwIfKeyIsUndefined(key);
        return `${this.config.storageNamespace}.${key}`;
    };
    throwIfNotInitialized() {
        if (!this._isInitialized) {
            throw new Error('Secure Storage: Is not initialized.');
        }
    }
    throwIfKeyIsUndefined(key) {
        if (!key) {
            throw new Error('Secure Storage: a key must be provided.');
        }
    }
    setEncryptionSecret(salt) {
        if (!SecureStorage.browserFingerPrint) {
            throw new Error('Secure Storage: Browser finger print is not set.');
        }
        if (!salt) {
            const secret = generateSecretKey(SecureStorage.browserFingerPrint);
            this.setSaltToSecurePlace(secret);
            this._encryptionSecret.key = secret.key;
            Object.freeze(this._encryptionSecret);
            return;
        }
        this._encryptionSecret.key = generateSecretKeyWithSalt(SecureStorage.browserFingerPrint, salt).key;
        Object.freeze(this._encryptionSecret);
    }
    setSaltToSecurePlace(secret) {
        Cookies__default["default"].set(this.metaKey, secret.salt, {
            secure: true,
            sameSite: 'Strict',
            expires: this._encryptionSecret.expires,
        });
    }
    getSaltOrDefaultFromSecurePlace() {
        return Cookies__default["default"].get(this.metaKey);
    }
    setConfig(config) {
        this.config.encodingType = config?.encodingType ?? this.config.encodingType;
        this.config.storageNamespace = config?.storageNamespace ?? this.config.storageNamespace;
        this.setConfigSecret(config);
    }
    setConfigSecret(config) {
        if (config?.encryptionSecret !== undefined) {
            this._encryptionSecret = config.encryptionSecret;
            if (this._encryptionSecret.key) {
                Object.freeze(this._encryptionSecret);
            }
        }
    }
    setCryptoMethods() {
        switch (this.config.encodingType) {
            case EncodingType.TDES:
                this._encrypt = CryptoES__default["default"].TripleDES.encrypt;
                this._decrypt = CryptoES__default["default"].TripleDES.decrypt;
                break;
            case EncodingType.DES:
                this._encrypt = CryptoES__default["default"].DES.encrypt;
                this._decrypt = CryptoES__default["default"].DES.decrypt;
                break;
            case EncodingType.Rabbit:
                this._encrypt = CryptoES__default["default"].Rabbit.encrypt;
                this._decrypt = CryptoES__default["default"].Rabbit.decrypt;
                break;
            case EncodingType.RC4:
                this._encrypt = CryptoES__default["default"].RC4.encrypt;
                this._decrypt = CryptoES__default["default"].RC4.decrypt;
                break;
            case EncodingType.AES:
                this._encrypt = CryptoES__default["default"].AES.encrypt;
                this._decrypt = CryptoES__default["default"].AES.decrypt;
                break;
        }
    }
}
class SecureStorageFactory {
    generateSecretKeyWithSalt = generateSecretKeyWithSalt;
    async createAsync(config) {
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
const factory = new SecureStorageFactory();
exports['default'] = factory;
module.exports = exports['default'];

module.exports = factory;
//# sourceMappingURL=secure-storage.cjs.js.map
