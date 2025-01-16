"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFlags = exports.parseAuctionParams = exports.parseResolversWhitelist = exports.parsePrivateAuctionDeadline = exports.parseTakingFeeAndReturnRemainingInteractions = exports.minInteractionsLength = exports.parseInteractionsSuffix = void 0;
const constants_1 = require("./constants");
const bignumber_1 = require("@ethersproject/bignumber");
const constants_2 = require("../../constants");
const utils_1 = require("../../utils");
const errors_1 = require("./errors");
/**
 *    Order.interactions suffix structure:
 *    M*(1 + 3 bytes)  - auction points coefficients with seconds delays
 *    N*(4 + 20 bytes) - resolver with corresponding time limit
 *    4 bytes          - public time limit
 *    32 bytes         - taking fee (optional if flags has _HAS_TAKING_FEE_FLAG)
 *    1 byte           - flags
 * @param interactions
 */
function parseInteractionsSuffix(interactions) {
    const flags = parseFlags(interactions);
    if (interactions.length < minInteractionsLength(flags)) {
        throw new errors_1.BadOrderSuffixError('wrong interactions length');
    }
    const interactionsWithoutFlags = interactions.slice(0, -constants_1.FLAGS_LENGTH);
    const { takerFeeReceiver, takerFeeRatio, interactions: interactionsNoTakingFee } = parseTakingFeeAndReturnRemainingInteractions(flags, interactionsWithoutFlags);
    const { deadline, interactions: interactionsNoDeadline } = parsePrivateAuctionDeadline(interactionsNoTakingFee);
    const { whitelist, interactions: interactionsWithoutWhitelist } = parseResolversWhitelist(flags, interactionsNoDeadline);
    const { points } = parseAuctionParams(flags, interactionsWithoutWhitelist);
    return {
        whitelist,
        publicResolvingDeadline: deadline,
        takerFeeReceiver,
        takerFeeRatio,
        points
    };
}
exports.parseInteractionsSuffix = parseInteractionsSuffix;
function minInteractionsLength(flags) {
    const auctionPointsLen = flags.pointsCount * (constants_1.AUCTION_DELAY_LENGTH + constants_1.AUCTION_BUMP_LENGTH);
    const whitelistLen = flags.resolversCount * (constants_1.ALLOWED_TIMESTAMP_LENGTH + constants_1.ADDRESS_LENGTH);
    const requiredLength = auctionPointsLen +
        whitelistLen +
        constants_1.PRIVATE_AUCTION_DEADLINE_LENGTH +
        constants_1.FLAGS_LENGTH;
    if (flags.takingFeeEnabled) {
        return (requiredLength + constants_1.TAKER_FEE_RECEIVER_LENGTH + constants_1.TAKER_FEE_RATIO_LENGTH);
    }
    return requiredLength;
}
exports.minInteractionsLength = minInteractionsLength;
function parseTakingFeeAndReturnRemainingInteractions(flags, interactions) {
    if (!flags.takingFeeEnabled) {
        return {
            interactions,
            takerFeeReceiver: constants_2.ZERO_ADDRESS,
            takerFeeRatio: '0'
        };
    }
    const takerFeeDataLen = constants_1.TAKER_FEE_RECEIVER_LENGTH + constants_1.TAKER_FEE_RATIO_LENGTH;
    const takerFeeData = interactions.slice(-takerFeeDataLen);
    const takerFeeReceiverHex = takerFeeData.slice(constants_1.TAKER_FEE_RATIO_LENGTH);
    const takerFeeReceiver = (0, utils_1.add0x)(takerFeeReceiverHex);
    if (takerFeeReceiver === constants_2.ZERO_ADDRESS) {
        throw new errors_1.BadOrderSuffixError('takerFeeReceiver cannot be zero address');
    }
    const takerFeeRateHex = takerFeeData.slice(0, constants_1.TAKER_FEE_RATIO_LENGTH);
    const takerFeeRatio = bignumber_1.BigNumber.from((0, utils_1.add0x)(takerFeeRateHex));
    if (takerFeeRatio.gt(constants_1.CONTRACT_TAKER_FEE_PRECISION)) {
        throw new errors_1.BadOrderSuffixError('takerFeeRatio cannot be > 1e9');
    }
    return {
        interactions: interactions.slice(0, -takerFeeDataLen),
        takerFeeReceiver,
        takerFeeRatio: takerFeeRatio.toString()
    };
}
exports.parseTakingFeeAndReturnRemainingInteractions = parseTakingFeeAndReturnRemainingInteractions;
function parsePrivateAuctionDeadline(interactions) {
    const privateAuctionDeadlineHex = interactions.slice(-constants_1.PRIVATE_AUCTION_DEADLINE_LENGTH);
    const privateAuctionDeadline = Number.parseInt(privateAuctionDeadlineHex, 16);
    if (!privateAuctionDeadline) {
        throw new errors_1.BadOrderSuffixError(`Invalid public resolving deadline in interactions`);
    }
    return {
        deadline: privateAuctionDeadline,
        interactions: interactions.slice(0, -constants_1.PRIVATE_AUCTION_DEADLINE_LENGTH)
    };
}
exports.parsePrivateAuctionDeadline = parsePrivateAuctionDeadline;
function parseResolversWhitelist(flags, interactions) {
    const whitelist = [];
    const allowedTsAndResolverLen = constants_1.ADDRESS_LENGTH + constants_1.ALLOWED_TIMESTAMP_LENGTH;
    const addressesPacked = interactions.slice(-1 * flags.resolversCount * allowedTsAndResolverLen);
    if (addressesPacked.length % allowedTsAndResolverLen) {
        throw new errors_1.BadOrderSuffixError(`Invalid whitelist addresses in interactions`);
    }
    for (let i = 0; i < addressesPacked.length; i += allowedTsAndResolverLen) {
        const tsAndAddress = addressesPacked.slice(i, i + allowedTsAndResolverLen);
        const timestampHex = tsAndAddress.slice(0, constants_1.ALLOWED_TIMESTAMP_LENGTH);
        const address = tsAndAddress.slice(constants_1.ALLOWED_TIMESTAMP_LENGTH);
        const timestamp = Number.parseInt(timestampHex, 16);
        if (timestamp !== 0 && !timestamp) {
            throw new errors_1.BadOrderSuffixError(`Invalid resolver allowance timestamp`);
        }
        whitelist.push({
            address: (0, utils_1.add0x)(address).toLowerCase(),
            allowance: timestamp
        });
    }
    return {
        whitelist,
        interactions: interactions.slice(0, -(flags.resolversCount * allowedTsAndResolverLen))
    };
}
exports.parseResolversWhitelist = parseResolversWhitelist;
function parseAuctionParams(flags, interactions) {
    if (flags.pointsCount === 0) {
        return {
            interactions,
            points: []
        };
    }
    const points = [];
    const auctionParamsLength = constants_1.AUCTION_DELAY_LENGTH + constants_1.AUCTION_BUMP_LENGTH;
    const paramsPacked = interactions.slice(-1 * flags.pointsCount * auctionParamsLength);
    if (paramsPacked.length % auctionParamsLength) {
        throw new errors_1.BadOrderSuffixError(`Invalid auction params in interactions`);
    }
    for (let i = 0; i < paramsPacked.length; i += auctionParamsLength) {
        const durationAndBump = paramsPacked.slice(i, i + auctionParamsLength);
        const durationHex = durationAndBump.slice(0, constants_1.AUCTION_DELAY_LENGTH);
        const bumpHex = durationAndBump.slice(constants_1.AUCTION_DELAY_LENGTH);
        const duration = Number.parseInt(durationHex, 16);
        if (!duration) {
            throw new errors_1.BadOrderSuffixError(`Invalid auction point duration`);
        }
        const bump = Number.parseInt(bumpHex, 16);
        if (!bump) {
            throw new errors_1.BadOrderSuffixError(`Invalid auction point bump`);
        }
        points.push({ delay: duration, coefficient: bump });
    }
    return {
        points,
        interactions: interactions.slice(0, flags.pointsCount * auctionParamsLength)
    };
}
exports.parseAuctionParams = parseAuctionParams;
function parseFlags(interactions) {
    const flagsHex = interactions.slice(-constants_1.FLAGS_LENGTH);
    if (flagsHex.length < constants_1.FLAGS_LENGTH) {
        throw new errors_1.BadOrderSuffixError(`Invalid flags length`);
    }
    const flags = Number.parseInt(flagsHex, 16);
    if (!flags) {
        throw new errors_1.BadOrderSuffixError(`cannot parse flags`);
    }
    const resolversCount = (flags & constants_1.RESOLVERS_LENGTH_MASK) >> constants_1.RESOLVERS_LENGTH_OFFSET;
    if (resolversCount === 0) {
        throw new errors_1.BadOrderSuffixError(`cannot have 0 resolvers`);
    }
    const takingFeeEnabled = (flags & constants_1.HAS_TAKING_FEE_FLAG) !== 0;
    const pointsCount = flags & constants_1.POINTS_LENGTH_MASK;
    return {
        pointsCount,
        takingFeeEnabled,
        resolversCount
    };
}
exports.parseFlags = parseFlags;
//# sourceMappingURL=parser.js.map