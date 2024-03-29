import TSdk from './sdk';
import TModules from '../modules';
type TProxy = typeof TModules & TSdk;
/**
 * sdk实例
 * 调用sdk[模块名][方法名]
 */
declare const getProxy: (sdk: any) => TProxy;
export default getProxy;
