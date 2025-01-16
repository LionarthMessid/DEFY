"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionSuffix = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const encoder_1 = require("./encoder");
const constants_2 = require("./constants");
const parser_1 = require("./parser");
class AuctionSuffix {
    constructor(suffix) {
        var _a, _b;
        this.points = suffix.points;
        this.whitelist = suffix.whitelist;
        this.publicResolvingDeadline =
            suffix.publicResolvingDeadline || (0, utils_1.toSec)(constants_2.NoPublicResolvingDeadline);
        this.takerFeeReceiver = ((_a = suffix === null || suffix === void 0 ? void 0 : suffix.fee) === null || _a === void 0 ? void 0 : _a.takingFeeReceiver) || constants_1.ZERO_ADDRESS;
        this.takerFeeRatio = ((_b = suffix === null || suffix === void 0 ? void 0 : suffix.fee) === null || _b === void 0 ? void 0 : _b.takingFeeRatio) || constants_1.ZERO_NUMBER;
    }
    static decode(interactions) {
        const suffix = (0, parser_1.parseInteractionsSuffix)(interactions);
        return new AuctionSuffix({
            publicResolvingDeadline: suffix.publicResolvingDeadline,
            points: suffix.points,
            fee: {
                takingFeeReceiver: suffix.takerFeeReceiver,
                takingFeeRatio: suffix.takerFeeRatio
            },
            whitelist: suffix.whitelist
        });
    }
    build() {
        const auctionParams = (0, encoder_1.encodeAuctionParams)(this.points);
        const whitelist = (0, encoder_1.encodeWhitelist)(this.whitelist);
        const publicResolving = (0, encoder_1.encodePublicResolvingDeadline)(this.publicResolvingDeadline);
        const takingFeeData = (0, encoder_1.encodeTakingFeeData)(this.takerFeeReceiver, this.takerFeeRatio);
        const flags = (0, encoder_1.encodeFlags)(this.whitelist, this.points, takingFeeData);
        return (auctionParams + whitelist + publicResolving + takingFeeData + flags);
    }
}
exports.AuctionSuffix = AuctionSuffix;
//# sourceMappingURL=auction-suffix.js.map