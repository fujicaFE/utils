import Big from 'big.js'

export const Calc = {
  plus: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.plus(b).toNumber()
  },
  minus: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.minus(b).toNumber()
  },
  divide: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.div(b).toNumber()
  },
  times: (a: Number | String, b: Number | String) => {
    const temp = new Big(a)
    return temp.times(b).toNumber()
  },
}
