/**
 * @description
 * <span style='color:red;font-weight:bold'>el-form校验rules.item</span>
 */
export declare const ElFormValidator: {
    /**
   * 生成数字校验器
   * @param {number} precision 小数位数
   * @param {*} span 取值范围
   * @param {*} bound 边界取值（开区间OR闭区间）
   * @returns
   */
    number: (precision?: number, span?: number[], bound?: number[]) => (rule: any, value: any, callback: any) => any;
    /**
    * 生成用户名/姓名校验器
    * @param {*} span 位数范围
    * @returns
    */
    username: (span: any) => (rule: any, value: any, callback: any) => any;
};
