/**
 * qs方法，处理形如a=1&b=2格式的query字符串。
 * 包含qs.stringify和qs.parse, 分别进行序列化和反序列化。
 */
declare const _default: {
    /**
     * query字符串反序列化
     * @param str query字符串
     * @returns 解析的对象
     */
    parse: (str?: string) => any;
    /**
     * 对象序列化为query字符串
     * @param obj 参数对象
     * @returns query字符串
     */
    stringify: (obj?: {}) => string;
};
export default _default;
