import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Code } from 'lucide-react';

const algorithms = [
  {
    id: 1,
    name: 'EMA Crossover',
    pair: 'BTC/USDT',
    script: `def ema_crossover(data):
    # Calculate EMAs
    short_ema = data['close'].ewm(span=9).mean()
    long_ema = data['close'].ewm(span=21).mean()
    
    # Generate signals
    if short_ema > long_ema:
        return 'BUY'
    elif short_ema < long_ema:
        return 'SELL'
    return 'HOLD'`,
    data: Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.random() * 1000 + 45000
    }))
  },
  {
    id: 2,
    name: 'RSI Strategy',
    pair: 'ETH/USDT',
    script: `def rsi_strategy(data, period=14):
    # Calculate RSI
    delta = data['close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    
    # Generate signals
    if rsi < 30:
        return 'BUY'
    elif rsi > 70:
        return 'SELL'
    return 'HOLD'`,
    data: Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.random() * 100 + 2800
    }))
  },
  {
    id: 3,
    name: 'MACD Strategy',
    pair: 'SOL/USDT',
    script: `def macd_strategy(data):
    # Calculate MACD
    exp1 = data['close'].ewm(span=12).mean()
    exp2 = data['close'].ewm(span=26).mean()
    macd = exp1 - exp2
    signal = macd.ewm(span=9).mean()
    
    # Generate signals
    if macd > signal:
        return 'BUY'
    elif macd < signal:
        return 'SELL'
    return 'HOLD'`,
    data: Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.random() * 20 + 110
    }))
  },
  {
    id: 4,
    name: 'Bollinger Bands',
    pair: 'XRP/USDT',
    script: `def bollinger_bands(data, period=20):
    # Calculate Bollinger Bands
    sma = data['close'].rolling(window=period).mean()
    std = data['close'].rolling(window=period).std()
    upper_band = sma + (std * 2)
    lower_band = sma - (std * 2)
    
    # Generate signals
    if data['close'] < lower_band:
        return 'BUY'
    elif data['close'] > upper_band:
        return 'SELL'
    return 'HOLD'`,
    data: Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.random() * 0.2 + 0.6
    }))
  },
  {
    id: 5,
    name: 'Volume Profile',
    pair: 'DOGE/USDT',
    script: `def volume_profile(data):
    # Calculate Volume Profile
    volume_ma = data['volume'].rolling(window=20).mean()
    price_ma = data['close'].rolling(window=20).mean()
    
    # Generate signals
    if data['volume'] > volume_ma * 1.5 and data['close'] > price_ma:
        return 'BUY'
    elif data['volume'] > volume_ma * 1.5 and data['close'] < price_ma:
        return 'SELL'
    return 'HOLD'`,
    data: Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.random() * 0.02 + 0.08
    }))
  }
];

const AlgoTrading = () => {
  const [selectedAlgo, setSelectedAlgo] = React.useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{algo.name}</h3>
            <p className="text-gray-600 mb-4">Pair: {algo.pair}</p>
            <button
              onClick={() => setSelectedAlgo(selectedAlgo === algo.id ? null : algo.id)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Code className="w-4 h-4 mr-2" />
              {selectedAlgo === algo.id ? 'Close' : 'Open'}
            </button>
            
            {selectedAlgo === algo.id && (
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <LineChart width={500} height={200} data={algo.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{algo.script}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>  
    </div>
  );
};

export default AlgoTrading;