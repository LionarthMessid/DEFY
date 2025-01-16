"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeNonce = exports.encodeNonce = void 0;
const tslib_1 = require("tslib");
const web3_eth_abi_1 = tslib_1.__importDefault(require("web3-eth-abi"));
const constants_1 = require("./constants");
const utils_1 = require("../utils");
function encodeNonce(address) {
    return (0, utils_1.add0x)(`${constants_1.NONCE_SELECTOR}${address.substring(2).padStart(64, '0')}`);
}
exports.encodeNonce = encodeNonce;
function decodeNonce(nonceHex) {
    return web3_eth_abi_1.default.decodeParameter('uint256', nonceHex).toString();
}
exports.decodeNonce = decodeNonce;
//# sourceMappingURL=utils.js.map