/**
 * @description
 * <span style='color:red;font-weight:bold'>通用正则校验</span>
 * |key|reg
 * |---|---|
 * |phone|/^1\d{10}$/
 * |personname|/^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/
 */
export const RegExp = {
  phone: /^1\d{10}$/,
  personname: /^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/,
}
