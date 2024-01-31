export declare const Format: {
    money: (money: number, config: moneyConfig) => string | number;
};
export interface moneyConfig {
    precision?: number;
    fenToYuan?: boolean;
    affix?: string;
}
