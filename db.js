const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'access_transaction',
  password: 'Root',
  port: 5432,
});  

async function initDb() {
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
}    

initDb().catch(err => console.error("DB init error:", err));

module.exports = pool;
