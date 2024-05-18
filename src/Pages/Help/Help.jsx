// help.js

import React from 'react';

const help = () => {
  return (
    <div className="bg-gray-100  flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto p-8 my-5 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">Music Dashboard Help</h1>
        <p className="text-gray-700 mb-6">
          Welcome to the Music Dashboard Help page! Here, you can find information and assistance
          on using our music dashboard.
        </p>
        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">Getting Started</h2>
          <p className="text-gray-700">
            To get started with our music dashboard, please follow these steps:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li className="mb-1">Step 1: Sign up or log in to your account.</li>
            <li className="mb-1">Step 2: Navigate to the dashboard page.</li>
            <li className="mb-1">Step 3: Explore your music library and playlists.</li>
            <li className="mb-1">Step 4: Customize your dashboard settings.</li>
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">FAQs</h2>
          <p className="text-gray-700">
            Here are some frequently asked questions about our music dashboard:
          </p>
          <div className="mt-2">
            <h3 className="font-bold">Q: How do I add songs to my playlist?</h3>
            <p className="text-gray-700">To add songs to your playlist, simply...</p>
            {/* Add more FAQs here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default help;
