export declare const Reg: {
    phone: RegExp;
    personname: RegExp;
    longtitude: RegExp;
    latitude: RegExp;
};
export declare const elFormValidator: {
    number: (precision?: number, span?: number[], bound?: number[]) => (rule: any, value: any, callback: any) => any;
    username: (span: any) => (rule: any, value: any, callback: any) => any;
};
