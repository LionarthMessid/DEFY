"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSalt = void 0;
function buildSalt() {
    return Math.round(Math.random() * Date.now()) + '';
}
exports.buildSalt = buildSalt;
//# sourceMappingURL=utils.js.map