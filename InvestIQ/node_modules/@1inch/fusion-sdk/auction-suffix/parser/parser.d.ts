import { InteractionAdditionalInfo, InteractionFlags, ParsedAuctionParams, PrivateAuctionDeadline, ResolversWhitelist, TakerFeeData } from './types';
/**
 *    Order.interactions suffix structure:
 *    M*(1 + 3 bytes)  - auction points coefficients with seconds delays
 *    N*(4 + 20 bytes) - resolver with corresponding time limit
 *    4 bytes          - public time limit
 *    32 bytes         - taking fee (optional if flags has _HAS_TAKING_FEE_FLAG)
 *    1 byte           - flags
 * @param interactions
 */
export declare function parseInteractionsSuffix(interactions: string): InteractionAdditionalInfo;
export declare function minInteractionsLength(flags: InteractionFlags): number;
export declare function parseTakingFeeAndReturnRemainingInteractions(flags: InteractionFlags, interactions: string): TakerFeeData;
export declare function parsePrivateAuctionDeadline(interactions: string): PrivateAuctionDeadline;
export declare function parseResolversWhitelist(flags: InteractionFlags, interactions: string): ResolversWhitelist;
export declare function parseAuctionParams(flags: InteractionFlags, interactions: string): ParsedAuctionParams;
export declare function parseFlags(interactions: string): InteractionFlags;
