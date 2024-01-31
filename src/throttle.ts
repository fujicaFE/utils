import debounce from './debounce.js';
import isObject from './isObject.js';
/**
 * 节流方法
 * @param func 执行函数
 * @param wait 等待时长
 * @param options 配置
 * @returns 节流执行的函数
 */
export function throttle(func, wait, options) {
    let leading = true;
    let trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait,
    });
}
