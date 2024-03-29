/**
 * @description
 * <span style='color:red;font-weight:bold'>通过检测设备UA判断是否是移动端设备</span>
 * |输入值|输出
 * |---|---|
 * |'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'|true
 * @param {number} userAgent 可以手动传入UA
 * @returns {boolean} 是否是移动端设备
 * @version 1.0.0
 */
export declare function isMobileByUa(userAgent?: string): boolean;
