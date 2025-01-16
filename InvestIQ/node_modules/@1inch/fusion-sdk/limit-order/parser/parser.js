"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInteractions = void 0;
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
function parseInteractions(offsets, interactions) {
    const offsetsBN = (0, utils_1.toBN)(offsets);
    const parsedInteractions = {};
    interactions = (0, utils_1.trim0x)(interactions);
    for (const interactionName in constants_1.DynamicField) {
        const field = interactionName;
        parsedInteractions[field] = parseInteractionForField(offsetsBN, interactions, constants_1.DynamicField[field]);
    }
    return parsedInteractions;
}
exports.parseInteractions = parseInteractions;
function parseInteractionForField(offsets, interactions, field) {
    const { fromByte, toByte } = getOffsetForInteraction(offsets, field);
    return '0x' + interactions.slice(fromByte * 2, toByte * 2);
}
function getOffsetForInteraction(offsets, field) {
    const fromByteBN = field === 0 ? '0' : offsets.shrn((field - 1) * 32).maskn(32);
    const toByteBN = offsets.shrn(field * 32).maskn(32);
    return {
        fromByte: parseInt(fromByteBN.toString()),
        toByte: parseInt(toByteBN.toString())
    };
}
//# sourceMappingURL=parser.js.map