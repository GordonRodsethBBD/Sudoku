const express = require('express');
const router = express.Router();

const {
    populateTables,
    createTables,
    dropTables,
    getTables
} = require('../controllers/initDBController');

router.post('/populate', populateTables);
router.get('/getTables', getTables);
router.get('/dropTables', dropTables);
router.get('/createTables', createTables);

module.exports = router;
