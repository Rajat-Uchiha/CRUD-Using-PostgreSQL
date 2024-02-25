import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default pool;
