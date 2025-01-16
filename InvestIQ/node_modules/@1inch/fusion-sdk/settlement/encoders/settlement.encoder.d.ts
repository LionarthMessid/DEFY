import { FillOrderParamsExtended } from '../types';
export declare function encodeSettleOrders(data: string): string;
export declare function encodeSettleOrdersParam(params: FillOrderParamsExtended): string;
export declare function buildResolveOrdersBytes(settlementContract: string, resolverContract: string, executionBytes: string): string;
export declare function buildRecursiveFillInteraction(settlementContract: string, params: FillOrderParamsExtended): string;
