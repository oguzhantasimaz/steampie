import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import GenrePieChart from './GenrePieChart';
import { InfinitySpin } from "react-loader-spinner";
import Colors from "./Utils";
// import CategoryPieChart from './CategoryPieChart';

function App() {
  const [steamId, setSteamId] = useState('');
  const [genreData, setGenreData] = useState(null);
  // const [categoryData, setCategoryData] = useState(null);
  const [topGames, setTopGames] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSteamIdChange = (event) => {
    setSteamId(event.target.value);
  };

  const fetchSteamData = async () => {
    setIsLoading(true);
    try{
      if (!steamId) {
        alert('Please enter a Steam ID');
      }

      const response = await axios.post('https://us-central1-steampie.cloudfunctions.net/function-1', {
        steamId
      });

      // Assuming the response contains genre and category data
      const { genres, games } = response.data;

      setGenreData({
        labels: genres.map((genre) => genre.name),
        datasets: [
          {
            label: 'Play Time (in hours)',
            data: genres.map((genre) => genre.play_time),
            backgroundColor: Colors,
          },
        ]
      });

      setTopGames(games);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Steam Pie</h1>
      <h2>Bake Your All Time Game Genre Pie</h2>
      <p>Enter your Steam ID below:</p>
      <p>Don't know your Steam ID? <a href="https://steamidfinder.com/">Find it here</a></p>
      <input
        type="text"
        className="custom-input"
        value={steamId}
        onChange={handleSteamIdChange}
        style={{ width: '185px' }}
        placeholder="Example: 76561198092421830"
      />
      <br/>
      <button className="custom-button" onClick={fetchSteamData}>Bring my PIE!</button>

      {isLoading ? (
      <div className="loading-container">
        <InfinitySpin
          height="150"
          width="150"
          radius="9"
          color="orange"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    ) : (
    <>
      {genreData && topGames ? (
        <div className="maindiv">
      <h2>Genre Pie Chart</h2>
            <GenrePieChart data={genreData} />
        <div>
        {topGames.length > 0 && (
            <div>
              <h2 className="top-games-title">Top Games</h2>
              <ul className="top-games-list">
                {topGames
                  .sort((a, b) => b.play_time - a.play_time)
                  .slice(0, 10)
                  .map((game, index) => (
                    <li key={index} style={{ fontSize: `${30 - index * 2}px` }}>
                      {game.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          </div>
      </div>
      ) : ""}

    </> )}
    </div>
  );
}

export default App;