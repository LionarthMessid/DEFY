# Verbwire Wallet Stream Library

[![npm version](https://badge.fury.io/js/verbwire-wallet-stream.svg)](https://badge.fury.io/js/verbwire-wallet-stream) [![Downloads](https://img.shields.io/npm/dm/verbwire-wallet-stream.svg)](https://www.npmjs.com/package/verbwire-wallet-stream) [![Try on RunKit](https://badge.runkitcdn.com/verbwire-wallet-stream.svg)](https://runkit.com/npm/verbwire-wallet-stream)

The official Verbwire wallet event stream client library for the [Verbwire API][1] and the [Wagmi Library][12].

This library, combined with the Verbwire dashboard, allows an easy way to view your users as well as connection statistics. No back end required. Additionally, connection statistics work with ANY wallet compatible with wagmi, not just the Verbwire Wallet. It integrates seamlessly with existing applications utilizing wagmi and streams wallet and connection event information without the need for additional back-end infrastructure.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Install

Install via npm in the console

```console
$ npm install verbwire-wallet-stream
```

## Getting Started

The Verbwire wallet streamer utilizes existing wagmi hooks to stream events to the Verbwire API.

Utilizing this library requires you to have wagmi installed and configured. Additionally you will need a Verbwire API public key that has the '/v1/wallet/event/save' endpoint or WALLET_EVENT category (available from the [Verbwire Dashboard][3].

Private keys are NOT recommended as the key will be viewable by client applications.

Finally, you will need to create a [Verbwire Wallet Application][13] from the dashboard. You will include the Application ID in the VerbwireWalletStreamContextProvider.


Make sure wagmi is installed. Include the watchAccount hook

```
import {watchAccount} from "@wagmi/core";
```

Wrap your application in the VerbwireWalletStreamContextProvider.

```
<VerbwireWalletStreamContextProvider apiKey="YOUR_PUBLIC_API_KEY" applicationId="YOUR_APPLICATION_ID" watchAccount={watchAccount}>
     <Component {...pageProps} />
</VerbwireWalletStreamContextProvider>

```

## Usage

Include the library, as well as the 'watchAccount' hook from @wagmi/core in your main application. You'll need to wrap your application in the VerbwireWalletStreamContextProvider. Make sure this is a child of your wagmi wrapping.

Example _app.tsx for nextjs:

```js
import { VerbwireWalletStreamContextProvider } from 'verbwire-wallet-stream'
import {watchAccount} from "@wagmi/core";

// ... Rest of your code...

function MyApp({ Component, pageProps }: AppProps) {
  return (


        <WagmiConfig config={wagmiConfig}>
            <VerbwireWalletStreamContextProvider apiKey="YOUR_PUBLIC_API_KEY" applicationId="YOUR_APPLICATION_ID" watchAccount={watchAccount}>
                    <Component {...pageProps} />
            </VerbwireWalletStreamContextProvider>
        </WagmiConfig>

  );
}
```

## Statistics

Once configured, you will see page load, wallet connections and user address lists in the Verbwire Dashboard under your Verbwire Wallet Application. Streaming happens seamlessly without the need for additional back-end infrastructure.

## License

[MIT][9]

[1]: https://verbwire.com
[2]: https://docs.verbwire.com/
[3]: https://www.verbwire.com/dashboard/apikeys
[5]: https://docs.verbwire.com/docs/verbwire-quickstart-guide
[6]: https://docs.verbwire.com/reference/getting-started-with-your-api
[7]: https://github.com/verbwire
[8]: https://www.verbwire.com/community
[9]: https://github.com/verbwire/verbwire-js/blob/master/LICENSE
[10]: mailto:support@verbwire.com
[11]: https://docs.verbwire.com/recipes
[12]: https://wagmi.sh/
[13]: https://www.verbwire.com/dashboard/walletApplications/list
