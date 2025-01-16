"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalt = exports.getFee = exports.getInitialRateBump = exports.getDuration = exports.getStartTime = void 0;
const utils_1 = require("../../utils");
const bignumber_1 = require("@ethersproject/bignumber");
const constants_1 = require("./constants");
function getStartTime(salt) {
    const val = (0, utils_1.toBN)(salt).and(constants_1.TIME_START_MASK).shrn(constants_1.TIME_START_SHIFT);
    return bignumber_1.BigNumber.from(val.toString());
}
exports.getStartTime = getStartTime;
function getDuration(salt) {
    const val = (0, utils_1.toBN)(salt).and(constants_1.DURATION_MASK).shrn(constants_1.DURATION_SHIFT);
    return bignumber_1.BigNumber.from(val.toString());
}
exports.getDuration = getDuration;
function getInitialRateBump(salt) {
    const val = (0, utils_1.toBN)(salt)
        .and(constants_1.INITIAL_RATE_BUMP_MASK)
        .shrn(constants_1.INITIAL_RATE_BUMP_SHIFT);
    return bignumber_1.BigNumber.from(val.toString());
}
exports.getInitialRateBump = getInitialRateBump;
function getFee(salt) {
    const val = (0, utils_1.toBN)(salt).and(constants_1.FEE_MASK).shrn(constants_1.FEE_SHIFT);
    return bignumber_1.BigNumber.from(val.toString());
}
exports.getFee = getFee;
function getSalt(salt) {
    const val = (0, utils_1.toBN)(salt).and(constants_1.SALT_MASK);
    return bignumber_1.BigNumber.from(val.toString());
}
exports.getSalt = getSalt;
//# sourceMappingURL=parser.js.map