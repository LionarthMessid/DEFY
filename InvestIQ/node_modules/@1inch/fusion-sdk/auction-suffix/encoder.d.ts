import { AuctionPoint, AuctionWhitelistItem } from './types';
export declare function encodeAuctionParams(points: AuctionPoint[]): string;
export declare function encodeWhitelist(whitelist: AuctionWhitelistItem[]): string;
export declare function encodePublicResolvingDeadline(deadline: number): string;
export declare function encodeTakingFeeData(takerFeeReceiver?: string, takerFeeRatio?: string): string;
export declare function encodeFlags(whitelist: AuctionWhitelistItem[], points: AuctionPoint[], takingFeeData: string): string;
