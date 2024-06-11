const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require("../config/multer")
router.use(express.json());

router.post('/add', upload.array('files', 10), carController.addCar);

module.exports = router;



