import request from "supertest";
import app from "../app.js";
import pool from "../config/db.js";

describe("Word API Tests", () => {

  test("GET /api/words returns an array of words", async () => {
    const response = await request(app).get('/api/words');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/today returns a word object", async () => {
    const result = await request(app).get('/api/today');

    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(typeof result.body.word).toBe("string");
    expect(typeof result.body.meaning).toBe("string");
  });

  test("POST /api/word returns success for a new word", async () => {
    const testWord = "test_" + Date.now();

    const result = await request(app)
      .post('/api/word')
      .send({
        word: testWord,
        meaning: "Test meaning",
        example: "Test example"
      });

    expect([200, 201]).toContain(result.status);

    // 🔥 Cleanup: delete only this word
    await pool.query("DELETE FROM words WHERE word = $1", [testWord]);
  });

  test("POST /api/word returns 409 for duplicate word", async () => {
    const testWord = "test_" + Date.now();

    const wordData = {
      word: testWord,
      meaning: "Test meaning",
      example: "Test example"
    };

    // First insert
    await request(app).post('/api/word').send(wordData);

    // Duplicate insert
    const result = await request(app).post('/api/word').send(wordData);

    expect(result.status).toBe(409);

    // 🔥 Cleanup: delete only this word
    await pool.query("DELETE FROM words WHERE word = $1", [testWord]);
  });

});