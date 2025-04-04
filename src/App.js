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
        // Normalize character names for case-insensitive comparison
        const normalizedCharacterName = characterName.toLowerCase();

        // Find all characters that match the input name case-insensitively
        const matchingCharacters = data.data.filter((character) =>
          character.name.toLowerCase() === normalizedCharacterName
        );

        if (matchingCharacters.length > 0) {
          setCharacters(matchingCharacters);
        } else {
          setError('No exact match found for this character.');
        }
      } else {
        setError('No data found for this character.');
      }
    } catch (error) {
      setError('Error fetching data.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Disney Character Movies</h1>
      <input
        type="text"
        placeholder="Enter character name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <button onClick={fetchMovies} disabled={loading}>
        {loading ? 'Loading...' : 'Get Movies'}
      </button>

      {error && <p>{error}</p>}

      {characters.length > 0 ? (
        characters.map((character, index) => (
          <div key={index}>
            <h3>{character.name}</h3>
            <img src={character.imageUrl} alt={character.name} width="150" />
            <div>
              <h4>Movies:</h4>
              {character.films.map((movie, movieIndex) => (
                <p key={movieIndex}>{movie}</p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No exact matches to display.</p>
      )}
    </div>
  );
}

export default App;