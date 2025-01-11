/**
 * @description
 * <span style='color:red;font-weight:bold'>格式化某个数据</span>
 * |方法名|参数|输出
 * |---|---|---|
 * |Format.money|(money金额本身, config配置)|number
 * |Format.tax|(tax税号本身)|string
 * @version 1.0.0
 */
export declare const Format: {
    /**
     * 金额转换
     * @param money 金额
     * @param config 配置
     * @param config.yuan 分转元
     * @param config.fen 元转分
     * @param config.precision 精度
     * @param config.affix 前缀
     * @param config.suffix 后缀
     * @returns
     */
    money: (money: any, config?: moneyConfig) => String | null | undefined;
    /**
     * 税号修正
     * @param taxnum 税号（纳税人识别号/纳税企业识别号）
     */
    tax: (taxnum: string) => string;
};
/**
 * 金额转换配置
 * @interface
 */
export interface moneyConfig {
    /** 保留几位小数 */
    precision?: number;
    /** 是否分转元 */
    yuan?: boolean;
    /** 是否元转分 */
    fen?: boolean;
    /** 前缀 */
    affix?: string;
    /** 后缀 */
    suffix?: string;
}
