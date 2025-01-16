"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preset = void 0;
const auction_salt_1 = require("../../auction-salt");
class Preset {
    constructor(preset) {
        this.auctionDuration = preset.auctionDuration;
        this.startAuctionIn = preset.startAuctionIn;
        this.bankFee = preset.bankFee;
        this.initialRateBump = preset.initialRateBump;
        this.auctionStartAmount = preset.auctionStartAmount;
        this.auctionEndAmount = preset.auctionEndAmount;
        this.tokenFee = preset.tokenFee;
        this.points = preset.points;
    }
    createAuctionSalt(additionalWaitPeriod = 0) {
        return new auction_salt_1.AuctionSalt({
            duration: this.auctionDuration,
            auctionStartTime: this.calcAuctionStartTime(additionalWaitPeriod),
            initialRateBump: this.initialRateBump,
            bankFee: this.bankFee
        });
    }
    calcAuctionStartTime(additionalWaitPeriod = 0) {
        return (Math.floor(Date.now() / 1000) +
            additionalWaitPeriod +
            this.startAuctionIn);
    }
}
exports.Preset = Preset;
//# sourceMappingURL=preset.js.map