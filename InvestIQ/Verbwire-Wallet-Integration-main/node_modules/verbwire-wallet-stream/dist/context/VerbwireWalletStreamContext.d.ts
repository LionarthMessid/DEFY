import React from 'react';
interface VerbwireWalletStreamContextProps {
    apiKey: string;
    applicationId: string;
    children: React.ReactNode;
    watchAccount: (callback: any, config?: any) => () => void;
}
export declare const useVerbwireWalletStreamContext: () => any;
declare const VerbwireWalletStreamContextProvider: React.FC<VerbwireWalletStreamContextProps>;
export default VerbwireWalletStreamContextProvider;
