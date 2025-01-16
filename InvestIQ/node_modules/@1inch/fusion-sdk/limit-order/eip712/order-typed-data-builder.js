"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitOrderV3Domain = exports.domainSeparator = exports.buildOrderData = exports.getOrderHash = void 0;
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const domain_1 = require("./domain");
function getOrderHash(data) {
    return ('0x' +
        eth_sig_util_1.TypedDataUtils.eip712Hash(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data, eth_sig_util_1.SignTypedDataVersion.V4).toString('hex'));
}
exports.getOrderHash = getOrderHash;
function buildOrderData(chainId, verifyingContract, name, version, order) {
    return {
        primaryType: 'Order',
        types: { EIP712Domain: domain_1.EIP712Domain, Order: domain_1.Order },
        domain: { name, version, chainId, verifyingContract },
        message: order
    };
}
exports.buildOrderData = buildOrderData;
function domainSeparator(name, version, chainId, verifyingContract) {
    return ('0x' +
        eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', { name, version, chainId, verifyingContract }, { EIP712Domain: domain_1.EIP712Domain }, eth_sig_util_1.SignTypedDataVersion.V4).toString('hex'));
}
exports.domainSeparator = domainSeparator;
function getLimitOrderV3Domain(chainId) {
    return {
        name: domain_1.LimitOrderV3TypeDataName,
        version: domain_1.LimitOrderV3TypeDataVersion,
        chainId,
        verifyingContract: domain_1.VerifyingContract
    };
}
exports.getLimitOrderV3Domain = getLimitOrderV3Domain;
//# sourceMappingURL=order-typed-data-builder.js.map