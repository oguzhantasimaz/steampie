# Spotify Pie Functions

The Steam Pie project aims to provide users with a visually appealing graph representation of their gameplay data. By accessing the project website users can get their data by entering their steam id.

## Getting Started

1. Make sure you have a Steam account and that your profile is public.

2. Go to the [Steam Id Finder](https://steamidfinder.com/) and enter your Steam username. Copy the Steam ID 64.

3. Go to the [Steam Pie](https://steampie.vercel.app) website and paste your Steam ID 64 in the input field.

4. Click on the "Bring my PIE!" button and wait for the data to load.

## Frontend 

The frontend was developed using ReactJS and the [React ChartJS 2](https://www.chartjs.org/docs/latest/) library. The website is hosted on [Vercel](https://vercel.com/).

## Backend

The backend was developed using Golang and GCP's [Cloud Functions](https://cloud.google.com/functions).

[Backend Repository](https://github.com/oguzhantasimaz/steampie-func)