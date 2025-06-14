import React, { useEffect, useState } from 'react';

function RandomWord() {
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_MERRIAM_WEBMASTER_DICT_API_KEY;

  const getRandomWord = () => {
    if (wordList.length === 0) return '';
    const index = Math.floor(Math.random() * wordList.length);
    return wordList[index];
  };

  const fetchDefinition = async (wordToFetch) => {
    try {
      const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/sd2/json/${wordToFetch}?key=${apiKey}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].shortdef) {
        setWord(data[0].hwi?.hw || wordToFetch);
        setDefinitions(data[0].shortdef);
      } else {
        setWord(wordToFetch);
        setDefinitions(['No definitions found.']);
      }
    } catch (err) {
      console.error('Ошибка при получении данных:', err);
      setDefinitions(['Ошибка при загрузке определения.']);
    } finally {
      setLoading(false);
    }
  };

  const loadAndFetch = async () => {
    try {
      const res = await fetch('/words.json');
      const words = await res.json();
      setWordList(words);
      const random = words[Math.floor(Math.random() * words.length)];
      fetchDefinition(random);
    } catch (err) {
      console.error('Ошибка при загрузке словаря:', err);
      setDefinitions(['Ошибка при загрузке словаря.']);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAndFetch();
  }, []);

  const handleNewWord = () => {
    if (wordList.length === 0) return;
    setLoading(true);
    const random = getRandomWord();
    fetchDefinition(random);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Слово дня</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2 capitalize">{word}</h2>
          <ul className="list-disc list-inside text-gray-700">
            {definitions.map((def, i) => (
              <li key={i}>{def}</li>
            ))}
          </ul>
          <button
            onClick={handleNewWord}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Другое слово
          </button>
        </div>
      )}
    </div>
  );
}

export default RandomWord;
