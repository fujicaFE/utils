import Big from 'big.js'
/**
 * @description
 * <span style='color:red;font-weight:bold'>高精度四则运算</span>
 * |方法名|参数|输出
 * |---|---|---|
 * |Calc.plus|(a, b)|a + b
 * |Calc.minus|(a, b)|a - b
 * |Calc.times|(a, b)|a * b
 * |Calc.divide|(a, b)|a / b
 * @version 1.0.0
 */
export const Calc = {
  plus: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.plus(b).toNumber()
  },
  minus: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.minus(b).toNumber()
  },
  times: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.times(b).toNumber()
  },
  divide: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.div(b).toNumber()
  },
}
