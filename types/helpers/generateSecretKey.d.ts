export declare const generateSecretKeyWithSalt: (secretPhrase: string, saltAsHex?: string | undefined) => {
    key: string;
    salt: string;
};
declare const generateSecretKey: (secretPhrase: string) => {
    key: string;
    salt: string;
};
export default generateSecretKey;
