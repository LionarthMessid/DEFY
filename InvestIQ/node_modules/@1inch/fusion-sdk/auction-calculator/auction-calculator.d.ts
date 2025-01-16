import { AuctionPoint, AuctionSuffix } from '../auction-suffix';
import { LimitOrderV3Struct } from '../limit-order';
import { AuctionSalt } from '../auction-salt';
export declare class AuctionCalculator {
    private readonly startTime;
    private readonly duration;
    private readonly initialRateBump;
    private readonly points;
    private readonly takerFeeRatio;
    constructor(startTime: number, duration: number, initialRateBump: number, points: AuctionPoint[], takerFeeRatio: string);
    static fromLimitOrderV3Struct(order: LimitOrderV3Struct): AuctionCalculator;
    static fromAuctionData(suffix: AuctionSuffix, salt: AuctionSalt): AuctionCalculator;
    calcAuctionTakingAmount(takingAmount: string, rate: number): string;
    /**
     * @see https://github.com/1inch/limit-order-settlement/blob/3c7cf9eacbaf7a60624d7a6f069c59d809f2204a/contracts/libraries/OrderSuffix.sol#L75
     * @param time auction timestamp in seconds
     */
    calcRateBump(time: number): number;
}
