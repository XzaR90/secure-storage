export interface ISecureStorage {
    /**
     * Clear all the values from storageNamespace
     */
    clear: () => void;
    setItem: <T>(key: string, value: T) => void;
    getItem: <T>(key: string) => T | null;
    removeItem: (key: string) => void;
}
