"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bpsToRatioFormat = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const constants_1 = require("../constants");
function bpsToRatioFormat(bps) {
    if (!bps) {
        return constants_1.ZERO_NUMBER;
    }
    return bignumber_1.BigNumber.from(bps).mul(100000).toString();
}
exports.bpsToRatioFormat = bpsToRatioFormat;
//# sourceMappingURL=utils.js.map