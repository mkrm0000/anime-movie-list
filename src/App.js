import React, { useState } from 'react';

function App() {
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    if (!characterName) return;

    setLoading(true);
    setCharacters({});
    setError('');

    try {
      const response = await fetch(`https://api.disneyapi.dev/character?name=${characterName}`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const characterData = {};

        // Case insensitive filter
        data.data.forEach(character => {
          if (character.name.toLowerCase() === characterName.toLowerCase()) {
            characterData[character.name] = {
              films: character.films,
              imageUrl: character.imageUrl,  // Store image URL with the character data
            };
          }
        });

        if (Object.keys(characterData).length > 0) {
          setCharacters(characterData);
        } else {
          setError('No exact matches found for this character.');
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

      <div>
        {Object.keys(characters).length > 0 ? (
          Object.entries(characters).map(([character, data], index) => (
            <div key={index}>
              <h3>{character}</h3>
              <img src={data.imageUrl} alt={character} width="150" />
              {data.films.map((movie, movieIndex) => (
                <p key={movieIndex}>{movie}</p>
              ))}
            </div>
          ))
        ) : (
          <p>No movies to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
