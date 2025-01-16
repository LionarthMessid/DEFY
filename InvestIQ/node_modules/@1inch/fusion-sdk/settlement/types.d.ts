import { LimitOrderV3Struct } from '../limit-order';
export declare type SettlementConfig = {
    resolverContract: string;
    settlementContract: string;
};
export declare type FillOrderParams = {
    order: LimitOrderV3Struct;
    signature: string;
    makingAmount: string;
    takingAmount: string;
    thresholdAmount: string;
    target: string;
};
export declare type FillOrderParamsExtended = FillOrderParams & {
    interaction: string;
};
