import { BlockchainProviderConnector } from './blockchain-provider.connector';
import Web3 from 'web3';
import { EIP712TypedData } from '../../limit-order';
export declare class PrivateKeyProviderConnector implements BlockchainProviderConnector {
    readonly privateKey: string;
    protected readonly web3Provider: Web3;
    private readonly privateKeyBuffer;
    constructor(privateKey: string, web3Provider: Web3);
    signTypedData(_walletAddress: string, typedData: EIP712TypedData): Promise<string>;
    ethCall(contractAddress: string, callData: string): Promise<string>;
}
