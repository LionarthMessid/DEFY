import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { BarChart2, User, LogOut } from 'lucide-react';

export default function Navigation() {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const connectWallet = async () => {
    // Simulating wallet connection
    setIsWalletConnected(true);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <NavLink
              to="/algo-trading"
              className={({ isActive }) =>
                `${
                  isActive ? 'border-b-2 border-blue-500' : ''
                } hover:text-blue-500 px-3 py-2 text-sm font-medium`
              }
            >
              Algo Trading
            </NavLink>
            <NavLink
              to="/investment"
              className={({ isActive }) =>
                `${
                  isActive ? 'border-b-2 border-blue-500' : ''
                } hover:text-blue-500 px-3 py-2 text-sm font-medium`
              }
            >
              Investment
            </NavLink>
            <NavLink
              to="http://localhost:3000/"
              className={({ isActive }) =>
                `${
                  isActive ? 'border-b-2 border-blue-500' : ''
                } hover:text-blue-500 px-3 py-2 text-sm font-medium`
              }
            >
              Home  
            </NavLink>
          </div>
          <button
            onClick={connectWallet}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isWalletConnected
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isWalletConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
        <div className="flex items-center">
            <Link
              to="/profile"
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              <User className="h-6 w-6" />
            </Link>

          </div>
      </div>
    </nav>
  );
}