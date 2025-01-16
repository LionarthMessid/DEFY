"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitOrder = void 0;
const utils_1 = require("../utils");
const eip712_1 = require("./eip712");
const constants_1 = require("../constants");
const utils_2 = require("./utils");
const parser_1 = require("./parser");
class LimitOrder {
    constructor(orderInfo, interactions) {
        this.makerAsset = orderInfo.makerAsset;
        this.takerAsset = orderInfo.takerAsset;
        this.makingAmount = orderInfo.makingAmount;
        this.takingAmount = orderInfo.takingAmount;
        this.salt = orderInfo.salt || (0, utils_2.buildSalt)();
        this.from = orderInfo.maker;
        this.allowedSender = orderInfo.allowedSender || constants_1.ZERO_ADDRESS;
        this.receiver = orderInfo.receiver || constants_1.ZERO_ADDRESS;
        this.makerAssetData = (interactions === null || interactions === void 0 ? void 0 : interactions.makerAssetData) || constants_1.ZX;
        this.takerAssetData = (interactions === null || interactions === void 0 ? void 0 : interactions.takerAssetData) || constants_1.ZX;
        this.getMakingAmount = (interactions === null || interactions === void 0 ? void 0 : interactions.getMakingAmount) || constants_1.ZX;
        this.getTakingAmount = (interactions === null || interactions === void 0 ? void 0 : interactions.getTakingAmount) || constants_1.ZX;
        this.predicate = (interactions === null || interactions === void 0 ? void 0 : interactions.predicate) || constants_1.ZX;
        this.permit = (interactions === null || interactions === void 0 ? void 0 : interactions.permit) || constants_1.ZX;
        this.preInteraction = (interactions === null || interactions === void 0 ? void 0 : interactions.preInteraction) || constants_1.ZX;
        this.postInteraction = (interactions === null || interactions === void 0 ? void 0 : interactions.postInteraction) || constants_1.ZX;
    }
    static getOrderHash(order, domain = (0, eip712_1.getLimitOrderV3Domain)(1)) {
        return (0, eip712_1.getOrderHash)(LimitOrder.getTypedData(order, domain));
    }
    static getTypedData(order, domain = (0, eip712_1.getLimitOrderV3Domain)(1)) {
        return (0, eip712_1.buildOrderData)(domain.chainId, domain.verifyingContract, domain.name, domain.version, order);
    }
    static decode(struct) {
        const interactions = (0, parser_1.parseInteractions)(struct.offsets, struct.interactions);
        return new LimitOrder({
            makerAsset: struct.makerAsset,
            takerAsset: struct.takerAsset,
            maker: struct.maker,
            takingAmount: struct.takingAmount,
            makingAmount: struct.makingAmount,
            allowedSender: struct.allowedSender,
            receiver: struct.receiver,
            salt: struct.salt
        }, interactions);
    }
    build() {
        const allInteractions = [
            this.makerAssetData,
            this.takerAssetData,
            this.getMakingAmount,
            this.getTakingAmount,
            this.predicate,
            this.permit,
            this.preInteraction,
            this.postInteraction
        ];
        // https://stackoverflow.com/a/55261098/440168
        const cumulativeSum = ((sum) => (value) => {
            sum += value;
            return sum;
        })(0);
        const offsets = allInteractions
            .map((a) => a.length / 2 - 1)
            .map(cumulativeSum)
            .reduce((acc, a, i) => acc.add((0, utils_1.toBN)(a).shln(32 * i)), (0, utils_1.toBN)(0));
        const interactions = '0x' + allInteractions.map(utils_1.trim0x).join('');
        return {
            salt: this.salt,
            makerAsset: this.makerAsset,
            takerAsset: this.takerAsset,
            maker: this.from,
            receiver: this.receiver,
            allowedSender: this.allowedSender,
            makingAmount: this.makingAmount,
            takingAmount: this.takingAmount,
            offsets: offsets.toString(),
            interactions
        };
    }
    getTypedData(domain = (0, eip712_1.getLimitOrderV3Domain)(1)) {
        return (0, eip712_1.buildOrderData)(domain.chainId, domain.verifyingContract, domain.name, domain.version, this.build());
    }
    getOrderHash(domain = (0, eip712_1.getLimitOrderV3Domain)(1)) {
        return (0, eip712_1.getOrderHash)(this.getTypedData(domain));
    }
}
exports.LimitOrder = LimitOrder;
//# sourceMappingURL=limit-order.js.map