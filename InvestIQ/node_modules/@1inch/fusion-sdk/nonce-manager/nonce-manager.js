"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonceManager = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("./utils");
const constants_1 = require("../constants");
class NonceManager {
    constructor(config) {
        this.config = config;
    }
    static new(config) {
        return new NonceManager(config);
    }
    /**
     * @param maker string, address of maker
     */
    getNonce(maker) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const encodedCall = (0, utils_1.encodeNonce)(maker);
            const nonceHex = yield this.config.provider.ethCall(this.config.limitOrderProtocolContract || constants_1.ONE_INCH_ROUTER_V5, encodedCall);
            return (0, utils_1.decodeNonce)(nonceHex);
        });
    }
}
exports.NonceManager = NonceManager;
//# sourceMappingURL=nonce-manager.js.map