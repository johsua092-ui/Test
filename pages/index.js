'use client';

import { useState, useEffect } from 'react';
import '../app/globals.css';

export default function Home() {
  const [keys, setKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchKeys = async () => {
    setLoading(true);
    const res = await fetch('/api/keys');
    if (res.ok) {
      const data = await res.json();
      setKeys(data);
    }
    setLoading(false);
  };

  const createKey = async () => {
    if (!newKeyName) return;
    const res = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newKeyName })
    });
    if (res.ok) {
      setNewKeyName('');
      fetchKeys();
    }
  };

  const deleteKey = async (key) => {
    if (!confirm('Delete this key?')) return;
    await fetch('/api/keys', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    fetchKeys();
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Key Manager</h1>
          <p className="text-gray-600">Create and manage your API keys</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Key</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Key name"
            />
            <button
              onClick={createKey}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Active Keys</h2>
            <button
              onClick={fetchKeys}
              disabled={loading}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          <div className="space-y-3">
            {keys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{key.name}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {key.usage || 0} requests
                    </span>
                  </div>
                  <code className="text-sm text-gray-600 font-mono">{key.id}</code>
                </div>
                <button
                  onClick={() => deleteKey(key.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
            {keys.length === 0 && (
              <p className="text-center text-gray-500 py-8">No keys yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
