import { AuctionPoint, PresetData } from './types';
import { AuctionSalt } from '../../auction-salt';
export declare class Preset {
    readonly auctionDuration: number;
    readonly startAuctionIn: number;
    readonly bankFee: string;
    readonly initialRateBump: number;
    readonly auctionStartAmount: string;
    readonly auctionEndAmount: string;
    readonly tokenFee: string;
    readonly points: AuctionPoint[];
    constructor(preset: PresetData);
    createAuctionSalt(additionalWaitPeriod?: number): AuctionSalt;
    calcAuctionStartTime(additionalWaitPeriod?: number): number;
}
