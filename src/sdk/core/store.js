import deepClone from '../utils/deepClone'

const store = {
  uid: '',
  appId: '',
  config: {
    baseURL: '',
    tokenKey: '',
  },
  env: 'prod',
  debug: false,
  dict: {}, // 字典数据缓存
}
export const setStore = (obj = {}) => {
  if (store.debug) {
    console.group('更新store')
    console.log('更新前：')
    console.table(deepClone(store))
  }
  for (const key in obj) {
    store[key] = obj[key]
  }
  if (store.debug) {
    console.log('更新后：')
    console.table(deepClone(store))
    console.groupEnd()
  }
}

export default store
