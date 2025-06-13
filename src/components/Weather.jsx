import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AirQualityWidget = ({ city = 'Moscow' }) => {
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_AIR_QUALITY_OPEN_DATA_PLATFORM_API_KEY;

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${apiKey}`);
        if (response.data.status === 'ok') {
          setAqiData(response.data.data);
        } else {
          setError('Ошибка при получении данных');
        }
      } catch (err) {
        setError('Ошибка сети или API');
      }
    };

    fetchAQI();
  }, [city]);

  if (error) return <div>Ошибка: {error}</div>;
  if (!aqiData) return <div>Загрузка...</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '10px' }}>
      <h3>Качество воздуха в {city}</h3>
      <p>AQI: {aqiData.aqi}</p>
      <p>PM2.5: {aqiData.iaqi.pm25?.v ?? 'Нет данных'}</p>
      <p>Температура: {aqiData.iaqi.t?.v ?? 'Нет данных'} °C</p>
      <small>Обновлено: {new Date(aqiData.time.s).toLocaleString()}</small>
    </div>
  );
};

export default AirQualityWidget;

// import { useEffect, useState } from 'react';

// function Weather() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Выносим ключ в переменную для удобства отладки
//   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

//   const getWeatherByCoords = async (lat, lon) => {
//     try {
//       if (!apiKey) {
//         throw new Error('API key is missing');
//       }

//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=ru`;

//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const json = await res.json();
//       setData(json);
//     } catch (e) {
//       setError(`Ошибка при получении погоды: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getWeatherByCity = async (city = 'Москва') => {
//     try {
//       if (!apiKey) {
//         throw new Error('API key is missing');
//       }

//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=ru`;

//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const json = await res.json();
//       setData(json);
//     } catch (e) {
//       setError(`Ошибка при получении погоды: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           getWeatherByCoords(latitude, longitude);
//         },
//         (err) => {
//           console.warn('Геолокация не предоставлена, используем Москву');
//           getWeatherByCity();  // По умолчанию получаем погоду для Москвы
//         }
//       );
//     } else {
//       getWeatherByCity();  // В случае если геолокация не поддерживается
//     }
//   }, []);

//   if (loading) return <div>Загрузка погоды...</div>;
//   if (error) return <div>{error}</div>;
//   if (!data) return <div>Нет данных о погоде</div>;

//   return (
//     <div>
//       <h2>Погода в {data.name}</h2>
//       <p>
//         {data.weather[0].description}, {data.main.temp}°C
//         <img
//           src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
//           alt="иконка погоды"
//         />
//       </p>
//       <p>Ветер: {data.wind.speed} м/с</p>
//       <p>Облачность: {data.clouds.all}%</p>
//     </div>
//   );
// }

// export default Weather;
