"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomIntString = void 0;
const utils_1 = require("../utils");
function randomIntString(length) {
    const bytes = new Uint8Array(length);
    const result = [];
    const charset = '0123456789';
    const cryptoObj = (0, utils_1.getCrypto)();
    if (!cryptoObj) {
        throw new Error("Can't find crypto object");
    }
    const random = cryptoObj.getRandomValues(bytes);
    for (let a = 0; a < random.length; a++) {
        if (a === 0) {
            result.push(charset[(random[a] % (charset.length - 1)) + 1]);
        }
        else {
            result.push(charset[random[a] % charset.length]);
        }
    }
    return result.join('');
}
exports.randomIntString = randomIntString;
//# sourceMappingURL=rand.js.map