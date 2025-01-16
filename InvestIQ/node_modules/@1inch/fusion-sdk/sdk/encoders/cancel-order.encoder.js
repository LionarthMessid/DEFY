"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCancelOrder = void 0;
const tslib_1 = require("tslib");
const web3_eth_contract_1 = tslib_1.__importDefault(require("web3-eth-contract"));
const AggregationRouterV5_abi_json_1 = tslib_1.__importDefault(require("../../abi/AggregationRouterV5.abi.json"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const limitOrderV3 = new web3_eth_contract_1.default(AggregationRouterV5_abi_json_1.default);
function encodeCancelOrder(params) {
    return limitOrderV3.methods.cancelOrder(params).encodeABI();
}
exports.encodeCancelOrder = encodeCancelOrder;
//# sourceMappingURL=cancel-order.encoder.js.map