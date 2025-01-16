"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredicateFactory = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const utils_1 = require("../utils");
class PredicateFactory {
    /**
     * @param deadline timestamp in seconds (order expiration time)
     */
    static timestampBelow(deadline) {
        const timeHex = bignumber_1.BigNumber.from(deadline)
            .toHexString()
            .substring(2)
            .padStart(64, '0');
        return (0, utils_1.add0x)(PredicateFactory.TIMESTAMP_BELOW_SELECTOR) + timeHex;
    }
    /**
     * @param address limit order creator address
     * @param nonce sequence number for order cancellation
     * @param deadline timestamp in seconds (order expiration time)
     */
    static timestampBelowAndNonceEquals(address, nonce, deadline) {
        const timeNonceAccountHex = (0, utils_1.toBN)(address)
            .or((0, utils_1.toBN)(nonce).shln(160))
            .or((0, utils_1.toBN)(deadline).shln(208))
            .toString('hex')
            .padStart(64, '0');
        return ((0, utils_1.add0x)(PredicateFactory.TIMESTAMP_BELOW_AND_NONCE_EQUALS_SELECTOR) +
            timeNonceAccountHex);
    }
    /**
     * @param predicate predicate field from parsed order's interactions
     * @returns {number} expiration time in seconds in case it exists in predicate
     */
    static parseExpirationTime(predicate) {
        if (predicate.includes(PredicateFactory.TIMESTAMP_BELOW_SELECTOR)) {
            const dataAfterSelector = predicate.split(PredicateFactory.TIMESTAMP_BELOW_SELECTOR)[1];
            const deadlineSec = bignumber_1.BigNumber.from('0x' + dataAfterSelector.substring(0, 64)).toString();
            return +deadlineSec;
        }
        if (predicate.includes(PredicateFactory.TIMESTAMP_BELOW_AND_NONCE_EQUALS_SELECTOR)) {
            const dataAfterSelector = predicate.split(PredicateFactory.TIMESTAMP_BELOW_AND_NONCE_EQUALS_SELECTOR)[1];
            const funcData = '0x' + dataAfterSelector.substring(0, 64);
            const info = (0, utils_1.toBN)(funcData);
            const dateSec = info.shrn(160 + (208 - 160)).toString();
            return +dateSec;
        }
        return null;
    }
}
exports.PredicateFactory = PredicateFactory;
/**
 * timestampBelow(uint256)
 */
PredicateFactory.TIMESTAMP_BELOW_SELECTOR = '63592c2b';
/**
 * timestampBelowAndNonceEquals(uint256 timeNonceAccount)
 */
PredicateFactory.TIMESTAMP_BELOW_AND_NONCE_EQUALS_SELECTOR = '2cc2878d';
//# sourceMappingURL=predicate-factory.js.map