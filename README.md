# Secure Storage

[![npm version](https://img.shields.io/npm/v/@xzar90/secure-storage.svg)](https://www.npmjs.com/package/@xzar90/secure-storage) [![npm](https://img.shields.io/npm/dm/@xzar90/secure-storage.svg)](https://www.npmjs.com/package/@xzar90/secure-storage)
[![Publish](https://github.com/XzaR90/secure-storage/actions/workflows/publish.yml/badge.svg)](https://github.com/XzaR90/secure-storage/actions/workflows/publish.yml)
[![CodeQL](https://github.com/XzaR90/secure-storage/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/XzaR90/secure-storage/actions/workflows/codeql-analysis.yml)

Secure Storage a secure way to store localStorage data with high level of encryption.

A fork of [softvar/secure-ls](https://github.com/softvar/secure-ls), this library does not include compression and all the interfaces are changed.
The library use fingerprint and secure cookie to store the encryption key. It does not expose the keys to the console. If you use custom key you must enclose it yourself.

## Features

-   Secure data with various types of encryption including `AES`, `TDES`, `DES`, `Rabbit` and `RC4`. (defaults to `AES` encoding).
-   Advanced API wrapper over `localStorage` API, providing other basic utilities.

## Installation

```
npm install @xzar90/secure-storage
```

## Usage

```ts
import { SecureStorage } from '@xzar90/secure-storage';

const secureStorage = await SecureStorage.createAsync({}); //default settings
//{
//    encodingType: 'aes',              //  aes | tdes | des | rabbit | rc4
//    encryptionSecret: {
//      key: undefined,                 //  Leave empty to generate random which is
//      expires: 90                     //  stored in a secure cookie for 90 days.
//    },
//    storageNamespace: 'secure'        //  the value which is used to track all
//                                          storage keys.
//}

secureStorage.clear(); //Clear all the values from storageNamespace
secureStorage.setItem(key, value);
secureStorage.getItem(key);
secureStorage.removeItem(key);
```

You cannot change settings once you have created a instance of SecureStorage.

## Scripts

-   `npm run build` - produces production version of the library under the `dist` folder

## Contributing

1. Fork the repo on GitHub.

## Copyright and license

> The [MIT license](https://opensource.org/licenses/MIT) (MIT)
>
> Copyright (c) 2022 Josh Gomez
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
