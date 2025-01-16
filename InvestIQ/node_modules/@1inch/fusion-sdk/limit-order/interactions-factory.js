"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsFactory = void 0;
const constants_1 = require("../constants");
class InteractionsFactory {
    static unwrap(wethUnwrapper, receiverAddress) {
        // in case maker == receiver address, we don't need to add the address
        if (receiverAddress === constants_1.ZERO_ADDRESS) {
            return wethUnwrapper;
        }
        return wethUnwrapper + receiverAddress.substring(2);
    }
}
exports.InteractionsFactory = InteractionsFactory;
//# sourceMappingURL=interactions-factory.js.map