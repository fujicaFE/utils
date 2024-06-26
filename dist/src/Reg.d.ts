/**
 * @description
 * <span style='color:red;font-weight:bold'>通用正则校验</span>
 * |key|value|备注
 * |---|---|---
 * |Reg.phone|/^1\d{10}$/|手机号
 * |Reg.personName|/^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/|用户名
 * |Reg.longtitude|/^(\-\|\+)?(((\d\|[1-9]\d\|1[0-7]\d\|0{1,3})\.\d{0,15})\|(\d\|[1-9]\d\|1[0-7]\d\|0{1,3})\|180\.0{0,15}\|180)$/|经度
 * |Reg.latitude|/^(\-\|\+)?([0-8]?\d{1}\.\d{0,15}\|90\.0{0,15}\|[0-8]?\d{1}\|90)$/|纬度
 * |Reg.idCard|/^([1-6][1-9]\|50)\d{4}(18\|19\|20)\d{2}((0[1-9])\|10\|11\|12)(([0-2][1-9])\|10\|20\|30\|31)\d{3}[0-9Xx]$\|^([1-6][1-9]\|50)\d{4}\d{2}((0[1-9])\|10\|11\|12)(([0-2][1-9])\|10\|20\|30\|31)\d{3}$/|身份证
 * |Reg.taxnum|/^[A-Z0-9]{15,20}$/|税号
 */
export declare const Reg: {
    phone: RegExp;
    personName: RegExp;
    longtitude: RegExp;
    latitude: RegExp;
    idCard: RegExp;
    taxnum: RegExp;
};
