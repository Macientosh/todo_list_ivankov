import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AirQualityWidget = () => {
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_AIR_QUALITY_OPEN_DATA_PLATFORM_API_KEY;

  const fetchAQI = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.data.status === 'ok') {
        setAqiData(response.data.data);
      } else {
        setError('Ошибка при получении данных');
      }
    } catch (err) {
      setError('Ошибка сети или API');
    } finally {
      setLoading(false);
    }
  };

  const getLocationByIP = async () => {
    try {
      const response = await axios.get('http://ip-api.com/json/?fields=status,message,lat,lon,city');
      if (response.data.status === 'success') {
        const { lat, lon } = response.data;
        return `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${apiKey}`;
      }
      throw new Error(response.data.message || 'Не удалось определить местоположение');
    } catch (err) {
      console.warn('Ошибка определения местоположения по IP:', err.message);
      return `https://api.waqi.info/feed/Moscow/?token=${apiKey}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = await getLocationByIP();
      fetchAQI(url);
    };

    fetchData();
  }, [apiKey]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!aqiData) return <div>Нет данных</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '10px' }}>
      <h3>Качество воздуха в {aqiData.city.name}</h3>
      <p>AQI: {aqiData.aqi}</p>
      <p>PM2.5: {aqiData.iaqi.pm25?.v ?? 'Нет данных'}</p>
      <p>Температура: {aqiData.iaqi.t?.v ?? 'Нет данных'} °C</p>
      <small>Обновлено: {new Date(aqiData.time.s).toLocaleString()}</small>
    </div>
  );
};

export default AirQualityWidget;