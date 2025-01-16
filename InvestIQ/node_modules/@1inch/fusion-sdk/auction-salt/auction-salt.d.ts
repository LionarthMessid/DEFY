import { AuctionSaltData } from './types';
export declare class AuctionSalt {
    readonly auctionStartTime: number;
    readonly initialRateBump: number;
    readonly duration: number;
    readonly bankFee: string;
    readonly salt: string;
    constructor(auction: AuctionSaltData);
    static decode(salt: string): AuctionSalt;
    build(): string;
}
