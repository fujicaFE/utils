/**
 * 日期格式化
 * @param date 原始日期时间，毫秒或字符串，如'2022-02-02'
 * @param fmt 要输出的日期时间格式，默认值'YYYY-MM-dd HH:mm:ss'，[Yy]+年 M+月, [Dd]+日, h+12小时，H+24小时，m+分，s+秒，q+季度，S毫秒， E+星期
 * @returns 格式化后的日期时间
 */
export default function (date: any, fmt?: string): string;
