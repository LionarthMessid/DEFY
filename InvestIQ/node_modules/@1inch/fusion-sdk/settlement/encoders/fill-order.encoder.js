"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeFillOrder = void 0;
const tslib_1 = require("tslib");
const web3_eth_contract_1 = tslib_1.__importDefault(require("web3-eth-contract"));
const AggregationRouterV5_abi_json_1 = tslib_1.__importDefault(require("../../abi/AggregationRouterV5.abi.json"));
const signature_patcher_1 = require("../signature-patcher");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const limitOrderV3 = new web3_eth_contract_1.default(AggregationRouterV5_abi_json_1.default);
function encodeFillOrder(params) {
    return limitOrderV3.methods
        .fillOrderTo(params.order, (0, signature_patcher_1.patchSignature)(params.signature), params.interaction, params.makingAmount, params.takingAmount, params.thresholdAmount, params.target)
        .encodeABI();
}
exports.encodeFillOrder = encodeFillOrder;
//# sourceMappingURL=fill-order.encoder.js.map