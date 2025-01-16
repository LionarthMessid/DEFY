// Create a public key from the Verbwrie Dashboard
// Add a Scope to it: "/v1/wallet/event/save"
const publicKey = "pk_live_559cd1f8-a366-41a8-93da-0211f5271201";

// Create a wallet application from Verbwire Dashboard
// Add respective allowed domains to it.
const applicationId = "Ws1yCwX_ydeCmge_Tytd3o";

// Get an API key from Alchemy
const alchemyKey = "JthY7mErGJOeAbfB0Oms4KWWJyCtOWQp";

export const credentials = {
    publicKey,
    applicationId,
    alchemyKey,
};