const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "postgres",         
  password: "Root",         
  database: "merchantpos"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database.");
  }
});

module.exports = db;
