import { useEffect, useState } from 'react';

function Weather() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=ru`);
      const json = await res.json();
      setData(json);
    };

    fetchWeather();
  }, []);

  if (!data) return <div>Загрузка погоды...</div>;

  return (
    <div>
      <h2>Погода в Москве</h2>
      <p>{data.weather[0].description}, {data.main.temp}°C</p>
    </div>
  );
}

export default Weather;
