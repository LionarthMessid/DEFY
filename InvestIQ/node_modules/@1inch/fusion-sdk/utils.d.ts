import BN from 'bn.js';
export declare const isNativeCurrency: (address: string) => boolean;
export declare function toSec(time: number | string | Date): number;
export declare function toBN(val: number | string): BN;
export declare function trim0x(data: string): string;
export declare function add0x(data: string): string;
export declare function getCrypto(): Crypto;
