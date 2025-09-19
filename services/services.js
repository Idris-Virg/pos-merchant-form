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
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("POS Requests");

        // Define columns
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

        // Map database fields to Excel keys
        response.forEach(dbRow => {
            const excelRow = {
                id: dbRow.id,
                zone: dbRow.zone,
                supervisor: dbRow.supervisor,
                ebizstaff: dbRow.ebizstaff,
                visited: dbRow.visited,
                branch: dbRow.branch,
                requestoption: dbRow.requestoption || dbRow.requestOption, // handle both cases
                merchantemail: dbRow.merchantemail || dbRow.merchantEmail,
                merchantname: dbRow.merchantname || dbRow.merchantName,
                address: dbRow.address,
                state: dbRow.state,
                lga: dbRow.lga,
                numpos: dbRow.numpos || dbRow.numPos,
                businesstype: dbRow.businesstype || dbRow.businessType,
                contactname: dbRow.contactname || dbRow.contactName,
                accounttypes: dbRow.accounttypes || dbRow.accountTypes,
                created_at: dbRow.created_at
            };
            
            worksheet.addRow(excelRow);
        });

        // Style
        worksheet.getRow(1).font = { bold: true };
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;

    } catch (err) {
        console.error("Excel generation error:", err);
        throw err;
    }
}


// async function downloadExcel() {
//     try {
//         const response = await model.getExcel();
//         console.log("Data received from DB:", response);

//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet("POS Requests");

//         // Define columns (make sure keys match your database fields)
//         worksheet.columns = [
//             { header: "ID", key: "id", width: 10 },
//             { header: "Zone", key: "zone", width: 15 },
//             { header: "Supervisor", key: "supervisor", width: 20 },
//             { header: "Ebiz Staff", key: "ebizstaff", width: 20 },
//             { header: "Visited", key: "visited", width: 10 },
//             { header: "Branch", key: "branch", width: 20 },
//             { header: "Request Option", key: "requestoption", width: 20 },
//             { header: "Merchant Email", key: "merchantemail", width: 30 },
//             { header: "Merchant Name", key: "merchantname", width: 25 },
//             { header: "Address", key: "address", width: 30 },
//             { header: "State", key: "state", width: 15 },
//             { header: "LGA", key: "lga", width: 20 },
//             { header: "No. POS", key: "numpos", width: 10 },
//             { header: "Business Type", key: "businesstype", width: 20 },
//             { header: "Contact Name", key: "contactname", width: 20 },
//             { header: "Account Types", key: "accounttypes", width: 25 },
//             { header: "Created At", key: "created_at", width: 25 }
//         ];

//         // Add data rows - ensure data matches column keys
//         response.forEach(row => {
//             worksheet.addRow({
//                 id: row.id,
//                 zone: row.zone,
//                 supervisor: row.supervisor,
//                 ebizstaff: row.ebizstaff,
//                 visited: row.visited,
//                 branch: row.branch,
//                 requestoption: row.requestoption,
//                 merchantemail: row.merchantemail,
//                 merchantname: row.merchantname,
//                 address: row.address,
//                 state: row.state,
//                 lga: row.lga,
//                 numpos: row.numpos,
//                 businesstype: row.businesstype,
//                 contactname: row.contactname,
//                 accounttypes: row.accounttypes,
//                 created_at: row.created_at
//             });
//         });

//         // Style header row
//         worksheet.getRow(1).font = { bold: true };
//         worksheet.views = [{ state: 'frozen', ySplit: 1 }];

//         console.log('Download Done')

//         // Return buffer
//         const buffer = await workbook.xlsx.writeBuffer();

//         console.log('Download Done:', buffer)
//         return buffer;

//     } catch (err) {
//         console.error("❌ Service layer error:", err);
//         throw new Error(`Excel export failed: ${err.message}`);
//     }
// }


module.exports = { createPos, downloadExcel }