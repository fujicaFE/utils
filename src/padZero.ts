/**
 * @description
 * <span style='color:red;font-weight:bold'>向 < 10 的整形数值进行补 0</span>
 * |输入值|输出
 * |---|---|
 * |6|'06'
 * @param {number} number
 * @returns {string} 返回补上0的字符串（不需要补0的直接返回字符串）
 * @version 1.0.0
 */
export function padZero(n: number) {
  if (!Number.isInteger(n)) {
      return n
  }
  return (n < 10 ? `0${n}` : String(n))
}
