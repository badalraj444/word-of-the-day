import router from "express"; // Import the Express router
import {
  addWord,
  addWords,
  getWordOfTheDay,
  getWords,
} from "../controllers/word.controller.js";

const wordRouter = router(); // Create a router instance

wordRouter.get("/words", getWords); // Define a route to get all words
wordRouter.get("/today", getWordOfTheDay);
wordRouter.post("/addword", addWord);
wordRouter.post("/addwords", addWords);

export default wordRouter;
