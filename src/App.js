import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import GenrePieChart from './GenrePieChart';
import CategoryPieChart from './CategoryPieChart';

function App() {
  const [steamId, setSteamId] = useState('');
  const [genreData, setGenreData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const handleSteamIdChange = (event) => {
    setSteamId(event.target.value);
  };

  const fetchSteamData = async () => {
    try {
      const response = await axios.post('https://us-central1-steampie.cloudfunctions.net/function-1', {
        steam_id: steamId,
        "secretKey": process.env.SECRET_KEY
      });

      // Assuming the response contains genre and category data
      const { genres, categories } = response.data;

      setGenreData(genres);
      setCategoryData(categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Steam Stats App</h1>
      <p>Enter your Steam ID below:</p>
      <input
        type="text"
        value={steamId}
        onChange={handleSteamIdChange}
        placeholder="Enter your Steam ID"
      />
      <button onClick={fetchSteamData}>Fetch Data</button>

      {genreData && categoryData ? (
        <div>
          <GenrePieChart data={genreData} />
          <CategoryPieChart data={categoryData} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
