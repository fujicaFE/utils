import store from "../core/store"

/**
 * @description
 * <span style='color:red;font-weight:bold'>通过typeCode获取字典</span>
 * |输入值|输出
 * |---|---|
 * |'parkType'|[]|
 * @param {number} typeCode 字典typeCode
 * @returns {string} 返回对应字典
 * @version 1.0.0
 */
export async function getDict(typeCode: number | string, params, options: Object = {}) {
  if (store.dict[typeCode]?.length) return store.dict[typeCode] // 有缓存取缓存
  const res = await this.get(`/sys/dictdetail/valid/${typeCode}`, params, options) // 没有从接口拿
  if (res.success) {
    store.dict[typeCode] = res.data
    return res.data
  } else {
    return Promise.reject()
  }
}
