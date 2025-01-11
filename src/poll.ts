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
  requestFn: () => Promise<T>; // 要执行的异步请求函数
  interval: number; // 每次轮询的间隔时间（毫秒）
  maxRetries?: number; // 最大重试次数（可选）
  onError?: (error: any, attempt: number) => void; // 异常处理回调
  stopCondition?: (result: T) => boolean; // 停止轮询的条件（返回 true 停止）
};

export const poll = <T>({
  requestFn,
  interval,
  maxRetries = Infinity,
  onError,
  stopCondition,
}: PollingOptions<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const executeRequest = async () => {
      try {
        const result = await requestFn(); // 执行请求函数
        attempts++;

        // 如果满足停止条件，则停止轮询
        if (stopCondition?.(result)) {
          resolve(result);
          return;
        }

        // 如果未达到最大重试次数，则继续轮询
        if (attempts < maxRetries) {
          setTimeout(executeRequest, interval);
        } else {
          reject(new Error(`Polling exceeded max retries: ${maxRetries}`));
        }
      } catch (error) {
        attempts++;
        onError?.(error, attempts);

        // 如果未达到最大重试次数，则继续轮询
        if (attempts < maxRetries) {
          setTimeout(executeRequest, interval);
        } else {
          reject(error); // 超过最大重试次数时抛出错误
        }
      }
    };

    executeRequest();
  });
}
