import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import GenrePieChart from './GenrePieChart';
import CategoryPieChart from './CategoryPieChart';

function App() {
  const [steamId, setSteamId] = useState('');
  const [genreData, setGenreData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [topGames, setTopGames] = useState(null);

  const handleSteamIdChange = (event) => {
    setSteamId(event.target.value);
  };

  const fetchSteamData = async () => {
      const response = await axios.post('https://us-central1-steampie.cloudfunctions.net/function-1', {
        steamId,
        "secretKey": process.env.SECRET_KEY
      });

      // Assuming the response contains genre and category data
      const { genres, categories, games } = response;

      // console.log(genres, categories)

      setGenreData({
        labels: genres.map((genre) => genre.name),
        datasets: [
          {
            label: 'Genres',
            data: genres.map((genre) => genre.play_time),
            backgroundColor: genres.map((genre) => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
          },
        ]
      });

      setCategoryData({
        labels: categories.map((category) => category.name),
        datasets: [
          {
            label: 'Categories',
            data: categories.map((category) => category.play_time),
            backgroundColor: categories.map((category) => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
          },
        ]
      });

      setTopGames(games);

      // setGenreData(genreData);
      // setCategoryData(categoryData);
  };

  return (
    <div className="App">
      <h1>Steam Pie</h1>
      <h2>Bake Your All Time Game Genre Pie</h2>
      <p>Enter your Steam ID below:</p>

      <input
        type="text"
        value={steamId}
        onChange={handleSteamIdChange}
        placeholder="Enter your Steam ID"
      />
      <button onClick={fetchSteamData}>Fetch Data</button>

      {genreData && categoryData && topGames ? (
        <div>
          <div className="charts-container">
            <GenrePieChart data={genreData} />
          </div>
        <div>
        {topGames.length > 0 && (
            <div>
              <h2>Top Games</h2>
              <ul className="top-games-list">
                {topGames
                  .sort((a, b) => b.play_time - a.play_time)
                  .slice(0, 10)
                  .map((game, index) => (
                    <li key={index} style={{ fontSize: `${16 - index}px` }}>
                      {game.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          </div>
      </div>
      ) : ""}
    </div>
  );
}

export default App;

const MockData = {
  "steam_id": "76561198092421830",
  "games_count": 0,
  "categories": [
      {
          "name": "Remote Play on Phone",
          "play_time": 3420
      },
      {
          "name": "Remote Play on Tablet",
          "play_time": 3709
      },
      {
          "name": "Steam Leaderboards",
          "play_time": 50
      },
      {
          "name": "VR Supported",
          "play_time": 28
      },
      {
          "name": "Steam Workshop",
          "play_time": 5990
      },
      {
          "name": "SteamVR Collectibles",
          "play_time": 2840
      },
      {
          "name": "PvP",
          "play_time": 2626
      },
      {
          "name": "Online Co-op",
          "play_time": 2263
      },
      {
          "name": "Steam Trading Cards",
          "play_time": 6430
      },
      {
          "name": "Online PvP",
          "play_time": 2626
      },
      {
          "name": "Cross-Platform Multiplayer",
          "play_time": 3011
      },
      {
          "name": "Stats",
          "play_time": 3200
      },
      {
          "name": "Remote Play on TV",
          "play_time": 2963
      },
      {
          "name": "Captions available",
          "play_time": 219
      },
      {
          "name": "Commentary available",
          "play_time": 53
      },
      {
          "name": "Single-player",
          "play_time": 2533
      },
      {
          "name": "Remote Play Together",
          "play_time": 1822
      },
      {
          "name": "LAN PvP",
          "play_time": 116
      },
      {
          "name": "Multi-player",
          "play_time": 6817
      },
      {
          "name": "Steam Achievements",
          "play_time": 2734
      },
      {
          "name": "In-App Purchases",
          "play_time": 4062
      },
      {
          "name": "Full controller support",
          "play_time": 2295
      },
      {
          "name": "Steam Cloud",
          "play_time": 2445
      },
      {
          "name": "LAN Co-op",
          "play_time": 235
      },
      {
          "name": "Includes level editor",
          "play_time": 295
      },
      {
          "name": "Valve Anti-Cheat enabled",
          "play_time": 4001
      },
      {
          "name": "Shared/Split Screen PvP",
          "play_time": 1785
      },
      {
          "name": "Shared/Split Screen Co-op",
          "play_time": 1822
      },
      {
          "name": "Partial Controller Support",
          "play_time": 211
      },
      {
          "name": "Tracked Controller Support",
          "play_time": 28
      },
      {
          "name": "Co-op",
          "play_time": 5177
      },
      {
          "name": "Shared/Split Screen",
          "play_time": 1822
      }
  ],
  "genres": [
      {
          "name": "Action",
          "play_time": 6475
      },
      {
          "name": "Strategy",
          "play_time": 3156
      },
      {
          "name": "Indie",
          "play_time": 2105
      },
      {
          "name": "Adventure",
          "play_time": 788
      },
      {
          "name": "RPG",
          "play_time": 499
      },
      {
          "name": "Early Access",
          "play_time": 29
      },
      {
          "name": "Free to Play",
          "play_time": 4474
      },
      {
          "name": "Racing",
          "play_time": 1757
      },
      {
          "name": "Sports",
          "play_time": 1757
      },
      {
          "name": "Massively Multiplayer",
          "play_time": 463
      },
      {
          "name": "Simulation",
          "play_time": 294
      },
      {
          "name": "Casual",
          "play_time": 56
      }
  ],
  "games": [
      {
          "name": "Dota 2",
          "play_time": 2840
      },
      {
          "name": "Rocket League",
          "play_time": 1757
      },
      {
          "name": "Counter-Strike 2",
          "play_time": 992
      },
      {
          "name": "Black Desert (Retired)",
          "play_time": 350
      },
      {
          "name": "PUBG: BATTLEGROUNDS",
          "play_time": 348
      },
      {
          "name": "Garry's Mod",
          "play_time": 116
      },
      {
          "name": "Apex Legends",
          "play_time": 98
      },
      {
          "name": "Baldur's Gate 3",
          "play_time": 82
      },
      {
          "name": "Paladins",
          "play_time": 79
      },
      {
          "name": "The Elder Scrolls V: Skyrim",
          "play_time": 72
      },
      {
          "name": "Terraria",
          "play_time": 62
      },
      {
          "name": "The Witcher 3: Wild Hunt",
          "play_time": 60
      },
      {
          "name": "Grand Theft Auto V",
          "play_time": 54
      },
      {
          "name": "Team Fortress 2",
          "play_time": 53
      },
      {
          "name": "Age of Empires II (2013)",
          "play_time": 50
      },
      {
          "name": "Mount & Blade II: Bannerlord",
          "play_time": 48
      },
      {
          "name": "Borderlands 2",
          "play_time": 38
      },
      {
          "name": "Cyberpunk 2077",
          "play_time": 38
      },
      {
          "name": "Stardew Valley",
          "play_time": 37
      },
      {
          "name": "Hurtworld",
          "play_time": 36
      },
      {
          "name": "Ring of Elysium",
          "play_time": 36
      },
      {
          "name": "Mount & Blade: Warband",
          "play_time": 34
      },
      {
          "name": "Satisfactory",
          "play_time": 29
      },
      {
          "name": "Tabletop Simulator",
          "play_time": 28
      },
      {
          "name": "AdVenture Capitalist",
          "play_time": 28
      }
  ]
}
