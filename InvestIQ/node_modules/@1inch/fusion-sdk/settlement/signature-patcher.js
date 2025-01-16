"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchSignature = void 0;
const tslib_1 = require("tslib");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
function patchSignature(signature) {
    const isGnosisSafe = signature === '0x';
    if (isGnosisSafe) {
        return signature;
    }
    // with 0x (64 len)
    if (signature.length === 130) {
        return signature;
    }
    if (signature.length > 132) {
        return signature;
    }
    const sig = signature.substr(0, 130);
    const lastByte = signature.substr(130, 2);
    if (lastByte.toLowerCase() === '1b' || lastByte === '00') {
        return sig;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bnSig = new bn_js_1.default(sig.substring(2 + 64), 'hex').setn(255, true);
    return sig.substring(0, 2 + 64) + bnSig.toString('hex');
}
exports.patchSignature = patchSignature;
//# sourceMappingURL=signature-patcher.js.map