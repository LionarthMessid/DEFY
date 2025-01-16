import { LimitOrderV3Struct } from '../limit-order';
import { NetworkEnum } from '../constants';
import { WsApiConfig } from '../connector/ws';
import { PaginationOutput } from '../api/types';
import { ActiveOrder } from '../api/orders';
export declare type Event<K extends string, T> = {
    event: K;
    result: T;
};
export declare type OrderEventType = OrderCreatedEvent | OrderInvalidEvent | OrderBalanceOrAllowanceChangeEvent | OrderFilledEvent | OrderFilledPartiallyEvent;
export declare type OrderCreatedEvent = Event<'order_created', {
    orderHash: string;
    signature: string;
    order: LimitOrderV3Struct;
    deadline: string;
    auctionStartDate: string;
    auctionEndDate: string;
    remainingMakerAmount: string;
}>;
export declare type OrderBalanceOrAllowanceChangeEvent = Event<'order_balance_or_allowance_change', {
    orderHash: string;
    remainingMakerAmount: string;
    balance: string;
    allowance: string;
}>;
export declare type OrderInvalidEvent = Event<'order_invalid', {
    orderHash: string;
}>;
export declare type OrderFilledEvent = Event<'order_filled', {
    orderHash: string;
}>;
export declare type OrderFilledPartiallyEvent = Event<'order_filled_partially', {
    orderHash: string;
    remainingMakerAmount: string;
}>;
export declare type OnOrderCb = (data: OrderEventType) => any;
export declare type OnOrderCreatedCb = (data: OrderCreatedEvent) => any;
export declare type OnOrderInvalidCb = (data: OrderInvalidEvent) => any;
export declare type OnOrderNotEnoughBalanceOrAllowanceCb = (data: OrderBalanceOrAllowanceChangeEvent) => any;
export declare type OnOrderFilledCb = (data: OrderFilledEvent) => any;
export declare type OnOrderFilledPartiallyCb = (data: OrderFilledPartiallyEvent) => any;
export declare type WsApiConfigWithNetwork = WsApiConfig & {
    network: NetworkEnum;
};
export declare type RpcEvent<T extends RpcMethod, K> = {
    method: T;
    result: K;
};
export declare type GetAllowMethodsRpcEvent = RpcEvent<'getAllowedMethods', RpcMethod[]>;
export declare type RpcMethod = 'getAllowedMethods' | 'ping' | 'getActiveOrders';
export declare type RpcEventType = PingRpcEvent | GetAllowMethodsRpcEvent | GetActiveOrdersRpcEvent;
export declare type PingRpcEvent = RpcEvent<'ping', string>;
export declare type GetActiveOrdersRpcEvent = RpcEvent<'getActiveOrders', PaginationOutput<ActiveOrder>>;
export declare type OnPongCb = (data: PingRpcEvent['result']) => any;
export declare type OnGetAllowedMethodsCb = (data: GetAllowMethodsRpcEvent['result']) => any;
export declare type OnGetActiveOrdersCb = (data: GetActiveOrdersRpcEvent['result']) => any;
