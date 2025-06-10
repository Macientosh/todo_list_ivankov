import { useEffect, useState } from 'react';

function CurrencyRates() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const json = await res.json();
      setRates(json.Valute);
    };

    fetchRates();
  }, []);

  if (!rates) return <div>Загрузка курса валют...</div>;

  return (
    <div>
      <h2>Курс валют (ЦБ РФ)</h2>
      <p>USD: {rates.USD.Value.toFixed(2)} ₽</p>
      <p>EUR: {rates.EUR.Value.toFixed(2)} ₽</p>
      <p>CNY: {rates.CNY.Value.toFixed(2)} ₽</p>
    </div>
  );
}

export default CurrencyRates;
