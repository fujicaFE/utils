import './utils/polyfill';
import SDK from './core/sdk';
declare const _default: {
    test: {
        getList: typeof import("./modules/test/getList").default;
        getDetail: typeof import("./modules/test/getDetail").default;
    };
    getDict: typeof import("./modules/getDict").getDict;
} & SDK;
export default _default;
