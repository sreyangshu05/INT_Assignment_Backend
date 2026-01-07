const express = require('express');
const router = express.Router();
const classifyController = require('../controllers/classifyController');

router.post('/', classifyController.classifyText);

module.exports = router;

