import React, { useState } from 'react';

function WelcomePage({ setSteamId }) {
  const [steamIdInput, setSteamIdInput] = useState('');

  const handleSteamIdChange = (e) => {
    setSteamIdInput(e.target.value);
  };

  const handleSetSteamId = () => {
    // Make the POST request to the serverless function with the entered Steam ID
    fetch('https://us-central1-steampie.cloudfunctions.net/function-1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ steam_id: steamIdInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSteamId(data.steam_id); // Update the Steam ID in the parent component
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Welcome to the Steam Stats App</h2>
      <label>Enter Steam ID: </label>
      <input type="text" value={steamIdInput} onChange={handleSteamIdChange} />
      <button onClick={handleSetSteamId}>Submit</button>
    </div>
  );
}

export default WelcomePage;
