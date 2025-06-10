import { useEffect, useState } from 'react';

function Weather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const getWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=ru`
      );
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError('Ошибка при получении погоды по координатам');
    }
  };

  const getWeatherByCity = async (city = 'Moscow') => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=ru`
      );
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError('Ошибка при получении погоды по городу');
    }
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          getWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.warn('Геолокация не предоставлена, используем Москву');
          getWeatherByCity();
        }
      );
    } else {
      getWeatherByCity();
    }
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Загрузка погоды...</div>;

  return (
    <div>
      <h2>Погода в {data.name}</h2>
      <p>{data.weather[0].description}, {data.main.temp}°C</p>
    </div>
  );
}

export default Weather;
