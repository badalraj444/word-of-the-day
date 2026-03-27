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
    return <>
      <div className='loading-page'>
        <p className='loading-message'>Loading word of the day....</p>
      </div>
    </>;
  }

  if (!word) {
    console.log("No word found!")
    return <>
      <div className='loading-page'>
        <p className='notfound-message'>No word found for today!</p>
      </div>
    </>;
  }
  return (
    <div className='homepage'>

      <h1 className='title'>Word of the day...</h1>


      <div className='word-container'>
        <h2>Word: {word.word}</h2>
        <h3>Meaning: {word.meaning}</h3>
        <p><em>Example: {word.example}</em></p>
      </div>
    </div>
  );
};

export default HomePage;