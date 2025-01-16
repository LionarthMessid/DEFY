"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRecursiveFillInteraction = exports.buildResolveOrdersBytes = exports.encodeSettleOrdersParam = exports.encodeSettleOrders = void 0;
const tslib_1 = require("tslib");
const web3_eth_abi_1 = tslib_1.__importDefault(require("web3-eth-abi"));
const constants_1 = require("./constants");
const utils_1 = require("../../utils");
const fill_order_encoder_1 = require("./fill-order.encoder");
function encodeSettleOrders(data) {
    data = data.substring(2);
    const len = data.length;
    const offset = '20'.padStart(64, '0');
    const bytesLenHex = (len / 2).toString(16).padStart(64, '0');
    if (len % 64 === 0) {
        return constants_1.SETTLE_ORDERS_SELECTOR + offset + bytesLenHex + data;
    }
    return (constants_1.SETTLE_ORDERS_SELECTOR +
        offset +
        bytesLenHex +
        data.padEnd(len + (64 - (len % 64)), '0'));
}
exports.encodeSettleOrders = encodeSettleOrders;
function encodeSettleOrdersParam(params) {
    const encodedOrder = (0, fill_order_encoder_1.encodeFillOrder)(params).substring(10);
    const offsetLen = 64;
    const bytesLenLen = 64;
    const dataParam = (0, utils_1.trim0x)(web3_eth_abi_1.default.encodeParameters(['bytes'], [(0, utils_1.add0x)(encodedOrder)]));
    const bytesLen = parseInt(dataParam.substring(offsetLen, offsetLen + bytesLenLen), 16);
    return ('0x' +
        dataParam.substring(offsetLen + bytesLenLen, offsetLen + bytesLenLen + bytesLen * 2));
}
exports.encodeSettleOrdersParam = encodeSettleOrdersParam;
function buildResolveOrdersBytes(settlementContract, resolverContract, executionBytes) {
    return (settlementContract +
        '01' +
        (0, utils_1.trim0x)(resolverContract) +
        (0, utils_1.trim0x)(executionBytes));
}
exports.buildResolveOrdersBytes = buildResolveOrdersBytes;
function buildRecursiveFillInteraction(settlementContract, params) {
    return settlementContract + '00' + (0, fill_order_encoder_1.encodeFillOrder)(params).substring(10);
}
exports.buildRecursiveFillInteraction = buildRecursiveFillInteraction;
//# sourceMappingURL=settlement.encoder.js.map