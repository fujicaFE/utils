import store from "../core/store"

/**
 * @description
 * <span style='color:red;font-weight:bold'>通过Pid获取字典</span>
 * |输入值|输出
 * |---|---|
 * |'284'|[]|
 * @param {number} pid 字典pid
 * @returns {string} 返回对应字典
 * @version 1.0.0
 */
export async function getDict(pid: number | string, params, options: Object = {}) {
  if (store.dict[pid]?.length) return store.dict[pid] // 有缓存取缓存
  const res = await this.get(`/dict/getDictByPid/${pid}`, params, options) // 没有从接口拿
  if (res.success) {
    store.dict[pid] = res.data
    return res.data
  } else {
    return Promise.reject()
  }
}
