import { BlockchainProviderConnector } from '../connector';
export declare enum OrderNonce {
    Auto = "auto"
}
export declare type NonceManagerConfig = {
    provider: BlockchainProviderConnector;
    limitOrderProtocolContract?: string;
};
