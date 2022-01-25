import e from"@fingerprintjs/fingerprintjs";import t from"crypto-es";import r from"js-cookie";function n(e,t,r,n,i,o,c){try{var a=e[o](c),s=a.value}catch(e){return void r(e)}a.done?t(s):Promise.resolve(s).then(n,i)}function i(e){return function(){var t=this,r=arguments;return new Promise((function(i,o){var c=e.apply(t,r);function a(e){n(c,i,o,a,s,"next",e)}function s(e){n(c,i,o,a,s,"throw",e)}a(void 0)}))}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&c(e.prototype,t),r&&c(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u;!function(e){e.AES="aes",e.DES="des",e.Rabbit="rabbit",e.RC4="rc4"}(u||(u={}));var f=function(e,r){var n=t.lib.WordArray.random(16);return r&&(n=t.enc.Hex.parse(r)),{key:p(e,n),salt:n.toString(t.enc.Hex)}},p=function(e,r){var n=t.PBKDF2(e,r,{keySize:4});return null==n?void 0:n.toString()},y=function(){function n(r){var c,a,f=this;o(this,n),s(this,"_encrypt",t.AES.encrypt),s(this,"_decrypt",t.AES.decrypt),s(this,"_isInitialized",!1),s(this,"_storage",null!==(c=null===(a=window)||void 0===a?void 0:a.localStorage)&&void 0!==c?c:localStorage),s(this,"_encryptionSecret",void 0),s(this,"config",{encodingType:u.AES,storageNamespace:"secure"}),s(this,"initAsync",i(regeneratorRuntime.mark((function t(){var r,i,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0===f._encryptionSecret){t.next=3;break}return f._isInitialized=!0,t.abrupt("return");case 3:if(n.browserFingerPrint){t.next=12;break}return t.next=6,e.load();case 6:return r=t.sent,t.next=9,r.get();case 9:i=t.sent,n.browserFingerPrint=i.visitorId,Object.freeze(n.browserFingerPrint);case 12:o=f.getSaltOrDefaultFromSecurePlace(),f.setEncryptionSecret(o),f._isInitialized=!0;case 15:case"end":return t.stop()}}),t)})))),s(this,"clear",(function(){for(var e=0;e<f._storage.length;e++){var t=f._storage.key(e);null!=t&&t.startsWith("".concat(f.config.storageNamespace,"."))&&f._storage.removeItem(t)}})),s(this,"getItem",(function(e){f.throwIfNotInitialized(),e=f.getNamespaceKey(e);var r=f._storage.getItem(e);if(null===r)return null;var n=f._decrypt(r,f._encryptionSecret).toString(t.enc.Utf8);try{return JSON.parse(n)}catch(e){return n}})),s(this,"removeItem",(function(e){e=f.getNamespaceKey(e),f._storage.removeItem(e)})),s(this,"setItem",(function(e,t){f.throwIfNotInitialized(),e=f.getNamespaceKey(e);var r=t;"string"!=typeof t&&(r=JSON.stringify(t));var n=f._encrypt(r,f._encryptionSecret);f._storage.setItem(e,n.toString())})),s(this,"getNamespaceKey",(function(e){return f.throwIfKeyIsUndefined(e),"".concat(f.config.storageNamespace,".").concat(e)})),this.setConfig(r),this.setCryptoMethods()}return a(n,[{key:"metaKey",get:function(){return"".concat(this.config.storageNamespace,"_metaKey")}},{key:"throwIfNotInitialized",value:function(){if(!this._isInitialized)throw new Error("Secure Storage: Is not initialized.")}},{key:"throwIfKeyIsUndefined",value:function(e){if(!e)throw new Error("Secure Storage: a key must be provided.")}},{key:"setEncryptionSecret",value:function(e){if(!n.browserFingerPrint)throw new Error("Secure Storage: Browser finger print is not set.");if(!e){var t=(r=n.browserFingerPrint,f(r));return this.setSaltToSecurePlace(t),this._encryptionSecret=t.key,void Object.freeze(this._encryptionSecret)}var r;this._encryptionSecret=f(n.browserFingerPrint,e).key,Object.freeze(this._encryptionSecret)}},{key:"setSaltToSecurePlace",value:function(e){r.set(this.metaKey,e.salt,{secure:!0,sameSite:"Strict"})}},{key:"getSaltOrDefaultFromSecurePlace",value:function(){return r.get(this.metaKey)}},{key:"setConfig",value:function(e){var t,r;this.config.encodingType=null!==(t=null==e?void 0:e.encodingType)&&void 0!==t?t:this.config.encodingType,this.config.storageNamespace=null!==(r=null==e?void 0:e.storageNamespace)&&void 0!==r?r:this.config.storageNamespace,void 0!==(null==e?void 0:e.encryptionSecret)&&(this._encryptionSecret=e.encryptionSecret,Object.freeze(this._encryptionSecret))}},{key:"setCryptoMethods",value:function(){switch(this.config.encodingType){case u.DES:this._encrypt=t.DES.encrypt,this._decrypt=t.DES.decrypt;break;case u.Rabbit:this._encrypt=t.Rabbit.encrypt,this._decrypt=t.Rabbit.decrypt;break;case u.RC4:this._encrypt=t.RC4.encrypt,this._decrypt=t.RC4.decrypt;break;case u.AES:this._encrypt=t.AES.encrypt,this._decrypt=t.AES.decrypt}}}]),n}();s(y,"browserFingerPrint",void 0);var l=function(){function e(){o(this,e)}var t;return a(e,null,[{key:"createAsync",value:(t=i(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new y(t),e.next=3,r.initAsync();case 3:return e.abrupt("return",{clear:r.clear,setItem:r.setItem,getItem:r.getItem,removeItem:r.removeItem});case 4:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})}]),e}();export{l as default};
