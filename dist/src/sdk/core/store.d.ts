export function setStore(obj?: {}): void;
export default store;
declare namespace store {
    const uid: string;
    const appId: string;
    namespace config {
        const baseURL: string;
        const tokenKey: string;
    }
    const env: string;
    const debug: boolean;
    const dict: {};
    const systemConfig: {};
}
