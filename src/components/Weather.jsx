import { useEffect, useState } from 'react';

function Weather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Выносим ключ в переменную для удобства отладки
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherByCoords = async (lat, lon) => {
    try {
      if (!apiKey) {
        throw new Error('API key is missing');
      }
      
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=ru`;
      console.log('Fetching URL:', url); // Для отладки
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(`Ошибка при получении погоды: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    
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

  if (loading) return <div>Загрузка погоды...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>Нет данных о погоде</div>;

  return (
    <div>
      <h2>Погода в {data.name}</h2>
      <p>
        {data.weather[0].description}, {data.main.temp}°C
        <img
          src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="иконка погоды"
        />
      </p>
      <p>Ветер: {data.wind.speed} м/с</p>
      <p>Облачность: {data.clouds.all}%</p>
    </div>
  );  
}

export default Weather;