import { AuctionPoint, AuctionWhitelistItem, SettlementSuffixData } from './types';
export declare class AuctionSuffix {
    readonly points: AuctionPoint[];
    readonly whitelist: AuctionWhitelistItem[];
    readonly publicResolvingDeadline: number;
    readonly takerFeeReceiver: string;
    readonly takerFeeRatio: string;
    constructor(suffix: SettlementSuffixData);
    static decode(interactions: string): AuctionSuffix;
    build(): string;
}
