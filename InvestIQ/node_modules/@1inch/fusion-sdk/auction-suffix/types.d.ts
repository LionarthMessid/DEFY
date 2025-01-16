export declare type AuctionPoint = {
    delay: number;
    coefficient: number;
};
export declare type AuctionWhitelistItem = {
    address: string;
    allowance: number;
};
export declare type SettlementSuffixData = {
    points: AuctionPoint[];
    whitelist: AuctionWhitelistItem[];
    publicResolvingDeadline?: number;
    fee?: TakingFee;
};
export declare type TakingFee = {
    takingFeeRatio: string;
    takingFeeReceiver: string;
};
