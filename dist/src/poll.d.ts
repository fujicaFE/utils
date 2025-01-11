/**
 * @description
 * <span style='color:red;font-weight:bold'>轮询</span>
 * |输入值|输出
 * |---|---|
 * |6|'06'
 * @template T 返回值的类型
 * @param {Object} options 配置选项
 * @param {() => Promise<T>} options.requestFn 要执行的异步请求函数
 * @param {number} options.interval 每次轮询的间隔时间（毫秒）
 * @param {number} [options.maxRetries=Infinity] 最大重试次数（默认无限重试）
 * @param {(error: any, attempt: number) => void} [options.onError] 异常处理回调，每次请求失败时调用
 * @param {(result: T) => boolean} [options.stopCondition] 停止轮询的条件，返回 `true` 停止轮询
 * @returns {Promise<T>} 返回一个 Promise，当满足停止条件或达到最大重试次数时解析或拒绝
 *
 * @example
 * // 简单轮询直到满足条件
 * poll({
 *   requestFn: async () => Math.random(),
 *   interval: 1000,
 *   stopCondition: (result) => result > 0.8,
 * }).then((result) => console.log('Polling stopped:', result));
 *
 * @example
 * // 带最大重试次数和错误处理
 * poll({
 *   requestFn: async () => {
 *     if (Math.random() < 0.7) throw new Error('Failed');
 *     return Math.random();
 *   },
 *   interval: 2000,
 *   maxRetries: 5,
 *   onError: (error, attempt) => console.error(`Attempt ${attempt} failed:`, error),
 * }).catch((error) => console.error('Polling failed:', error));
 */
export type PollingOptions<T> = {
    requestFn: () => Promise<T>;
    interval: number;
    maxRetries?: number;
    onError?: (error: any, attempt: number) => void;
    stopCondition?: (result: T) => boolean;
};
export declare const poll: <T>({ requestFn, interval, maxRetries, onError, stopCondition, }: PollingOptions<T>) => Promise<T>;
