// VerbwireWalletStreamContext.ts
import React, { createContext, useContext, useEffect } from 'react';
//import { watchAccount } from '@wagmi/core';
import PropTypes from 'prop-types';
// Use the interface to type the context
const VerbwireWalletStreamContext = createContext(null);
// Use context hook for VerbwireWalletStreamContext
export const useVerbwireWalletStreamContext = () => useContext(VerbwireWalletStreamContext);
const walletEventTypes = {
    STREAM_CONNECTION: "STREAM_CONNECTION",
};
const VerbwireWalletStreamContextProvider = ({ apiKey, applicationId, watchAccount, children }) => {
    useEffect(() => {
        try {
            if (watchAccount && apiKey && applicationId) {
                const unwatch = watchAccount((account) => {
                    if (account.isConnected) {
                        // make axios post call to server
                        let eventBody = {
                            event: walletEventTypes.STREAM_CONNECTION,
                            applicationId: applicationId,
                            publicAddress: account.address,
                            connectorId: account.connector?.id,
                            connectorName: account.connector?.name,
                        };
                        fetch('https://api.verbwire.com' + '/v1/wallet/event/save', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': 'en-US',
                                'X-API-KEY': apiKey,
                            },
                            body: JSON.stringify(eventBody),
                        }).then(response => {
                            //console.log("Response: ", response);
                        }).catch((error) => {
                            console.error(error);
                        });
                    }
                });
                // cleanup the watcher when component unmounts
                return () => unwatch();
            }
        }
        catch (error) {
            console.error("VerbwireWalletStreamContextProvider Error: ", error);
        }
    }, [apiKey, applicationId, watchAccount]);
    return (React.createElement(VerbwireWalletStreamContext.Provider, { value: { apiKey, applicationId } }, children));
};
VerbwireWalletStreamContextProvider.propTypes = {
    apiKey: PropTypes.string.isRequired,
    applicationId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    watchAccount: PropTypes.func.isRequired,
};
export default VerbwireWalletStreamContextProvider;
