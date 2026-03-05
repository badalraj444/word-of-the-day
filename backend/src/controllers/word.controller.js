import pool from '../config/db.js'; // Import the database connection pool
import 'dotenv/config';


export const getWords = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM words;');
        // PostgreSQL returns the data in result.rows
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching words:', error);
        res.status(500).json({ error: 'An error occurred while fetching words' });
    }
};

// export const getWordOfTheDay = async (req, res) => {
//     try{
//         //map id for today
//         const today = new Date();
//         const days = today - process.env.START_DATE;
//         const id = days % process.env.TOTAL_WORDS;
//         //query word
//         const result = await pool.query(`SELECT * FROM words WHERE id = ${id}`);
//         res.json(result.rows);
//     }catch{
//         //
//         console.error('Error fetching word of the day:', error);
//         res.status(500).json({ error: 'An error occurred while fetching word of the day' });
//     }
// };

export const getWordOfTheDay = async (req, res) => {
    try {
        // 1. Calculate the ID based on the date
        const today = new Date().setHours(0, 0, 0, 0); // Normalize to start of today
        const startDate = new Date(process.env.START_DATE).getTime();
        // console.log(`Today's date (ms): ${today}`);
        // console.log(`Start date (ms): ${startDate}`);
        
        // Difference in days (1000ms * 60s * 60m * 24h)
        const msInDay = 24 * 60 * 60 * 1000;
        const daysPassed = Math.floor((today - startDate) / msInDay);
        // console.log(`Days passed since start date: ${daysPassed}`);
        
        // Use modulo to cycle through your total word count
        const totalWords = parseInt(process.env.TOTAL_WORDS);
        const index = daysPassed % totalWords;
        // console.log(`Calculated ID for word of the day: ${id}`);
        // 2. Parameterized query to prevent SQL injection
        const result = await pool.query('SELECT * FROM words OFFSET $1 LIMIT 1;', [index]);

        // 3. Return the single word 
        res.json(result.rows[0]); 

    } catch (error) { // Added 'error' here so we can actually log it
        console.error('Error fetching word of the day:', error);
        res.status(500).json({ error: 'An error occurred while fetching word of the day' });
    }
};
