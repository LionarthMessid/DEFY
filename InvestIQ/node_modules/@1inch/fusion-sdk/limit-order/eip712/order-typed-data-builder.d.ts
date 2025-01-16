import { EIP712DomainType, EIP712TypedData } from './eip712.types';
import { LimitOrderV3Struct } from '../types';
export declare function getOrderHash(data: EIP712TypedData): string;
export declare function buildOrderData(chainId: number, verifyingContract: string, name: string, version: string, order: LimitOrderV3Struct): EIP712TypedData;
export declare function domainSeparator(name: string, version: string, chainId: number, verifyingContract: string): string;
export declare function getLimitOrderV3Domain(chainId: number): EIP712DomainType;
