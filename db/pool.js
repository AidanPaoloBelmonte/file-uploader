import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.SQL_PORT}/${process.env.DATABASE}`;

export default new Pool({
  connectionString: connectionString,
});
