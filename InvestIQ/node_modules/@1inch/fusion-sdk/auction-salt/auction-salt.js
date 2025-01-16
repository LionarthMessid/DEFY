"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionSalt = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const utils_1 = require("../utils");
const parser_1 = require("./parser");
const rand_1 = require("./rand");
class AuctionSalt {
    constructor(auction) {
        if (auction.salt && parser_1.SALT_MASK.lt((0, utils_1.toBN)(auction.salt))) {
            throw new Error('salt should be less 18 bytes');
        }
        this.salt = auction.salt || (0, rand_1.randomIntString)(5);
        this.auctionStartTime = auction.auctionStartTime;
        this.initialRateBump = auction.initialRateBump;
        this.duration = auction.duration;
        this.bankFee = auction.bankFee;
    }
    static decode(salt) {
        return new AuctionSalt({
            salt: (0, parser_1.getSalt)(salt).toString(),
            auctionStartTime: (0, parser_1.getStartTime)(salt).toNumber(),
            duration: (0, parser_1.getDuration)(salt).toNumber(),
            bankFee: (0, parser_1.getFee)(salt).toString(),
            initialRateBump: (0, parser_1.getInitialRateBump)(salt).toNumber()
        });
    }
    build() {
        const res = (0, utils_1.toBN)(this.auctionStartTime).toString('hex').padStart(8, '0') +
            (0, utils_1.toBN)(this.duration).toString('hex').padStart(6, '0') +
            (0, utils_1.toBN)(this.initialRateBump).toString('hex').padStart(6, '0') +
            (0, utils_1.toBN)(this.bankFee).toString('hex').padStart(8, '0') +
            (0, utils_1.toBN)(this.salt).toString('hex').padStart(36, '0');
        (0, assert_1.default)(res.length === 64, 'Some inputs were out of allowed ranges');
        return (0, utils_1.toBN)('0x' + res).toString();
    }
}
exports.AuctionSalt = AuctionSalt;
//# sourceMappingURL=auction-salt.js.map