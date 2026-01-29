🌤️ Meoweather

Meoweather is a cozy, animated weather web app that delivers real-time data with a playful, character-driven UI. By combining clean JavaScript logic with whimsical design, it transforms a routine task into a delightful experience.

✨ Features

    🔍 Global Search: Find real-time weather data for any city.

    📍 Geolocation: Automatic weather detection based on user location.

    🌞 Dynamic Themes: Day and Night modes trigger automatically based on local sunrise/sunset times.

    🐱 Reactive Character: An animated SVG mascot that changes its vibe based on the time of day.

    💾 Persistent Data: Remembers your last searched city using localStorage.

    📱 Mobile First: Fully responsive design that looks great on any device.

🛠️ Built With

    HTML5 & CSS3: Custom animations and responsive layouts.

    Vanilla JavaScript (ES6+): Clean, dependency-free logic.

    OpenWeatherMap API: Reliable global weather data.

    Vite: High-performance development and bundling.

🚀 How It Works

    Initial Load: The app requests location permission to show local weather immediately.

    Fallback: If location is denied, the UI defaults to a search-ready state.

    Solar Logic: The app compares the current time against the sunrise and sunset UNIX timestamps from the API to toggle themes.

    UI Updates: JavaScript dynamically manipulates the DOM to swap SVG states and weather icons without a page reload.

▶️ Getting Started
1. Clone the repository

git clone https://github.com/your-username/meoweather.git
cd meoweather

2. Install dependencies

npm install

3. Set up your API Key

Create a .env file in the root directory and add your OpenWeatherMap API key:

VITE_WEATHER_API_KEY=your_api_key_here

4. Run the project
Bash

npm run dev

📸 Preview
Day Mode	
![Day Mode](/images/screenshot-dayMode.png) 

Night Mode

![Night Mode](/images/screenshot-nightMode.png)


💙 Author

Built with care by Aya ✨