import { FillOrderParams, SettlementConfig } from './types';
export declare class Settlement {
    private readonly config;
    constructor(config: SettlementConfig);
    static new(config: SettlementConfig): Settlement;
    encodeSettleOrders(orders: FillOrderParams[], resolverExecutionBytes: string): string;
    encodeSettleOrdersParam(orders: FillOrderParams[], resolverExecutionBytes: string): string;
}
