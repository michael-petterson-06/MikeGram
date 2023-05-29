const express = require('express');
const router = express.Router();


// Middlewares
const { photoInsertValidation } = require('../middlewares/PhotoValidation');
const { authGuard } = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');








module.exports = router;