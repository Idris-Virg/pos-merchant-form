const service = require('../services/services');


exports.createNewPos = async (req, res) => {
    const {
        zone, supervisor, ebizstaff, visited, branch,
        requestOption, merchantEmail, merchantName,
        address, state, lga, numPos, businessType,
        contactName, accountTypes
    } = req.body;

    try {
        const payload = await service.createPos(zone, supervisor, ebizstaff, visited, branch,
        requestOption, merchantEmail, merchantName, address, state, lga, numPos, businessType,
        contactName, accountTypes)
        res.status(200).json(payload);
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

exports.downloadExcel = async (req, res) => {
    try {
        const buffer = await service.downloadExcel();
        
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=pos_requests.xlsx"
        );
        
        res.send(buffer);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

// app.get('/download-excel', async (req, res) => {
//     try {
//         const buffer = await downloadExcel();
        
//         res.setHeader(
//             "Content-Type",
//             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         );
//         res.setHeader(
//             "Content-Disposition",
//             "attachment; filename=pos_requests.xlsx"
//         );
        
//         res.send(buffer);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });