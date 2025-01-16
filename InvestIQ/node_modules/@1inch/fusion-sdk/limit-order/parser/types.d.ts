import { DynamicField } from './constants';
export declare type InteractionField = keyof typeof DynamicField;
export declare type ParsedInteractions = Record<InteractionField, string>;
