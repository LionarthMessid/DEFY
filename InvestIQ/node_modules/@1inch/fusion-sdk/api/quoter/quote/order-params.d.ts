import { PresetEnum } from '../types';
import { FusionOrderParamsData } from './types';
export declare class FusionOrderParams {
    readonly preset: PresetEnum;
    readonly receiver: string;
    readonly permit: string | undefined;
    readonly nonce: number | string | undefined;
    constructor(params: FusionOrderParamsData);
    static new(params?: FusionOrderParamsData): FusionOrderParams;
}
