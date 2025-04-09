import React, { useState } from 'react';
import './index.css'; // make sure Tailwind is imported

function App() {
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // 🌙 for toggle

  const fetchMovies = async () => {
    if (!characterName) return;

    setLoading(true);
    setCharacters([]);
    setError('');

    try {
      const response = await fetch(`https://api.disneyapi.dev/character?name=${characterName}`);
      const data = await response.json();

      const normalized = characterName.toLowerCase();
      const matches = data.data.filter((c) => c.name.toLowerCase() === normalized);

      if (matches.length > 0) {
        setCharacters(matches);
      } else {
        setError('No exact match found.');
      }
    } catch {
      setError('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 transition duration-300">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Disney Character Movies</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter character name"
              className="px-4 py-2 border rounded shadow w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
            <button
              onClick={fetchMovies}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {characters.map((char, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition hover:shadow-xl"
              >
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{char.name}</h2>
                  <h3 className="text-md font-semibold mb-1">Movies:</h3>
                  <ul className="list-disc list-inside">
                    {char.films.length > 0 ? (
                      char.films.map((film, i) => <li key={i}>{film}</li>)
                    ) : (
                      <li>No movies found</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
