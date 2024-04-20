import { getDict } from './getDict';
import { getConfig } from './getConfig';
declare const modules: {
    getDict: typeof getDict;
    getConfig: typeof getConfig;
};
export default modules;
export type TModules = typeof modules;
