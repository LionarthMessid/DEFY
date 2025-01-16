"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyingContract = exports.LimitOrderV3TypeDataVersion = exports.LimitOrderV3TypeDataName = exports.Order = exports.EIP712Domain = void 0;
const constants_1 = require("../../constants");
exports.EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
];
exports.Order = [
    { name: 'salt', type: 'uint256' },
    { name: 'makerAsset', type: 'address' },
    { name: 'takerAsset', type: 'address' },
    { name: 'maker', type: 'address' },
    { name: 'receiver', type: 'address' },
    { name: 'allowedSender', type: 'address' },
    { name: 'makingAmount', type: 'uint256' },
    { name: 'takingAmount', type: 'uint256' },
    { name: 'offsets', type: 'uint256' },
    { name: 'interactions', type: 'bytes' }
];
exports.LimitOrderV3TypeDataName = '1inch Aggregation Router';
exports.LimitOrderV3TypeDataVersion = '5';
exports.VerifyingContract = constants_1.ONE_INCH_ROUTER_V5;
//# sourceMappingURL=domain.js.map