import React, { useState } from 'react';

function App() {
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    if (!characterName) return;

    setLoading(true);
    setCharacters([]);
    setError('');

    try {
      const response = await fetch(`https://api.disneyapi.dev/character?name=${characterName}`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const normalized = characterName.toLowerCase();
        const matches = data.data.filter((c) => c.name.toLowerCase() === normalized);

        if (matches.length > 0) {
          setCharacters(matches);
        } else {
          setError('No exact match found.');
        }
      } else {
        setError('Character not found.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Disney Character Movies</h1>
        <div className="flex justify-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter character name"
            className="px-4 py-2 border rounded shadow w-full"
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
              className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={char.imageUrl}
                alt={char.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{char.name}</h2>
                <h3 className="text-md font-semibold text-gray-600 mb-1">Movies:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {char.films.length > 0 ? (
                    char.films.map((film, fIdx) => <li key={fIdx}>{film}</li>)
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
  );
}

export default App;
