import router from 'express'; // Import the Express router
import { getWords, getWordOfTheDay } from '../controllers/word.controller.js';

const wordRouter = router(); // Create a router instance

wordRouter.get('/words', getWords); // Define a route to get all words
wordRouter.get('/today',getWordOfTheDay);

export default wordRouter;