const express = require('express');
const router = express.Router();

const {
    populate,
    getTables
} = require('../controllers/initDBController');

router.get('/populate', populate);
router.get('/tables', getTables)

module.exports = (
    router
)

