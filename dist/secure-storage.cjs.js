'use strict';

var FingerprintJS = require('@fingerprintjs/fingerprintjs');
var CryptoES = require('crypto-es');
var Cookies = require('js-cookie');
var EncodingType_ts = require('./enums/EncodingType.ts');
var generateSecretKey = require('./helpers/generateSecretKey.ts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var FingerprintJS__default = /*#__PURE__*/_interopDefaultLegacy(FingerprintJS);
var CryptoES__default = /*#__PURE__*/_interopDefaultLegacy(CryptoES);
var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);
var generateSecretKey__default = /*#__PURE__*/_interopDefaultLegacy(generateSecretKey);

class SecureStorage {
  static browserFingerPrint;
  _encrypt = CryptoES__default["default"].AES.encrypt;
  _decrypt = CryptoES__default["default"].AES.decrypt;
  _isInitialized = false;
  _storage = window?.localStorage ?? localStorage;
  _encryptionSecret = {
    expires: 90
  };
  config = {
    encodingType: EncodingType_ts.EncodingType.AES,
    storageNamespace: "secure"
  };
  constructor(config) {
    this.setConfig(config);
    this.setCryptoMethods();
  }
  initAsync = async () => {
    if (this._encryptionSecret.key !== void 0) {
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
    } catch (e) {
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
    if (typeof value !== "string") {
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
      throw new Error("Secure Storage: Is not initialized.");
    }
  }
  throwIfKeyIsUndefined(key) {
    if (!key) {
      throw new Error("Secure Storage: a key must be provided.");
    }
  }
  setEncryptionSecret(salt) {
    if (!SecureStorage.browserFingerPrint) {
      throw new Error("Secure Storage: Browser finger print is not set.");
    }
    if (!salt) {
      const secret = generateSecretKey__default["default"](SecureStorage.browserFingerPrint);
      this.setSaltToSecurePlace(secret);
      this._encryptionSecret.key = secret.key;
      Object.freeze(this._encryptionSecret);
      return;
    }
    this._encryptionSecret.key = generateSecretKey.generateSecretKeyWithSalt(SecureStorage.browserFingerPrint, salt).key;
    Object.freeze(this._encryptionSecret);
  }
  setSaltToSecurePlace(secret) {
    Cookies__default["default"].set(this.metaKey, secret.salt, {
      secure: true,
      sameSite: "Strict",
      expires: this._encryptionSecret.expires
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
    if (config?.encryptionSecret !== void 0) {
      this._encryptionSecret = config.encryptionSecret;
      if (this._encryptionSecret.key) {
        Object.freeze(this._encryptionSecret);
      }
    }
  }
  setCryptoMethods() {
    switch (this.config.encodingType) {
      case EncodingType_ts.EncodingType.TDES:
        this._encrypt = CryptoES__default["default"].TripleDES.encrypt;
        this._decrypt = CryptoES__default["default"].TripleDES.decrypt;
        break;
      case EncodingType_ts.EncodingType.DES:
        this._encrypt = CryptoES__default["default"].DES.encrypt;
        this._decrypt = CryptoES__default["default"].DES.decrypt;
        break;
      case EncodingType_ts.EncodingType.Rabbit:
        this._encrypt = CryptoES__default["default"].Rabbit.encrypt;
        this._decrypt = CryptoES__default["default"].Rabbit.decrypt;
        break;
      case EncodingType_ts.EncodingType.RC4:
        this._encrypt = CryptoES__default["default"].RC4.encrypt;
        this._decrypt = CryptoES__default["default"].RC4.decrypt;
        break;
      case EncodingType_ts.EncodingType.AES:
        this._encrypt = CryptoES__default["default"].AES.encrypt;
        this._decrypt = CryptoES__default["default"].AES.decrypt;
        break;
    }
  }
}
class SecureStorageFactory {
  generateSecretKeyWithSalt = generateSecretKey.generateSecretKeyWithSalt;
  async createAsync(config) {
    const secureStorage = new SecureStorage(config);
    await secureStorage.initAsync();
    return {
      clear: secureStorage.clear,
      setItem: secureStorage.setItem,
      getItem: secureStorage.getItem,
      removeItem: secureStorage.removeItem
    };
  }
}
var index = new SecureStorageFactory();

module.exports = index;
//# sourceMappingURL=secure-storage.cjs.js.map
