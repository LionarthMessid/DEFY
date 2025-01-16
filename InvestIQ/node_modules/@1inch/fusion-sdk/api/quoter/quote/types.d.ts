import { PresetEnum } from '../types';
export declare type FusionOrderParamsData = {
    preset?: PresetEnum;
    receiver?: string;
    nonce?: number | string;
    permit?: string;
    takingFeeReceiver?: string;
};
export declare type PredicateParams = {
    address: string;
    nonce?: number | string;
    deadline: number;
};
