import { BigNumber } from '@ethersproject/bignumber';
/**
 *
 *      v2(t-t1) + v1(t2-t)
 * v = ---------------------
 *             t2-t1
 *
 * @see https://github.com/1inch/limit-order-settlement/blob/3c7cf9eacbaf7a60624d7a6f069c59d809f2204a/contracts/libraries/OrderSuffix.sol#L94
 */
export declare function linearInterpolation(t1: BigNumber, t2: BigNumber, v1: BigNumber, v2: BigNumber, t: BigNumber): BigNumber;
