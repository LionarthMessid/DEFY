import { NonceManagerConfig } from './types';
export declare class NonceManager {
    private readonly config;
    constructor(config: NonceManagerConfig);
    static new(config: NonceManagerConfig): NonceManager;
    /**
     * @param maker string, address of maker
     */
    getNonce(maker: string): Promise<string>;
}
