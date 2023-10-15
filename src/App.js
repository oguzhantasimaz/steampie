import React, { useEffect, useState } from 'react';
import GenrePieChart from './GenrePieChart';
import CategoryPieChart from './CategoryPieChart';

function App() {
  const [steamId, setSteamId] = useState('');
  const [stats, setStats] = useState(null);

  //read env variable
  const SECRET_KEY = process.env.SECRET_KEY;

  const fetchData = () => {
    // Construct the POST request with the "steamId" in the request body
    const apiUrl = 'https://us-central1-steampie.cloudfunctions.net/function-1';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ steam_id: steamId, "secretKey": SECRET_KEY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch initial data with a default steamId (or an empty string)
    fetchData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const genreData = {
    labels: stats.genres.map((genre) => genre.name),
    datasets: [
      {
        data: stats.genres.map((genre) => genre.play_time),
        backgroundColor: [
          'red',
          'blue',
          'green',
          // Add more colors if needed
        ],
      },
    ],
  };

  const categoryData = {
    labels: stats.categories.map((category) => category.name),
    datasets: [
      {
        data: stats.categories.map((category) => category.play_time),
        backgroundColor: [
          'orange',
          'purple',
          'pink',
          // Add more colors if needed
        ],
      },
    ],
  };

  return (
    <div className="App">
      <div>
        <label>Enter Steam ID: </label>
        <input
          type="text"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <GenrePieChart data={genreData} />
      <CategoryPieChart data={categoryData} />
    </div>
  );
}

export default App;
