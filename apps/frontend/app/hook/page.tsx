"use client"
import React, { useEffect } from "react";

const TestWebhook = ({ userId, zapId }) => {
  useEffect(() => {
    const sendRequest = async () => {
    //   const url = `http://localhost:3001/hooks/catch/${userId}/${zapId}`;
         const url="http://localhost:3002/hooks/catch/1/32107738-b95e-45b0-969c-d396348b7e9c"
      const bodyData = {
        // Random data for testing
        field1: "randomValue1",
        field2: 12345,
        field3: true,
      };
//http://localhost:3001/hooks/catch/1/c8291b83-0a2a-45ac-a535-6cd2c8289dad/e30=
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
