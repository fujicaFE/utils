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
   * @param config.yuan 分转元
   * @param config.fen 元转分
   * @param config.precision 精度
   * @param config.affix 前缀
   * @param config.suffix 后缀
   * @returns
   */
  money: (money: number, config: moneyConfig): String | null | undefined => {
    // 预处理
    if (config.yuan && config.precision == null) config = Object.assign({ precision: 2, yuan: true }, config) // 默认精度2
    else if (config.fen && config.precision == null) config = Object.assign({ precision: 0, fen: true }, config) // 默认精度0
    if (money == null) return money as null
    let moneyStr = money + ''
    // 分元转换
    if (config.yuan) moneyStr = Calc.divide(moneyStr, 1000)
    else if (config.fen) moneyStr = Calc.times(moneyStr, 1000)
    // 精度控制
    if (config.precision || config.precision === 0) {
      moneyStr = parseFloat(moneyStr).toFixed(config.precision) + ''
    }
    // 前后缀
    if (config.affix) moneyStr = config.affix + String(moneyStr)
    if (config.suffix) moneyStr = String(moneyStr) + config.suffix
    return moneyStr
  },
  /**
   * 税号修正
   * @param taxnum 税号（纳税人识别号/纳税企业识别号）
   */
  tax: (taxnum: string) => {
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
  yuan?: boolean,
  /** 是否元转分 */
  fen?: boolean,
  /** 前缀 */
  affix?: string,
  /** 后缀 */
  suffix?: string,
}