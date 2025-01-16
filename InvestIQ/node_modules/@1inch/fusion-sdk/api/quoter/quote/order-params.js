"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionOrderParams = void 0;
const types_1 = require("../types");
const constants_1 = require("../../../constants");
class FusionOrderParams {
    constructor(params) {
        this.preset = types_1.PresetEnum.fast;
        this.receiver = constants_1.ZERO_ADDRESS;
        if (params.preset) {
            this.preset = params.preset;
        }
        if (params.receiver) {
            this.receiver = params.receiver;
        }
        this.nonce = params.nonce;
        this.permit = params.permit;
    }
    static new(params) {
        return new FusionOrderParams(params || {});
    }
}
exports.FusionOrderParams = FusionOrderParams;
//# sourceMappingURL=order-params.js.map