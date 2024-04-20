import store from "../core/store"

/**
 * @description
 * <span style='color:red;font-weight:bold'>通过Code获取系统配置</span>
 * |输入值|输出
 * |---|---|
 * |'loginShowEyeIcon'|[]|
 * @param {string} pid 系统配置code
 * @returns {string} 返回对应系统配置内容
 * @version 1.0.0
 */
export async function getConfig(code: string, params, options: Object = {}) {
  if (store.systemConfig[code]?.length) return store.systemConfig[code] // 有缓存取缓存
  const res = await this.get(`/tparameters/systemConfig?codes=${code}`, params, options) // 没有从接口拿
  if (res.success) {
    store.systemConfig[code] = res.data
    return res.data
  } else {
    return Promise.reject()
  }
}
