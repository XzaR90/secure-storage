"use strict";var e=require("@fingerprintjs/fingerprintjs"),t=require("crypto-es"),r=require("js-cookie");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i,a=n(e),o=n(t),c=n(r);function s(e,t,r,n,i,a,o){try{var c=e[a](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,i)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var a=e.apply(t,r);function o(e){s(a,n,i,o,c,"next",e)}function c(e){s(a,n,i,o,c,"throw",e)}o(void 0)}))}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t,r){return t&&l(e.prototype,t),r&&l(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}!function(e){e.AES="aes",e.DES="des",e.Rabbit="rabbit",e.RC4="rc4"}(i||(i={}));var d=function(e,t){var r=o.default.lib.WordArray.random(16);return t&&(r=o.default.enc.Hex.parse(t)),{key:g(e,r),salt:r.toString(o.default.enc.Hex)}},g=function(e,t){var r=o.default.PBKDF2(e,t,{keySize:4});return null==r?void 0:r.toString()},h=function(){function e(t){var r,n,c=this;f(this,e),p(this,"_encrypt",o.default.AES.encrypt),p(this,"_decrypt",o.default.AES.decrypt),p(this,"_isInitialized",!1),p(this,"_storage",null!==(r=null===(n=window)||void 0===n?void 0:n.localStorage)&&void 0!==r?r:localStorage),p(this,"_encryptionSecret",void 0),p(this,"config",{encodingType:i.AES,storageNamespace:"secure"}),p(this,"initAsync",u(regeneratorRuntime.mark((function t(){var r,n,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0===c._encryptionSecret){t.next=3;break}return c._isInitialized=!0,t.abrupt("return");case 3:if(e.browserFingerPrint){t.next=12;break}return t.next=6,a.default.load();case 6:return r=t.sent,t.next=9,r.get();case 9:n=t.sent,e.browserFingerPrint=n.visitorId,Object.freeze(e.browserFingerPrint);case 12:i=c.getSaltOrDefaultFromSecurePlace(),c.setEncryptionSecret(i),c._isInitialized=!0;case 15:case"end":return t.stop()}}),t)})))),p(this,"clear",(function(){for(var e=0;e<c._storage.length;e++){var t=c._storage.key(e);null!=t&&t.startsWith("".concat(c.config.storageNamespace,"."))&&c._storage.removeItem(t)}})),p(this,"getItem",(function(e){c.throwIfNotInitialized(),e=c.getNamespaceKey(e);var t=c._storage.getItem(e);if(null===t)return null;var r=c._decrypt(t,c._encryptionSecret).toString(o.default.enc.Utf8);try{return JSON.parse(r)}catch(e){return r}})),p(this,"removeItem",(function(e){e=c.getNamespaceKey(e),c._storage.removeItem(e)})),p(this,"setItem",(function(e,t){c.throwIfNotInitialized(),e=c.getNamespaceKey(e);var r=t;"string"!=typeof t&&(r=JSON.stringify(t));var n=c._encrypt(r,c._encryptionSecret);c._storage.setItem(e,n.toString())})),p(this,"getNamespaceKey",(function(e){return c.throwIfKeyIsUndefined(e),"".concat(c.config.storageNamespace,".").concat(e)})),this.setConfig(t),this.setCryptoMethods()}return y(e,[{key:"metaKey",get:function(){return"".concat(this.config.storageNamespace,"_metaKey")}},{key:"throwIfNotInitialized",value:function(){if(!this._isInitialized)throw new Error("Secure Storage: Is not initialized.")}},{key:"throwIfKeyIsUndefined",value:function(e){if(!e)throw new Error("Secure Storage: a key must be provided.")}},{key:"setEncryptionSecret",value:function(t){if(!e.browserFingerPrint)throw new Error("Secure Storage: Browser finger print is not set.");if(!t){var r=(n=e.browserFingerPrint,d(n));return this.setSaltToSecurePlace(r),this._encryptionSecret=r.key,void Object.freeze(this._encryptionSecret)}var n;this._encryptionSecret=d(e.browserFingerPrint,t).key,Object.freeze(this._encryptionSecret)}},{key:"setSaltToSecurePlace",value:function(e){c.default.set(this.metaKey,e.salt,{secure:!0,sameSite:"Strict"})}},{key:"getSaltOrDefaultFromSecurePlace",value:function(){return c.default.get(this.metaKey)}},{key:"setConfig",value:function(e){var t,r;this.config.encodingType=null!==(t=null==e?void 0:e.encodingType)&&void 0!==t?t:this.config.encodingType,this.config.storageNamespace=null!==(r=null==e?void 0:e.storageNamespace)&&void 0!==r?r:this.config.storageNamespace,void 0!==(null==e?void 0:e.encryptionSecret)&&(this._encryptionSecret=e.encryptionSecret,Object.freeze(this._encryptionSecret))}},{key:"setCryptoMethods",value:function(){switch(this.config.encodingType){case i.DES:this._encrypt=o.default.DES.encrypt,this._decrypt=o.default.DES.decrypt;break;case i.Rabbit:this._encrypt=o.default.Rabbit.encrypt,this._decrypt=o.default.Rabbit.decrypt;break;case i.RC4:this._encrypt=o.default.RC4.encrypt,this._decrypt=o.default.RC4.decrypt;break;case i.AES:this._encrypt=o.default.AES.encrypt,this._decrypt=o.default.AES.decrypt}}}]),e}();p(h,"browserFingerPrint",void 0);var v=function(){function e(){f(this,e)}var t;return y(e,null,[{key:"createAsync",value:(t=u(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new h(t),e.next=3,r.initAsync();case 3:return e.abrupt("return",{clear:r.clear,setItem:r.setItem,getItem:r.getItem,removeItem:r.removeItem});case 4:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})}]),e}();module.exports=v;
