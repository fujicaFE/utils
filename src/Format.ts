import { Calc } from "./Calc"
/**
 * @description
 * <span style='color:red;font-weight:bold'>格式化某个数据</span>
 * |方法名|参数|输出
 * |---|---|---|
 * |Format.money|(money金额本身, config配置)|number
 * |Format.tax|(tax税号本身)|string
 * @version 1.0.0
 */
export const Format = {
  /**
   * 金额转换
   * @param money 金额
   * @param config 配置
   * @returns
   */
  money: (money: number, config: moneyConfig) => {
    if (config.fenToYuan) money = Calc.divide(money, 1000)
    if (config.precision || config.precision === 0) {
      money.toFixed(config.precision)
    }
    if (config.affix) {
      return config.affix + String(money)
    } else {
      return money
    }
  },
  /**
   * 税号修正
   * @param taxnum 税号（纳税人识别号/纳税企业识别号）
   */
  tax: (taxnum) => {
    return taxnum.toUpperCase().replace(/[^A-Z0-9]/g, '')
  }
}

/**
 * 金额转换配置
 * @interface
 */
export interface moneyConfig {
  /** 保留几位小数 */
  precision?: number,
  /** 是否分转元 */
  fenToYuan?: boolean,
  /** 前缀 */
  affix?: string,
}