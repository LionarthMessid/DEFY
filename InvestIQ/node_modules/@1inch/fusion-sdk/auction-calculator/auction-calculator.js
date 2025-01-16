"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionCalculator = void 0;
const auction_suffix_1 = require("../auction-suffix");
const auction_salt_1 = require("../auction-salt");
const bignumber_1 = require("@ethersproject/bignumber");
const calc_1 = require("./calc");
const constants_1 = require("./constants");
class AuctionCalculator {
    constructor(startTime, duration, initialRateBump, points, takerFeeRatio) {
        this.startTime = startTime;
        this.duration = duration;
        this.initialRateBump = initialRateBump;
        this.points = points;
        this.takerFeeRatio = takerFeeRatio;
    }
    static fromLimitOrderV3Struct(order) {
        const suffix = auction_suffix_1.AuctionSuffix.decode(order.interactions);
        const salt = auction_salt_1.AuctionSalt.decode(order.salt);
        return AuctionCalculator.fromAuctionData(suffix, salt);
    }
    static fromAuctionData(suffix, salt) {
        return new AuctionCalculator(salt.auctionStartTime, salt.duration, salt.initialRateBump, suffix.points, suffix.takerFeeRatio);
    }
    calcAuctionTakingAmount(takingAmount, rate) {
        const auctionTakingAmount = bignumber_1.BigNumber.from(takingAmount)
            .mul(bignumber_1.BigNumber.from(rate).add(constants_1.RATE_BUMP_DENOMINATOR))
            .div(constants_1.RATE_BUMP_DENOMINATOR);
        if (this.takerFeeRatio === '0') {
            return auctionTakingAmount.toString();
        }
        return auctionTakingAmount
            .add(auctionTakingAmount
            .mul(this.takerFeeRatio)
            .div(auction_suffix_1.CONTRACT_TAKER_FEE_PRECISION))
            .toString();
    }
    /**
     * @see https://github.com/1inch/limit-order-settlement/blob/3c7cf9eacbaf7a60624d7a6f069c59d809f2204a/contracts/libraries/OrderSuffix.sol#L75
     * @param time auction timestamp in seconds
     */
    calcRateBump(time) {
        let cumulativeTime = bignumber_1.BigNumber.from(this.startTime);
        const lastTime = bignumber_1.BigNumber.from(this.duration).add(cumulativeTime);
        const startBump = bignumber_1.BigNumber.from(this.initialRateBump);
        const currentTime = bignumber_1.BigNumber.from(time);
        if (currentTime.lte(cumulativeTime)) {
            return this.initialRateBump;
        }
        else if (currentTime.gte(lastTime)) {
            return 0;
        }
        let prevCoefficient = startBump;
        let prevCumulativeTime = cumulativeTime;
        for (let i = this.points.length - 1; i >= 0; i--) {
            const { coefficient, delay } = this.points[i];
            cumulativeTime = cumulativeTime.add(delay);
            const coefficientBN = bignumber_1.BigNumber.from(coefficient);
            if (cumulativeTime.gt(currentTime)) {
                const rate = (0, calc_1.linearInterpolation)(prevCumulativeTime, cumulativeTime, prevCoefficient, coefficientBN, currentTime);
                return rate.toNumber();
            }
            prevCumulativeTime = cumulativeTime;
            prevCoefficient = coefficientBN;
        }
        const rate = (0, calc_1.linearInterpolation)(prevCumulativeTime, lastTime, prevCoefficient, bignumber_1.BigNumber.from(0), currentTime);
        return rate.toNumber();
    }
}
exports.AuctionCalculator = AuctionCalculator;
//# sourceMappingURL=auction-calculator.js.map