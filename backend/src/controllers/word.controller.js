import "dotenv/config";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import pool from "../config/db.js"; // Import the database connection pool
import cache from "../utils/cache.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Add ".." to move up from 'controllers' to 'src'
const cachePath = path.join(__dirname, "..", "utils", "cache.json");

export const getWords = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM words;");
    // PostgreSQL returns the data in result.rows
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ error: "An error occurred while fetching words" });
  }
};

export async function getWordOfTheDay(req, res) {
  //check cache
  // 1. Normalize today's date to a string (YYYY-MM-DD) for easy comparison
  const todayStr = new Date().toISOString().split("T")[0];

  // 2. Compare strings to strings
  if (cache.date === todayStr) {
    console.log("Cache hit!");
    return res.status(200).json(cache.cacheword);
  }
  //cache miss
  try {
    console.log("cache miss. querying database...");
    // 1. Calculate the ID based on the date
    const today = new Date().setHours(0, 0, 0, 0);
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
    // console.log(`Calculated ID for word of the day: ${index}`);
    // 2. Parameterized query to prevent SQL injection
    const result = await pool.query("SELECT * FROM words OFFSET $1 LIMIT 1;", [
      index,
    ]);

    //write cache

    const newWord = result.rows[0];

    // 3. Update the object
    cache.cacheword = newWord;
    cache.date = todayStr;

    // 4. Use the absolute path to write
    fs.writeFile(cachePath, JSON.stringify(cache, null, 2), (err) => {
      if (err) console.error("FileSystem Error:", err);
      else console.log("Cache file updated on disk.");
    });

    res.json(newWord);
  } catch (error) {
    // Added 'error' here so we can actually log it
    console.error("Error fetching word of the day:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching word of the day" });
  }
}

export async function addWord(req, res) {
  if (!req.body) return res.status(400).json({ message: "Data is required!" });
  const { word, meaning, example } = req.body;

  // 1. Check for missing required fields (NOT NULL in your schema)
  if (!word || !meaning) {
    return res.status(400).json({ error: "Word and meaning are required." });
  }

  // 2. Validate 'word' length (Matches VARCHAR(100))
  if (word.length > 100) {
    return res
      .status(400)
      .json({ error: "Word must be 100 characters or less." });
  }

  // 3. Ensure 'meaning' isn't just whitespace
  if (meaning.trim().length === 0) {
    return res.status(400).json({ error: "Meaning cannot be empty." });
  }

  // 4. Validate types (Ensuring they are strings)
  if (typeof word !== "string" || typeof meaning !== "string") {
    return res.status(400).json({ error: "Invalid data format." });
  }
  //try inserting in db and respond accordingly
  try {
    //
    const query = `
    INSERT INTO words(word, meaning, example)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const values = [
      word.trim(),
      meaning.trim(),
      example ? example.trim() : null,
    ];

    const result = await pool.query(query, values);
    console.log("Added a new word!");

    res
      .status(201)
      .json({ message: "Word added successfully!", data: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      console.warn("Attempted to add a duplicate word:", word);
      return res.status(409).json({
        error: "Word already exists",
      });
    }
    console.error("Database Insertion Error:", error);

    // Handle specific DB errors (like unique constraint violations if you add them later)
    return res.status(500).json({
      error: "An internal server error occurred while saving the word.",
    });
  }
}
