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
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
        
        res.send(buffer);
        console.log("Test file sent successfully");
        
    } catch (error) {
        console.error("Test download failed:", error);
        res.status(500).send("Error: " + error.message);
    }
}
