import React from 'react';


export default function Profile() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Profile
      </h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> 
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Account Type:</span> 
          </p>
        </div>
      </div>

        <div className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Subscribed Algorithms</h2>
            {/* List of subscribed algorithms will be displayed here */}
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Subscribed Baskets</h2>
            {/* List of subscribed baskets will be displayed here */}
          </div>
        </div>
      
    </div>
  );
}