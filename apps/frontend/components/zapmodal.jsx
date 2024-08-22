import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const WebhookModal = ({ webhookUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Webhook URL</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="mt-2 text-gray-700">
          This is your webhook URL. Use it in your app to integrate:
        </p>
        <div className="flex items-center mt-4">
          <input
            type="text"
            readOnly
            value={webhookUrl}
            className="border border-gray-300 p-2 rounded-l-md flex-grow"
          />
          <CopyToClipboard text={webhookUrl} onCopy={handleCopy}>
            <button className="bg-blue-500 text-white p-2 rounded-r-md">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default WebhookModal;
