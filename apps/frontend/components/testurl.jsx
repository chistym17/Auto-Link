import React, { useState } from "react";

const WebhookTester = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTestWebhook = async () => {



    
    if (!webhookUrl) {
      alert("Please enter a webhook URL");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const sampleData = {
        exampleField1: "Example Data 1",
        exampleField2: "Example Data 2",
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData),
      });

      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Webhook Tester</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Webhook URL
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="Enter your webhook URL"
        />
      </div>
      <button
        onClick={handleTestWebhook}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? "Testing..." : "Test Webhook"}
      </button>
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Response:</h2>
          <pre className="bg-gray-100 p-2 rounded-md overflow-auto">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default WebhookTester;
