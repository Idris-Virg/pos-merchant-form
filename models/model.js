const { pool } = require('../config/db');

module.exports = {
    async createPosRequest(zone, supervisor, ebizstaff, visited, branch,
        requestOption, merchantEmail, merchantName,
        address, state, lga, numPos, businessType,
        contactName, accountTypes) {
        const result = await pool.query(
            `INSERT INTO pos.pos_requests (zone, supervisor, ebizstaff, visited, 
            branch,requestOption, merchantEmail, merchantName, address, state, 
            lga, numPos, businessType, contactName, accountTypes) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`, [zone, supervisor, ebizstaff, visited, branch,
            requestOption, merchantEmail, merchantName,
            address, state, lga, numPos, businessType,
            contactName, accountTypes]);
        return result.rows[0];
    },

    async getExcel() {
        const result = await pool.query(
            'SELECT * FROM pos.pos_requests ORDER BY id DESC'
        )
        return result.rows;
    }
}