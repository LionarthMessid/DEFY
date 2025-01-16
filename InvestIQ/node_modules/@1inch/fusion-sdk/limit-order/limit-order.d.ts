import { EIP712TypedData } from './eip712';
import { InteractionsData, LimitOrderV3Struct, OrderInfoData } from './types';
export declare class LimitOrder {
    readonly makerAsset: string;
    readonly takerAsset: string;
    readonly makingAmount: string;
    readonly takingAmount: string;
    readonly from: string;
    readonly allowedSender: string;
    readonly receiver: string;
    readonly makerAssetData: string;
    readonly takerAssetData: string;
    readonly getMakingAmount: string;
    readonly getTakingAmount: string;
    readonly predicate: string;
    readonly permit: string;
    readonly preInteraction: string;
    readonly postInteraction: string;
    protected salt: string;
    constructor(orderInfo: OrderInfoData, interactions?: InteractionsData);
    static getOrderHash(order: LimitOrderV3Struct, domain?: import("./eip712").EIP712DomainType): string;
    static getTypedData(order: LimitOrderV3Struct, domain?: import("./eip712").EIP712DomainType): EIP712TypedData;
    static decode(struct: LimitOrderV3Struct): LimitOrder;
    build(): LimitOrderV3Struct;
    getTypedData(domain?: import("./eip712").EIP712DomainType): EIP712TypedData;
    getOrderHash(domain?: import("./eip712").EIP712DomainType): string;
}
