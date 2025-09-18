const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ExcelJS = require("exceljs");

router.get("/", (req, res) => {
  res.json({ message: "POS API is working 🚀" });
});

db.query(`
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
`).catch(err => console.error("❌ Error creating table:", err.message));

router.post("/", async (req, res) => {
  const {
    zone, supervisor, ebizstaff, visited, branch,
    requestOption, merchantEmail, merchantName,
    address, state, lga, numPos, businessType,
    contactName, accountTypes
  } = req.body;

  try {
    const sql = `
      INSERT INTO pos_requests (
        zone, supervisor, ebizstaff, visited, branch, 
        requestOption, merchantEmail, merchantName, 
        address, state, lga, numPos, businessType, 
        contactName, accountTypes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *;
    `;

    const values = [
      zone, supervisor, ebizstaff, visited, branch,
      requestOption, merchantEmail, merchantName,
      address, state, lga, numPos, businessType,
      contactName, JSON.stringify(accountTypes)
    ];

    const result = await db.query(sql, values);

    res.status(201).json({
      message: "✅ Request saved successfully",
      data: result.rows[0]
    });
  } catch (err) {
    console.error("❌ Error inserting:", err);
    res.status(500).json({ error: "Database error", detail: err.message });
  }
});

router.get("/download", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM pos_requests ORDER BY id DESC");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("POS Requests");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Zone", key: "zone", width: 15 },
      { header: "Supervisor", key: "supervisor", width: 20 },
      { header: "Ebiz Staff", key: "ebizstaff", width: 20 },
      { header: "Visited", key: "visited", width: 10 },
      { header: "Branch", key: "branch", width: 20 },
      { header: "Request Option", key: "requestoption", width: 20 },
      { header: "Merchant Email", key: "merchantemail", width: 30 },
      { header: "Merchant Name", key: "merchantname", width: 25 },
      { header: "Address", key: "address", width: 30 },
      { header: "State", key: "state", width: 15 },  
      { header: "LGA", key: "lga", width: 20 },
      { header: "No. POS", key: "numpos", width: 10 },
      { header: "Business Type", key: "businesstype", width: 20 },
      { header: "Contact Name", key: "contactname", width: 20 },
      { header: "Account Types", key: "accounttypes", width: 25 },
      { header: "Created At", key: "created_at", width: 25 }
    ]; 

    rows.forEach(row => worksheet.addRow(row)); 

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=pos_requests.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("❌ Excel export error:", err);
    res.status(500).json({ error: "Excel export failed", detail: err.message });
  }
});

module.exports = router;
