/**
 * @description
 * <span style='color:red;font-weight:bold'>格式化某个数据</span>
 * |方法名|参数|输出
 * |---|---|---|
 * |Format.money|(money金额本身, fenToYuan是否分转元, affix前缀)|Number
 * @version 1.0.0
 */
import { Calc } from "./Calc"
export const Format = {
  money: (money, fenToYuan, affix = '') => {
    if (fenToYuan) money = Calc.divide(money, 1000)
    if (affix) {
      return affix + money
    } else {
      return money
    }
  }
}
