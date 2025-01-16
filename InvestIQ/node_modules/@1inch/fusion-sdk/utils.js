"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrypto = exports.add0x = exports.trim0x = exports.toBN = exports.toSec = exports.isNativeCurrency = void 0;
const tslib_1 = require("tslib");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const constants_1 = require("./constants");
const isNativeCurrency = (address) => address.toLowerCase() === constants_1.NATIVE_CURRENCY;
exports.isNativeCurrency = isNativeCurrency;
function toSec(time) {
    const t = time instanceof Date ? time.getTime() : time;
    return Math.floor(+t / 1000);
}
exports.toSec = toSec;
function toBN(val) {
    if (typeof val === 'number') {
        if (!Number.isSafeInteger(val)) {
            throw new Error('integer is not safe');
        }
        return new bn_js_1.default(val);
    }
    if (val.startsWith('0x')) {
        return new bn_js_1.default(trim0x(val), 'hex');
    }
    return new bn_js_1.default(val);
}
exports.toBN = toBN;
function trim0x(data) {
    if (data.startsWith('0x')) {
        return data.substring(2);
    }
    return data;
}
exports.trim0x = trim0x;
function add0x(data) {
    if (data.includes('0x')) {
        return data;
    }
    return '0x' + data;
}
exports.add0x = add0x;
function getCrypto() {
    if (typeof window !== 'undefined') {
        return window.crypto;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('crypto').webcrypto;
    }
}
exports.getCrypto = getCrypto;
//# sourceMappingURL=utils.js.map