/**
 * @description
 * <span style='color:red;font-weight:bold'>通用正则校验</span>
 * |key|reg
 * |---|---|
 * |phone|/^1\d{10}$/
 * |personname|/^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/
 */
export const Reg = {
  phone: /^1\d{10}$/, // 手机号
  personname: /^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/, // 姓名
  longtitude: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/, // 经度
  latitude: /^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/ // 维度
}

export const elFormValidator = {
  /**
 * 生成数字校验器
 * @param {number} precision 小数位数
 * @param {*} span 取值范围
 * @param {*} bound 边界取值（开区间OR闭区间）
 * @returns
 */
  number: (precision = 2, span = [0, 99999999.99], bound = [0, 1]) => {
    return (rule, value, callback) => {
      // console.log(`output->value, span[0]`, bound, value, span[0], span[1])
      let numReg = /^-?\d+$/
      if (precision) numReg = new RegExp(
        `^(([1-9][0-9]*)|(([0]\\.\\d{1,${precision}}|[1-9][0-9]*\\.\\d{1,${precision}})))$`)

      if (isNaN(value)) {
        return callback(new Error(`仅允许输入数字`))
      }

      // 整数非0开头
      const zeroNumReg = new RegExp(`^((0{2,})|(0[1-9]{1,}))`)
      if (zeroNumReg.test(value)) {
        return callback(new Error(`请输入正确的格式(非0开头)`))
      }

      // 区间
      let boundaryValid = (value > span[0] && value < span[1]) // 左开右开
      if (bound[0] && bound[1]) boundaryValid = (value >= span[0] && value <= span[1]) // 左闭右闭
      else if (bound[0]) boundaryValid = (value > span[0] && value <= span[1]) // 左开右闭（默认）
      else if (bound[1]) boundaryValid = (value >= span[0] && value < span[1]) // 左闭右开
      if (!boundaryValid) {
        return callback(new Error(`请输入${span[0]}~${span[1]}范围内${precision != 0 ? '数字' : '整数'}`))
      } else if (!numReg.test(value)) {
        return callback(new Error(precision != 0 ? `最多支持${precision}位小数` : `请输入${span[0]}~${span[1]}范围内整数`))
      } else {
        callback()
      }
    }
  },
  /**
  * 生成用户名/姓名校验器
  * @param {*} span 位数范围
  * @returns
  */
  username: (span) => {
    return (rule, value, callback) => { // 中文字母数字
      const regExp = new RegExp(`^[\\u4E00-\\u9FA5A-Za-z0-9·]{${span[0]},${span[1]}}$`)
      if (!value) return callback() // 非必填
      if (regExp.test(value)) {
        callback()
      } else {
        return callback(new Error(`请输入${span[0]}~${span[1]}位的中文/字母/数字`))
      }
    }
  }
}