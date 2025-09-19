const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

exports.pool = pool;

exports.connect = async () => {
  try {
    await pool.query('SELECT 1');
    console.log("✅ Database Connected ('_')");

      await pool.query(`
      CREATE TABLE IF NOT EXISTS pos_requests (
      id SERIAL PRIMARY KEY,
      zone VARCHAR(50),
      supervisor VARCHAR(100),
      ebizstaff VARCHAR(100),
      visited VARCHAR(10),
      branch VARCHAR(100),
      requestOption VARCHAR(50),
      merchantEmail VARCHAR(100),
      merchantName VARCHAR(100),
      address TEXT,
      state VARCHAR(50),
      lga VARCHAR(100),
      numPos INT,
      businessType VARCHAR(100),
      contactName VARCHAR(100),
      accountTypes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tables checked/created");

  } catch (error) {
    console.log("❌ Connection to database failed");
    console.error(error);
    process.exit(1);
  }
}
