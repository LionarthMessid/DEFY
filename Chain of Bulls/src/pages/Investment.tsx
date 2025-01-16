import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const baskets = [
  {
    id: 'green',
    name: 'Green Basket',
    description: 'Eco-friendly and sustainable blockchain projects',
    riskLevel: 'Low',
    expectedReturn: '8-12%'
  },
  {
    id: 'balanced',
    name: 'Balanced Basket',
    description: 'Mix of stable and growth potential cryptocurrencies',
    riskLevel: 'Medium',
    expectedReturn: '15-20%'
  },
  {
    id: 'aggressive',
    name: 'Aggressive Basket',
    description: 'High-risk, high-reward emerging cryptocurrencies',
    riskLevel: 'High',
    expectedReturn: '25-40%'
  }
];

const Investment = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">{basket.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{basket.description}</p>
            <div className="space-y-2 mb-6">
              <p className="text-sm">
                <span className="font-medium">Risk Level:</span>{' '}
                <span className={`
                  ${basket.riskLevel === 'Low' ? 'text-green-500' : ''}
                  ${basket.riskLevel === 'Medium' ? 'text-yellow-500' : ''}
                  ${basket.riskLevel === 'High' ? 'text-red-500' : ''}
                `}>
                  {basket.riskLevel}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Expected Return:</span>{' '}
                {basket.expectedReturn}
              </p>
            </div>
            <button
              onClick={() => navigate(`/basket/${basket.id}`)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              View Basket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Investment;