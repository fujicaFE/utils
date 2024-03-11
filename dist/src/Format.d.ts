export declare const Format: {
    money: (money: number, config: moneyConfig) => string | number;
    tax: (taxnum: any) => any;
};
export interface moneyConfig {
    precision?: number;
    fenToYuan?: boolean;
    affix?: string;
}
