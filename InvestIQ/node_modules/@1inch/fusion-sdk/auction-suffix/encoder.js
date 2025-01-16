"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeFlags = exports.encodeTakingFeeData = exports.encodePublicResolvingDeadline = exports.encodeWhitelist = exports.encodeAuctionParams = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
function encodeAuctionParams(points) {
    return points
        .map(({ delay, coefficient }) => delay.toString(16).padStart(4, '0') +
        coefficient.toString(16).padStart(6, '0'))
        .join('');
}
exports.encodeAuctionParams = encodeAuctionParams;
function encodeWhitelist(whitelist) {
    return whitelist
        .map(({ address, allowance }) => allowance.toString(16).padStart(8, '0') + (0, utils_1.trim0x)(address))
        .join('');
}
exports.encodeWhitelist = encodeWhitelist;
function encodePublicResolvingDeadline(deadline) {
    return deadline.toString(16).padStart(8, '0');
}
exports.encodePublicResolvingDeadline = encodePublicResolvingDeadline;
function encodeTakingFeeData(takerFeeReceiver = constants_1.ZERO_ADDRESS, takerFeeRatio = constants_1.ZERO_NUMBER) {
    if (takerFeeReceiver === constants_1.ZERO_ADDRESS || takerFeeRatio === constants_1.ZERO_NUMBER) {
        return '';
    }
    return (bignumber_1.BigNumber.from(takerFeeRatio)
        .toHexString()
        .substring(2)
        .padStart(24, '0') + (0, utils_1.trim0x)(takerFeeReceiver));
}
exports.encodeTakingFeeData = encodeTakingFeeData;
function encodeFlags(whitelist, points, takingFeeData) {
    if (points.length > 8) {
        throw new Error('max points count = 8');
    }
    let flags = (whitelist.length << 3) | points.length;
    if (takingFeeData !== '') {
        flags |= 0x80;
    }
    return flags.toString(16).padStart(2, '0');
}
exports.encodeFlags = encodeFlags;
//# sourceMappingURL=encoder.js.map