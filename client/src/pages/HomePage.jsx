import { useEffect, useState } from 'react'; //  Import useEffect
import { getWordOfTheDay } from '../lib/api';

const HomePage = () => {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  //  Use useEffect to fetch data once on mount
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await getWordOfTheDay();
        console.log(res);
        setWord(res);
      } catch (error) {
        console.error("Failed to fetch word:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, []); // The empty array [] means "run only once"

  // Handle the UI states 
  if (loading) {
    return <>Getting word....</>;
  }

  if (!word) {
    return <>No word found for today.</>;
  }

  return (
    <div className='homepage'>
      <div>
        <h1 className='title'>Word of the day...</h1>
      </div>
      <br/>
      <div className='word-container'>
      <h2>Word: {word.word}</h2>
      <h3>Meaning: {word.meaning}</h3>
      <p><em>Example: {word.example}</em></p>
    </div>
    </div>
  );
};

export default HomePage;