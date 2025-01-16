import { AuctionPoint, AuctionWhitelistItem } from '../types';
export declare type InteractionAdditionalInfo = {
    points: AuctionPoint[];
    whitelist: AuctionWhitelistItem[];
    publicResolvingDeadline: number;
    takerFeeReceiver: string;
    takerFeeRatio: string;
};
export declare type InteractionFlags = {
    takingFeeEnabled: boolean;
    resolversCount: number;
    pointsCount: number;
};
export declare type TakerFeeData = {
    takerFeeRatio: string;
    takerFeeReceiver: string;
} & RemainingInteractions;
export declare type PrivateAuctionDeadline = {
    deadline: number;
} & RemainingInteractions;
export declare type ResolversWhitelist = {
    whitelist: AuctionWhitelistItem[];
} & RemainingInteractions;
export declare type ParsedAuctionParams = {
    points: AuctionPoint[];
} & RemainingInteractions;
export declare type RemainingInteractions = {
    interactions: string;
};
