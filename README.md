# 🌤️ Meoweather

Meoweather is a cozy, animated weather web app that shows real-time weather data with a playful and friendly UI.  
It combines clean JavaScript logic with a character-driven design to make checking the weather feel less boring.

---

## ✨ Features

- 🔍 Search weather by city name
- 📍 Automatic weather based on user location (with permission)
- 🌞 Day / 🌙 Night mode based on real sunrise & sunset times
- 🐱 Animated SVG character that reacts to time of day
- 💾 Saves last searched city using localStorage
- 📱 Fully responsive design

---

## 🛠️ Built With

- HTML5
- CSS3 (animations, responsive layout)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API
- Vite (for development & bundling)

---

## 🚀 How It Works

- On first visit, the app tries to use the user's location to show local weather.
- If location access is denied, the user can manually search for a city.
- The app calculates day/night mode using timezone, sunrise, and sunset data.
- Weather icons and UI update dynamically based on conditions.

---

## ▶️ Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/meoweather.git

2.Install dependencies
```bash
npm install

3. Create a .env file and add your API key
```env
VITE_WEATHER_API_KEY=your_api_key_here

4. Run the project
```bash
npm run dev

---
📸 Preview:

![Day Mode](/images/screenshot-dayMode.png)
![Night Mode](/images/screenshot-nightMode.png)


💙 Author

Built with care by Aya ✨


