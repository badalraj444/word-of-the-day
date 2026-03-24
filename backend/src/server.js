import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let retries = 5;

  while (retries) {
    try {
      const res = await pool.query("SELECT NOW()");
      console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);

      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });

      break; // success → exit loop
    } catch (err) {
      console.log("⏳ Database not ready, retrying in 2 seconds...");
      retries--;

      if (retries === 0) {
        console.error("❌ Could not connect to database. Exiting...");
        process.exit(1);
      }

      await new Promise((res) => setTimeout(res, 2000));
    }
  }
};

startServer();
