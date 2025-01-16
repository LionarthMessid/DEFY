import { BlockchainProviderConnector } from './blockchain-provider.connector';
import Web3 from 'web3';
import { EIP712TypedData } from '../../limit-order';
export declare class Web3ProviderConnector implements BlockchainProviderConnector {
    protected readonly web3Provider: Web3;
    constructor(web3Provider: Web3);
    signTypedData(walletAddress: string, typedData: EIP712TypedData): Promise<string>;
    ethCall(contractAddress: string, callData: string): Promise<string>;
}
