const express = require("express");
const router = express.Router();
const controls = require('../controller/controls');



router.post('/', controls.createNewPos);
router.get('/download', controls.downloadExcel);



// router.get("/download", async (req, res) => {
//   try {
//     const { rows } = await db.query("SELECT * FROM pos_requests ORDER BY id DESC");

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("POS Requests");

//     worksheet.columns = [
//       { header: "ID", key: "id", width: 10 },
//       { header: "Zone", key: "zone", width: 15 },
//       { header: "Supervisor", key: "supervisor", width: 20 },
//       { header: "Ebiz Staff", key: "ebizstaff", width: 20 },
//       { header: "Visited", key: "visited", width: 10 },
//       { header: "Branch", key: "branch", width: 20 },
//       { header: "Request Option", key: "requestoption", width: 20 },
//       { header: "Merchant Email", key: "merchantemail", width: 30 },
//       { header: "Merchant Name", key: "merchantname", width: 25 },
//       { header: "Address", key: "address", width: 30 },
//       { header: "State", key: "state", width: 15 },
//       { header: "LGA", key: "lga", width: 20 },
//       { header: "No. POS", key: "numpos", width: 10 },
//       { header: "Business Type", key: "businesstype", width: 20 },
//       { header: "Contact Name", key: "contactname", width: 20 },
//       { header: "Account Types", key: "accounttypes", width: 25 },
//       { header: "Created At", key: "created_at", width: 25 }
//     ];

//     rows.forEach(row => worksheet.addRow(row));

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=pos_requests.xlsx"
//     );

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error("❌ Excel export error:", err);
//     res.status(500).json({ error: "Excel export failed", detail: err.message });
//   }
// });

module.exports = router;
