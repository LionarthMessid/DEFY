import { 
  FusionSDK, 
  NetworkEnum, 
  PrivateKeyProviderConnector, 
} from '@1inch/fusion-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseUnits } from 'viem';
import Web3 from 'web3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fromTokenAddress, toTokenAddress, amount, decimal } = req.body;

    const makerPrivateKey = process.env.PRIVATE_KEY as string;
    const makerAddress = '0x9c6691eE4a6DdB2580A6A7227c7C50cC8D147AA9';

    // Updated RPC URL to use Polygon zkEVM Cardona Testnet
    const nodeUrl = 'https://rpc.cardona.zkevm-rpc.com';
    const web3Instance = new Web3(nodeUrl);

    const blockchainProvider = new PrivateKeyProviderConnector(
      makerPrivateKey,
      web3Instance as any
    );

    // Note: You might need to verify if the NetworkEnum needs to be updated 
    // depending on how the FusionSDK handles the zkEVM testnet
    const sdk = new FusionSDK({
      url: 'https://api.1inch.dev/fusion',
      network: NetworkEnum.POLYGON, // You might need to update this for zkEVM testnet
      blockchainProvider,
      authKey: process.env.FUSION_AUTH_KEY || 'LwYawtmJTAci1ken3LwCtt0Sc4WEhpTY',
    });

    sdk
      .placeOrder({
        fromTokenAddress: fromTokenAddress,
        toTokenAddress: toTokenAddress,
        amount: parseUnits(amount, decimal).toString(),
        walletAddress: makerAddress,
      })
      .then((order) => {
        return res.status(200).json({ message: order.orderHash });
      })
      .catch((error) => {
        return res.status(500).json({ error: `Order placement failed: ${error.message}` });
      });
  } catch (error) {
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
}