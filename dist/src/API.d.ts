import API from './sdk/index';
/**
 * @category API
 * @description
 * <span style='color:red;font-weight:bold'>API</span>
 * 使用前需要在项目的请求文件中引入进行配置
 * ```js
 *  import { API } from "@fujica/utils"
 *  API.setStore({
 *    config: {
 *      baseURL: baseURL,
 *      tokenKey: "xxx-Token",
 *    },
 *  })
 *   ```
 * 方法名|输入|输出|备注
 * ---|---|---|---
 * API.getDict|'284'|[]|通过pid获取字典
 * @version 1.0.0
 */
export { API };
