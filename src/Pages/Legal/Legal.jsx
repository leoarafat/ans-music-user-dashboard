// Legal.js

import React from 'react';

const Legal = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">Legal Information</h1>
        <p className="text-gray-700 mb-6">
          Welcome to our legal page. Here you can find important information regarding the
          upload of music to our platform.
        </p>
        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">Music Upload Guidelines</h2>
          <p className="text-gray-700">
            When uploading music to our platform, please adhere to the following guidelines:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li className="mb-1">Ensure you have the necessary rights to distribute the music.</li>
            <li className="mb-1">Do not upload copyrighted material without permission.</li>
            <li className="mb-1">Provide accurate metadata for each track, including title, artist name, and genre.</li>
            <li className="mb-1">Upload high-quality audio files in supported formats.</li>
            <li className="mb-1">Avoid uploading explicit or offensive content.</li>
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">Legal Disclaimer</h2>
          <p className="text-gray-700">
            We are not responsible for any misuse or unauthorized distribution of music uploaded
            to our platform by users. By uploading music, you agree to indemnify and hold harmless
            our platform and its affiliates from any claims, damages, or liabilities arising from
            your use of the service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
