const ExcelJS = require("exceljs");
const model = require('../models/model');


async function createPos(zone, supervisor, ebizstaff, visited, branch, requestOption, merchantEmail, merchantName, address, state, lga, numPos, businessType, contactName, accountTypes) {
    try {
        const response = await model.createPosRequest(
            zone, supervisor, ebizstaff, visited, branch,
            requestOption, merchantEmail, merchantName,
            address, state, lga, numPos, businessType,
            contactName, accountTypes
        )
        return response
    } catch (err) {
        throw new Error(err)
    }
}


async function downloadExcel() {
    try {
        const response = await model.getExcel();

        console.log("Result: ", response);

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

        // Add data rows
        response.forEach(row => worksheet.addRow(row));

        // Optional: Add some styling to the header row
        worksheet.getRow(1).font = { bold: true };
        
        // Optional: Freeze the header row so it stays visible when scrolling
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
        
    } catch (err) {
        console.error("❌ Excel export error:", err);
        // Fixed the error throwing - use template literal instead of object
        throw new Error(`Excel export failed: ${err.message}`);
    }
}


module.exports = { createPos, downloadExcel }