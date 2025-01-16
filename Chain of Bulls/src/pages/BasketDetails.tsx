import React from 'react';
import { useParams } from 'react-router-dom';

const basketData = {
  green: {
    name: 'Green Basket',
    assets: [
      { symbol: 'SOL', name: 'Solana', weight: 30, price: 120.5 },
      { symbol: 'ADA', name: 'Cardano', weight: 25, price: 0.65 },
      { symbol: 'ALGO', name: 'Algorand', weight: 20, price: 0.22 },
      { symbol: 'XRP', name: 'Ripple', weight: 15, price: 0.58 },
      { symbol: 'XLM', name: 'Stellar', weight: 10, price: 0.12 }
    ]
  },
  balanced: {
    name: 'Balanced Basket',
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', weight: 40, price: 52000 },
      { symbol: 'ETH', name: 'Ethereum', weight: 30, price: 3200 },
      { symbol: 'BNB', name: 'Binance Coin', weight: 15, price: 420 },
      { symbol: 'DOT', name: 'Polkadot', weight: 10, price: 7.5 },
      { symbol: 'LINK', name: 'Chainlink', weight: 5, price: 18.2 }
    ]
  },
  aggressive: {
    name: 'Aggressive Basket',
    assets: [
      { symbol: 'AVAX', name: 'Avalanche', weight: 25, price: 38.5 },
      { symbol: 'MATIC', name: 'Polygon', weight: 25, price: 1.2 },
      { symbol: 'ATOM', name: 'Cosmos', weight: 20, price: 11.8 },
      { symbol: 'FTM', name: 'Fantom', weight: 15, price: 0.85 },
      { symbol: 'NEAR', name: 'NEAR Protocol', weight: 15, price: 5.4 }
    ]
  }
};

const BasketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const basket = id ? basketData[id as keyof typeof basketData] : null;
  const [assets, setAssets] = React.useState(basket?.assets || []);
  
  if (!basket) return <div>Basket not found</div>;

  const totalValue = assets.reduce((sum, asset) => {
    return sum + (asset.weight / 100) * asset.price;
  }, 0);

  const handleWeightChange = (index: number, newWeight: number) => {
    const newAssets = [...assets];
    newAssets[index].weight = newWeight;
    setAssets(newAssets);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{basket.name}</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset, index) => (
              <tr key={asset.symbol}>
                <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">${asset.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={asset.weight}
                    onChange={(e) => handleWeightChange(index, Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${((asset.weight / 100) * asset.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={4} className="px-6 py-4 font-medium">Total Basket Value</td>
              <td className="px-6 py-4 font-medium">${totalValue.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BasketDetails;