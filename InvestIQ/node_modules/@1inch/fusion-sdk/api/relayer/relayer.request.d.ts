import { RelayerRequestParams } from './types';
import { LimitOrderV3Struct } from '../../limit-order';
export declare class RelayerRequest {
    readonly order: LimitOrderV3Struct;
    readonly signature: string;
    readonly quoteId: string;
    constructor(params: RelayerRequestParams);
    static new(params: RelayerRequestParams): RelayerRequest;
    build(): RelayerRequestParams;
}
