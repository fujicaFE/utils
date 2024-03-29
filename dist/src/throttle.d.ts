/**
 * 节流方法
 * @param func 执行函数
 * @param wait 等待时长
 * @param options 配置
 * @returns 节流执行的函数
 */
export declare function throttle(func: any, wait: any, options: any): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
