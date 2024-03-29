/** SDK工具类 */
declare class SDK {
    /**
     * @group SDK
     */
    private _engine;
    _modules: any;
    store: any;
    request: Function;
    get: Function;
    post: Function;
    setStore: Function;
    constructor(engine: any);
}
export type TSdk = typeof SDK;
export default SDK;
