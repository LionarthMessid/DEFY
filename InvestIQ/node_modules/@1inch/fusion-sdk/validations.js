"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAmount = exports.isValidAddress = void 0;
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const bignumber_1 = require("@ethersproject/bignumber");
function isValidAddress(address) {
    return web3_1.default.utils.isAddress(address);
}
exports.isValidAddress = isValidAddress;
function isValidAmount(value) {
    try {
        const amount = bignumber_1.BigNumber.from(value);
        return amount.gt(0);
    }
    catch (e) {
        return false;
    }
}
exports.isValidAmount = isValidAmount;
//# sourceMappingURL=validations.js.map