import express from 'express';
import request  from 'supertest';


const app = express();

app.get("/api/test", async (req, res) => {
  res.status(200).json({ "message": "hello world" });
});

// The Test Block
test("GET /api/test returns hello world", async () => {
  const response = await request(app).get("/api/test");

  // Using Jest assertions for clarity
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("hello world");
});