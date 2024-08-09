"use client"
import React, { useEffect } from "react";

const TestWebhook = ({ userId, zapId }) => {
  useEffect(() => {
    const sendRequest = async () => {
    //   const url = `http://localhost:3001/hooks/catch/${userId}/${zapId}`;
         const url="http://localhost:3002/hooks/catch/1/b15ec296-3c53-423e-9dad-2d23cc4651e0"
      const bodyData = {
        // Random data for testing
        field1: "randomValue1",
        field2: 12345,
        field3: true,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    sendRequest();
  }, [userId, zapId]);

  return <div>Sending request to webhook...</div>;
};

export default TestWebhook;
