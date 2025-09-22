const express = require("express");
const router = express.Router();
const controls = require('../controller/controls');



router.post('/', controls.createNewPos);
router.get('/download', controls.downloadExcel);


module.exports = router;
