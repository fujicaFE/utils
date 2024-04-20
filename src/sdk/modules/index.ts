import { getDict } from './getDict'
import { getConfig } from './getConfig'

const modules = {
  getDict,
  getConfig
}

export default modules

export type TModules = typeof modules
