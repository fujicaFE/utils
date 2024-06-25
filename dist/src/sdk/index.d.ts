import './utils/polyfill';
import SDK from './core/sdk';
declare const _default: {
    getDict: typeof import("./modules/getDict").getDict;
    getConfig: typeof import("./modules/getConfig").getConfig;
} & SDK;
export default _default;
