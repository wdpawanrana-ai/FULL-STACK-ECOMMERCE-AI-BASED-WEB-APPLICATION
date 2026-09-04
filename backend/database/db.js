import pkg from "pg";
import { config } from "dotenv";
const { Pool } = pkg;
config({ path: "./config/config.env" });

const database = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Prevent the process from crashing when Postgres drops an idle connection
database.on("error", (err) => {
  console.error("Unexpected PG pool error (handled, not crashing):", err.message);
});

// Optional: verify connectivity on startup without holding a client open
try {
  const client = await database.connect();
  console.log("Connected to the database successfully");
  client.release();
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

export default database;