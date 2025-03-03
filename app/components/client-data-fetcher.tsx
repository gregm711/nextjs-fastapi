"use client";

import { useState } from "react";

export default function DataFetcher() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      // Replace this URL with the actual endpoint you want to call
      const response = await fetch(`http://localhost:8000/api/py/helloFastApi`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-fetcher-container">
      <button onClick={handleFetch} disabled={loading} className="fetch-button">
        {loading ? (
          <span>
            <span className="loading-spinner"></span>
            Loading...
          </span>
        ) : (
          "Fetch Data"
        )}
      </button>

      {error && (
        <div className="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Error: {error}</span>
        </div>
      )}

      {result && (
        <div className="result-container">
          <h3>Response Data:</h3>
          <div className="result-card">
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="result-item text-black">
                <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .data-fetcher-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          max-width: 800px;
          margin: 2rem auto;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        .fetch-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
        }
        .fetch-button:hover:not(:disabled) {
          background-color: #4338ca;
        }
        .fetch-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .error-message {
          display: flex;
          align-items: center;
          color: #dc2626;
          margin-top: 1rem;
          padding: 0.75rem;
          background-color: #fee2e2;
          border-radius: 6px;
        }
        .error-message svg {
          margin-right: 8px;
          stroke: #dc2626;
        }
        .result-container {
          margin-top: 1.5rem;
        }
        .result-container h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .result-card {
          background-color: #f9fafb;
          border-radius: 6px;
          padding: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .result-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .result-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}
