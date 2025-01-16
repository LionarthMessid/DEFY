"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settlement = void 0;
const encoders_1 = require("./encoders");
class Settlement {
    constructor(config) {
        this.config = config;
    }
    static new(config) {
        return new Settlement(config);
    }
    encodeSettleOrders(
    // sorted by: orders[0] executes first, orders[orders.length - 1] executes last
    orders, resolverExecutionBytes) {
        const data = this.encodeSettleOrdersParam(orders, resolverExecutionBytes);
        return (0, encoders_1.encodeSettleOrders)(data);
    }
    encodeSettleOrdersParam(
    // sorted by: orders[0] executes first, orders[orders.length - 1] executes last
    orders, resolverExecutionBytes) {
        const finalActionBytes = (0, encoders_1.buildResolveOrdersBytes)(this.config.settlementContract, this.config.resolverContract, resolverExecutionBytes);
        const interaction = orders
            .slice(1)
            .reverse()
            .reduce((acc, fillParams) => {
            return (0, encoders_1.buildRecursiveFillInteraction)(this.config.settlementContract, Object.assign(Object.assign({}, fillParams), { interaction: acc }));
        }, finalActionBytes);
        return (0, encoders_1.encodeSettleOrdersParam)(Object.assign(Object.assign({}, orders[0]), { interaction }));
    }
}
exports.Settlement = Settlement;
//# sourceMappingURL=settlement.js.map