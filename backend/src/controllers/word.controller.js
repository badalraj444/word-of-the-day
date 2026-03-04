import pool from '../config/db.js'; // Import the database connection pool

// Controller function to get all words from the database   

// export const getWords = async (req, res) =>{
//     try{
//         const [rows] = await pool.query('SELECT * FROM words;');
//         res.json(rows); // Send the retrieved words as a JSON response
//     }catch(error){
//         console.error('Error fetching words:', error);
//         res.status(500).json({ error: 'An error occurred while fetching words' }); // Send an error response if something goes wrong
//     }
// };

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
